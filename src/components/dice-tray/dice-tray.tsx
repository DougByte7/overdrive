import { Center, Text3D, useGLTF } from '@react-three/drei'
import { Canvas, ThreeElements, useFrame } from '@react-three/fiber'
import {
    MeshCollider,
    Physics,
    RapierRigidBody,
    RigidBody,
} from '@react-three/rapier'
import { clsx } from 'clsx'
import { Fragment, Suspense, useEffect, useMemo, useRef } from 'react'
import {
    Euler,
    Matrix3,
    Quaternion,
    Triangle,
    Vector3,
    Vector3Like,
} from 'three'
import type { BufferGeometry, Matrix4, NormalBufferAttributes } from 'three'

import type { DiceNotation } from '@/assets/dnd/5e/classes'
import randomIntFromInterval from '@/utils/randomIntFromInterval'

import { type Dice, useDiceTrayActions, useDiceTrayDices } from './state'

const getTrayBoxDimensions = () => {
    const scale = 0.01375
    const width = innerWidth * scale
    const height = innerHeight * scale

    return {
        width,
        height,
        depth: 10,
        thickness: 1,
    }
}

export default function DiceTray() {
    const dices = useDiceTrayDices()
    const { depth } = getTrayBoxDimensions()

    return (
        <div
            className={clsx(
                // dices.length ? 'fixed' : 'hidden',
                'fixed pointer-events-none w-screen h-screen z-20'
            )}
        >
            <Canvas
                style={{ pointerEvents: 'none' }}
                orthographic
                camera={{
                    position: [0, depth / 2, 0],
                    zoom: 70,
                    far: depth * 2,
                }}
            >
                {/* <Perf /> */}
                <Suspense>
                    <ambientLight intensity={Math.PI / 4} />
                    <pointLight
                        position={[-10, 10, -10]}
                        decay={0}
                        intensity={Math.PI / 2}
                    />

                    <Physics>
                        {dices.map((data) => {
                            const { die, id, ...props } = data

                            switch (die) {
                                case 'd20':
                                    return <D20 key={id} id={id} {...props} />
                                case 'd12':
                                    return <D12 key={id} id={id} {...props} />
                                case 'd10':
                                    return <D10 key={id} id={id} {...props} />
                                case 'd8':
                                    return <D8 key={id} id={id} {...props} />
                                case 'd6':
                                    return <D6 key={id} id={id} {...props} />
                                case 'd4':
                                    return <D4 key={id} id={id} {...props} />
                            }
                        })}

                        <Floor />
                    </Physics>
                </Suspense>
            </Canvas>
        </div>
    )
}

function Floor() {
    const { depth, width, thickness, height } = getTrayBoxDimensions()
    const props = { transparent: true, opacity: 0 }

    return (
        <RigidBody type="fixed">
            <group position-y={-(depth / 2)} scale={[1, 1, 1]}>
                <mesh>
                    <boxGeometry args={[width, thickness, height]} />
                    <meshStandardMaterial color={'white'} {...props} />
                </mesh>
                <mesh position={[0, depth, 0]}>
                    <boxGeometry args={[width, thickness, height]} />
                    <meshStandardMaterial color={'red'} {...props} />
                </mesh>
                <mesh position={[width / 2, depth / 2, 0]}>
                    <boxGeometry args={[thickness, depth, height]} />
                    <meshStandardMaterial color={'green'} {...props} />
                </mesh>
                <mesh position={[-width / 2, depth / 2, 0]}>
                    <boxGeometry args={[thickness, depth, height]} />
                    <meshStandardMaterial color={'green'} {...props} />
                </mesh>
                <mesh position={[0, depth / 2, height / 2]}>
                    <boxGeometry args={[width, depth, thickness]} />
                    <meshStandardMaterial color={'blue'} {...props} />
                </mesh>
                <mesh position={[0, depth / 2, -height / 2]}>
                    <boxGeometry args={[width, depth, thickness]} />
                    <meshStandardMaterial color={'blue'} {...props} />
                </mesh>
            </group>
        </RigidBody>
    )
}

interface DiceMaterialProps {
    isBase?: boolean
}
const DiceMaterial = ({ isBase }: DiceMaterialProps) => (
    <meshPhysicalMaterial
        color={!isBase ? '#8100be' : '#1c1c1c'}
        emissive={!isBase ? '#8100be' : '#1c1c1c'}
        emissiveIntensity={isBase ? 1 : 2}
        roughness={0.85}
        metalness={0.25}
        iridescence={0.15}
        iridescenceIOR={0}
        sheen={0.35}
        sheenColor={'#8100be'}
    />
)

type DProps = {
    id: Dice['id']
    modifiers?: Dice['modifiers']
    label?: string
}
type DiceProps = DProps & {
    die: DiceNotation
    values: number[]
    verticesPerFace: number
}
function Dice({ id, die, values, verticesPerFace, ...resultProps }: DiceProps) {
    const { nodes } = useGLTF(`/assets/dices/${die}.glb`)

    const { removeDice, pushResult } = useDiceTrayActions()

    const rigidBodyRef = useRef<RapierRigidBody>(null)
    const diceRef = useRef<ThreeElements['mesh']>(null)
    const shouldCheckResult = useRef(true)
    const hasForce = useRef(false)
    const upVector = new Vector3(0, 1, 0)

    const numbers = useMemo(() => {
        const calculateCentroid = (vertices: Vector3Like[]): Vector3 => {
            const n = vertices.length
            let xSum = 0
            let ySum = 0
            let zSum = 0

            for (let i = 0; i < n; i++) {
                xSum += vertices[i].x
                ySum += vertices[i].y
                zSum += vertices[i].z
            }

            return new Vector3(xSum / n, ySum / n, zSum / n)
        }

        return values.map((value, i) => {
            const dice = nodes.collider as unknown as ThreeElements['mesh']
            const vertexPositions = dice.geometry!.getAttribute('position')
            const idx = dice.geometry!.index!
            const idxBase = i * verticesPerFace
            const vertices = []
            for (let j = 0; j < verticesPerFace; j++) {
                vertices.push(
                    new Vector3().fromBufferAttribute(
                        vertexPositions,
                        idx.getX(idxBase + j)
                    )
                )
            }
            const mid = calculateCentroid(vertices)
            const dir = new Vector3()
            new Triangle(vertices[0], vertices[1], vertices[2]).getNormal(dir)

            const rotation = new Euler().setFromQuaternion(
                new Quaternion().setFromUnitVectors(
                    new Vector3(0, 0, 1),
                    dir.normalize()
                )
            )

            return (
                <Fragment key={value}>
                    {/* <Line points={[mid.toArray(), dir]} color="red" /> */}
                    <Center position={mid}>
                        <Text3D
                            font={'/fonts/Eldritch Nouveau_Regular.json'}
                            scale={die === 'd20' ? 0.3 : 0.4}
                            rotation={rotation}
                            curveSegments={1}
                        >
                            {value}
                            {[6, 9].includes(value) && '.'}
                            <DiceMaterial />
                        </Text3D>
                    </Center>
                </Fragment>
            )
        })
    }, [])

    const computeNormals = (
        geometry: BufferGeometry<NormalBufferAttributes>,
        world: Matrix4
    ): Vector3[] => {
        const normals = []
        const vertexPositions = geometry.getAttribute('position')
        const idx = geometry.index!
        const tri = new Triangle()
        const v1 = new Vector3()
        const v2 = new Vector3()
        const v3 = new Vector3()

        for (let f = 0; f < values.length; f++) {
            const idxBase = f * verticesPerFace
            const normal = new Vector3()
            const normalMatrix = new Matrix3()
            v1.fromBufferAttribute(vertexPositions, idx.getX(idxBase + 0))
            v2.fromBufferAttribute(vertexPositions, idx.getX(idxBase + 1))
            v3.fromBufferAttribute(vertexPositions, idx.getX(idxBase + 2))
            tri.set(v1, v2, v3)
            tri.getNormal(normal)
            normalMatrix.getNormalMatrix(world)
            normal.applyMatrix3(normalMatrix).normalize()
            normals.push(normal)
        }

        return normals
    }

    const getUpwardNormal = (normals: Vector3[]) => {
        return normals.reduce(
            (closest, normal, index) => {
                const dotProduct = normal.dot(upVector)

                if (die === 'd4')
                    return dotProduct < closest.normal.dot(upVector)
                        ? { normal, index }
                        : closest

                return dotProduct > closest.normal.dot(upVector)
                    ? { normal, index }
                    : closest
            },
            {
                normal: new Vector3(0, die === 'd4' ? 1 : -1, 0),
                index: -1,
            }
        )
    }

    useEffect(() => {
        if (!rigidBodyRef.current) return

        const rigidBody = rigidBodyRef.current
        const { width, height, thickness } = getTrayBoxDimensions()
        rigidBody.setTranslation(
            new Vector3(
                Math.random() > 0.5
                    ? (width - thickness * 2) / 2
                    : -(width - thickness * 2) / 2,

                0,

                Math.random() > 0.5
                    ? (height - thickness * 2) / 2
                    : -(height - thickness * 2) / 2
            ),
            true
        )

        const impulseTimeout = setTimeout(() => {
            rigidBody.applyImpulse(
                new Vector3(
                    randomIntFromInterval(-50, 50),
                    0,
                    randomIntFromInterval(-50, 50)
                ),
                true
            )
            rigidBody.applyTorqueImpulse(
                new Vector3(
                    randomIntFromInterval(-10, 10),
                    randomIntFromInterval(-10, 10),
                    randomIntFromInterval(-10, 10)
                ),
                true
            )
        }, 200)
        const forceTimeout = setTimeout(() => {
            hasForce.current = true
        }, 300)

        return () => {
            clearTimeout(impulseTimeout)
            clearTimeout(forceTimeout)
        }
    }, [])

    useFrame(() => {
        if (!rigidBodyRef.current) return

        if (
            hasForce.current &&
            new Vector3(
                rigidBodyRef.current.angvel().x,
                rigidBodyRef.current.angvel().y,
                rigidBodyRef.current.angvel().z
            ).length() < 0.01 &&
            new Vector3(
                rigidBodyRef.current.linvel().x,
                rigidBodyRef.current.linvel().y,
                rigidBodyRef.current.linvel().z
            ).length() < 0.01
        ) {
            rigidBodyRef.current.sleep()
        }

        if (rigidBodyRef.current.isSleeping() && shouldCheckResult.current) {
            const dice = diceRef.current
            if (!dice?.geometry) throw Error('Error: Dice with no geometry')
            if (!dice.matrixWorld) throw Error('Error: No world matrix')

            shouldCheckResult.current = false
            const upwardFace = getUpwardNormal(
                computeNormals(dice.geometry, dice.matrixWorld)
            )

            pushResult({ roll: values[upwardFace.index], ...resultProps })
            setTimeout(() => removeDice(id), 5_000)
        }
    })

    return (
        <RigidBody ref={rigidBodyRef} colliders={false}>
            <group>
                <MeshCollider type="hull">
                    <mesh
                        ref={diceRef as any}
                        scale={die === 'd4' ? [-1, -1, -1] : undefined}
                        geometry={
                            (nodes.collider as unknown as ThreeElements['mesh'])
                                .geometry
                        }
                    >
                        <meshStandardMaterial
                            color={'white'}
                            transparent
                            opacity={0}
                        />
                    </mesh>
                </MeshCollider>

                <mesh
                    geometry={
                        (nodes.base as unknown as ThreeElements['mesh'])
                            .geometry
                    }
                >
                    <DiceMaterial isBase />
                </mesh>

                {numbers}
            </group>
        </RigidBody>
    )
}

function D20(props: DProps) {
    const valueToNormalIndexMap = [
        18, 2, 20, 8, 10, 12, 15, 5, 13, 1, 7, 17, 3, 19, 9, 11, 4, 14, 6, 16,
    ]

    return (
        <Dice
            {...props}
            die="d20"
            values={valueToNormalIndexMap}
            verticesPerFace={3}
        />
    )
}

function D12(props: DProps) {
    const valueToNormalIndexMap = [1, 3, 5, 9, 11, 6, 10, 12, 7, 2, 4, 8]

    return (
        <Dice
            {...props}
            die="d12"
            values={valueToNormalIndexMap}
            verticesPerFace={9}
        />
    )
}

function D10(props: DProps) {
    const valueToNormalIndexMap = [1, 9, 5, 3, 7, 10, 8, 2, 6, 4]

    return (
        <Dice
            {...props}
            die="d10"
            values={valueToNormalIndexMap}
            verticesPerFace={6}
        />
    )
}

function D8(props: DProps) {
    const valueToNormalIndexMap = [1, 8, 5, 4, 7, 6, 3, 2]

    return (
        <Dice
            {...props}
            die="d8"
            values={valueToNormalIndexMap}
            verticesPerFace={3}
        />
    )
}

function D6(props: DProps) {
    const valueToNormalIndexMap = [1, 3, 6, 4, 5, 2]

    return (
        <Dice
            {...props}
            die="d6"
            values={valueToNormalIndexMap}
            verticesPerFace={6}
        />
    )
}

function D4(props: DProps) {
    const valueToNormalIndexMap = [1, 3, 2, 4]

    return (
        <Dice
            {...props}
            die="d4"
            values={valueToNormalIndexMap}
            verticesPerFace={3}
        />
    )
}

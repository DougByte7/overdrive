import { useEffect, useRef } from 'react'

export default function Canvas() {
    const size = 2100

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        ctx.beginPath()
        ctx.moveTo(475, 150)
        ctx.lineTo(500, 175)
        ctx.lineTo(500, 125)
        ctx.fillStyle = 'red'
        ctx.fill()
    }, [canvasRef])

    return (
        <div>
            <canvas ref={canvasRef} height={size} width={size} />
        </div>
    )
}

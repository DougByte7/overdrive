import { nanoid } from 'lib/nanoid'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type {
    DiceFacesNotation,
    DiceNotation,
} from '@/assets/dnd/5e/classes/interfaces'

export interface Dice {
    id: string
    die: DiceFacesNotation
    modifiers?: number[]
    label?: string
}

interface DiceResult {
    roll: number
    modifiers?: Dice['modifiers']
    label?: string
}

interface State {
    dices: Dice[]
    results: DiceResult[]
}
interface Actions {
    actions: {
        rollDice: (
            dice: DiceNotation,
            modifiers?: number[],
            label?: string
        ) => void
        removeDice: (id: Dice['id']) => void
        pushResult: (result: DiceResult) => void
        shiftResult: (amount?: number) => DiceResult[]
    }
}

const useDiceTrayStore = create<State & Actions>()(
    immer((set) => ({
        dices: [],
        results: [],
        actions: {
            rollDice(diceNotation, modifiers, label) {
                set(({ dices }) => {
                    const { amount = 1, die } =
                        /^(?<amount>\d+)*(?<die>d\d+)/.exec(diceNotation)!
                            .groups as {
                            amount: string
                            die: DiceFacesNotation
                        }

                    for (let i = 0; i < +amount; i++) {
                        console.log(nanoid(99))

                        dices.push({ id: nanoid(99), die, modifiers, label })
                    }
                })
            },
            removeDice(id) {
                set(({ dices }) => {
                    return { dices: dices.filter((die) => die.id !== id) }
                })
            },
            pushResult(result) {
                set(({ results }) => {
                    results.push(result)
                })
            },
            shiftResult(amount = 1) {
                const response: DiceResult[] = []
                set(({ results }) => {
                    for (let i = 0; i < amount; i++) {
                        const result = results.shift()
                        if (result) response.push(result)
                    }
                })
                return response
            },
        },
    }))
)

export const useDiceTrayActions = () =>
    useDiceTrayStore((state) => state.actions)

export const useDiceTrayDices = () => useDiceTrayStore((state) => state.dices)

export const useDiceTrayResults = () =>
    useDiceTrayStore((state) => state.results)

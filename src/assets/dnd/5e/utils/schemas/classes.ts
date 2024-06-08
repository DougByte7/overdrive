import {
    array,
    boolean,
    coerce,
    minLength,
    number,
    object,
    string,
} from 'valibot'

export const CustomClassSchema = object({
    public: boolean(),
    name: string([minLength(1, 'O campo deve ter pelo menos um caractere')]),
    description: string(),
    hp: string([minLength(1, 'O campo não pode ficar em branco')]),
    cantripKnown: array(number()),
    spellsKnown: array(number()),
    spellsSlots: array(array(number())),
    proficiencies: object({
        armor: array(string()),
        weapon: array(string()),
        savingThrows: array(string()),
        skills: array(string()),
        skillAmount: number(),
        tools: array(string()),
    }),
    equipmentOptions: array(
        array(array(object({ item: string(), amount: number() })))
    ),
    features: array(
        object({
            name: string([
                minLength(1, 'O campo deve ter pelo menos um caractere'),
            ]),
            description: string([
                minLength(4, 'O campo deve conter uma descrição'),
            ]),
            level: array(coerce(number('O campo deve ser um número'), Number), [
                minLength(1, 'O campo deve ter pelo menos um nível'),
            ]),
        }),
        [minLength(1, 'A classe deve ter pelo menos uma habilidade')]
    ),
})

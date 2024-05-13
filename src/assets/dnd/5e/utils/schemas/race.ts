import {
    array,
    boolean,
    integer,
    minLength,
    number,
    object,
    string,
} from 'valibot'

export const CustomRaceSchema = object({
    public: boolean(),
    name: string([minLength(1, 'O campo deve ter pelo menos um caractere')]),
    description: string(),
    speed: object({
        land: number([integer('A velocidade precisa ser um número inteiro')]),
        climb: number([integer('A velocidade precisa ser um número inteiro')]),
        fly: number([integer('A velocidade precisa ser um número inteiro')]),
        swimming: number([
            integer('A velocidade precisa ser um número inteiro'),
        ]),
        burrow: number([integer('A velocidade precisa ser um número inteiro')]),
    }),
    type: string(),
    size: string(),
    darkvision: number([integer('O campo precisa ser um número inteiro')]),
    traits: array(
        object({
            name: string([
                minLength(1, 'O campo deve ter pelo menos um caractere'),
            ]),
            description: string([
                minLength(1, 'O campo deve ter pelo menos um caractere'),
            ]),
        })
    ),
})

import {
    array,
    boolean,
    integer,
    minLength,
    number,
    object,
    pipe,
    string,
} from 'valibot'

export const CustomRaceSchema = object({
    public: boolean(),
    name: pipe(
        string(),
        minLength(1, 'O campo deve ter pelo menos um caractere')
    ),
    description: string(),
    speed: object({
        land: pipe(
            number(),
            integer('A velocidade precisa ser um número inteiro')
        ),
        climb: pipe(
            number(),
            integer('A velocidade precisa ser um número inteiro')
        ),
        fly: pipe(
            number(),
            integer('A velocidade precisa ser um número inteiro')
        ),
        swimming: pipe(
            number(),
            integer('A velocidade precisa ser um número inteiro')
        ),
        burrow: pipe(
            number(),
            integer('A velocidade precisa ser um número inteiro')
        ),
    }),
    type: string(),
    size: string(),
    darkvision: pipe(
        number(),
        integer('O campo precisa ser um número inteiro')
    ),
    traits: array(
        object({
            name: pipe(
                string(),
                minLength(1, 'O campo deve ter pelo menos um caractere')
            ),
            description: pipe(
                string(),
                minLength(1, 'O campo deve ter pelo menos um caractere')
            ),
        })
    ),
})

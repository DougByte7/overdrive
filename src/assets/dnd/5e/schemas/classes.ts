import {
    InferInput,
    array,
    boolean,
    length,
    minLength,
    number,
    object,
    optional,
    pipe,
    string,
    transform,
} from 'valibot'

const RulesSchema = object({
    action: string(),
    isActive: boolean(),
})

const FeatureSchema = object({
    name: pipe(
        string(),
        minLength(1, 'O campo deve ter pelo menos um caractere')
    ),
    level: pipe(
        array(pipe(number('O campo deve ser um número'), transform(Number))),
        minLength(1, 'O campo deve ter pelo menos um nível')
    ),
    description: pipe(
        string(),
        minLength(4, 'O campo deve conter uma descrição')
    ),
    amount: optional(
        pipe(
            array(number('As quantidades precisam ser numéricas')),
            length(
                20,
                'A quantidade deve conter exatamente 20 elementos, 1 para cada nível'
            )
        )
    ),
    rules: optional(array(RulesSchema)),
    options: optional(
        array(
            object({
                label: string(),
                value: string(),
                description: string(),
            })
        )
    ),
})

const SpellCasterOptions = object({
    cantripKnown: optional(
        pipe(
            array(number()),
            length(
                20,
                'A quantidade deve conter exatamente 20 elementos, 1 para cada nível'
            )
        )
    ),
    spellsKnown: optional(
        pipe(
            array(number()),
            length(
                20,
                'A quantidade deve conter exatamente 20 elementos, 1 para cada nível'
            )
        )
    ),
    spellsSlots: optional(
        pipe(
            array(array(number())),
            length(
                20,
                'A quantidade deve conter exatamente 20 elementos, 1 para cada nível'
            )
        )
    ),
})

export const ClassSchema = object({
    public: boolean(),
    name: pipe(
        string(),
        minLength(1, 'O campo deve ter pelo menos um caractere')
    ),
    description: string(),
    hp: pipe(string(), minLength(1, 'O campo não pode ficar em branco')),
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
    features: pipe(
        array(FeatureSchema),
        minLength(1, 'A classe deve ter pelo menos uma habilidade')
    ),
    ...SpellCasterOptions.entries,
})

export type SRD5Class = InferInput<typeof ClassSchema>
export type SRD5ClassFeature = SRD5Class['features'][number]

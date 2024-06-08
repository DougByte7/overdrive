import type { DnD5eClass, DnD5eFeature, DnD5eSubClass } from './interfaces'

const features: DnD5eFeature[] = [
    {
        name: 'Estilo de Luta',
        level: 1,
        description: [
            'Você adota um estilo particular de luta como sua especialidade. Escolha uma das opções a seguir. Você não pode escolher a mesma opção de Estilo de Luta mais de uma vez, mesmo que depois possa escolher novamente.',
            '- Arquearia: Você recebe um bônus de +2 em rolagens de ataque que você faz com armas de longo alcance.',
            '- Defesa: Enquanto estiver usando armadura, você recebe um bônus de +1 na CA (Classe de Armadura).',
            '- Duelo: Quando estiver empunhando uma arma de combate corpo a corpo em uma mão e nenhuma outra arma, você recebe um bônus de +2 em rolagens de dano com essa arma.',
            "- Combate com Arma Grande: Quando você rolar um 1 ou 2 em um dado de dano para um ataque que você fizer com uma arma corpo a corpo que esteja empunhando com as duas mãos, você pode rolar o dado novamente e deve usar o novo resultado, mesmo se for um 1 ou 2. A arma deve ter a propriedade 'duas mãos' ou 'versátil' para você obter esse benefício.",
            '- Proteção: Quando uma criatura que você pode ver ataca um alvo que não seja você e esteja a até 1.5m (5ft) de você, você pode usar sua reação para impor desvantagem na rolagem de ataque. Você deve estar empunhando um escudo.',
            '- Combate com Duas Armas: Quando você se envolve em combate com duas armas, você pode adicionar seu modificador de habilidade ao dano do segundo ataque.',
        ],
        options: [
            { label: 'Arquearia', value: 'archery' },
            { label: 'Defesa', value: 'defense' },
            { label: 'Duelo', value: 'dueling' },
            {
                label: 'Combate com Arma Grande',
                value: 'great_weapon_fighting',
            },
            { label: 'Proteção', value: 'protection' },
            { label: 'Combate com Duas Armas', value: 'two_weapon_fighting' },
        ],
        misc: {
            archery: [
                'Arquearia',
                'Você recebe um bônus de +2 em rolagens de ataque que você faz com armas de longo alcance.',
            ],
            defense: [
                'Defesa',
                'Enquanto estiver usando armadura, você recebe um bônus de +1 na CA (Classe de Armadura).',
            ],
            dueling: [
                'Duelo',
                'Quando estiver empunhando uma arma de combate corpo a corpo em uma mão e nenhuma outra arma, você recebe um bônus de +2 em rolagens de dano com essa arma.',
            ],
            great_weapon_fighting: [
                'Combate com Arma Grande',
                "Quando você rolar um 1 ou 2 em um dado de dano para um ataque que você fizer com uma arma corpo a corpo que esteja empunhando com as duas mãos, você pode rolar o dado novamente e deve usar o novo resultado, mesmo se for um 1 ou 2. A arma deve ter a propriedade 'duas mãos' ou 'versátil' para você obter esse benefício.",
            ],
            protection: [
                'Proteção',
                'Quando uma criatura que você pode ver ataca um alvo que não seja você e esteja a até 1.5m (5ft) de você, você pode usar sua reação para impor desvantagem na rolagem de ataque. Você deve estar empunhando um escudo.',
            ],
            two_weapon_fighting: [
                'Combate com Duas Armas',
                'Quando você se envolve em combate com duas armas, você pode adicionar seu modificador de habilidade ao dano do segundo ataque.',
            ],
        },
    },
    {
        name: 'Retomar folego',
        level: 1,
        description:
            'Você tem um poço limitado de resistência que pode ser usado para se proteger de danos. Em seu turno, você pode usar uma ação bônus para recuperar pontos de vida iguais a 1d10 + seu nível de guerreiro. Depois de usar esse recurso, você deve terminar um descanso curto ou longo antes de poder usá-lo novamente.',
    },
    {
        name: 'Surto de ação',
        level: [2, 17],
        description:
            'A partir do 2º nível, você pode se esforçar além dos seus limites normais por um momento. Em seu turno, você pode tomar uma ação adicional além de sua ação regular e uma possível ação bônus. Depois de usar esse recurso, você deve terminar um descanso curto ou longo antes de poder usá-lo novamente. A partir do 17º nível, você pode usá-lo duas vezes antes de um descanso, mas apenas uma vez no mesmo turno.',
    },
    {
        name: 'Arquétipo Marcial',
        level: 3,
        description:
            'No 3º nível, você escolhe uma especialização que você se esforça para emular em seus estilos e técnicas de combate, como o Campeão. A especialização que você escolhe concede recursos para você no 3º nível e novamente no 7º, 10º, 15º e 18º níveis.',
    },
    {
        name: 'Melhoria de Atributo',
        level: [4, 6, 8, 12, 14, 16, 19],
        description:
            'Quando você atinge o 4º nível, e novamente no 6º, 8º, 12º, 14º, 16º e 19º níveis, você pode aumentar um atributo de sua escolha em 2, ou pode aumentar dois atributos de sua escolha em 1. Como normal, você não pode aumentar um atributo acima de 20 usando essa habilidade.',
    },
    {
        name: 'Ataque Extra',
        level: [5, 11, 20],
        description:
            'A partir do 5º nível, você pode atacar duas vezes, em vez de uma, sempre que tomar a ação de Ataque em seu turno. O número de ataques aumenta para três quando você alcança o 11º nível nesta classe e quatro quando alcança o 20º nível nesta classe.',
    },
    {
        name: 'Indomável',
        level: [9, 13, 17],
        description:
            'A partir do 9º nível, você pode rolar novamente uma jogada de salvamento que falhe. Se fizer isso, deve usar a nova jogada e não pode usar esse recurso novamente até terminar um descanso longo. Você pode usar esse recurso duas vezes entre descansos longos a partir do 13º nível e três vezes entre descansos longos a partir do 17º nível.',
    },
]

const champion: DnD5eSubClass = {
    name: 'Campeão',
    description:
        'O Campeão arquetípico concentra-se no desenvolvimento de poder físico bruto lapidado para a perfeição letal. Aqueles que se modelam nesse arquétipo combinam treinamento rigoroso com excelência física para desferir golpes devastadores.',
    features: [
        {
            name: 'Crítico Aprimorado',
            level: 3,
            description:
                'Começando quando você escolhe este arquétipo no 3º nível, seus ataques com arma causam um acerto crítico em um resultado de 19 ou 20.',
        },
        {
            name: 'Atleta Notável',
            level: 7,
            description:
                'A partir do 7º nível, você pode adicionar metade do seu bônus de proficiência (arredondado para cima) em qualquer teste de Força, Destreza ou Constituição que não use seu bônus de proficiência. Além disso, quando você faz um salto longo de corrida, a distância que você pode cobrir aumenta em um número de pés igual ao seu modificador de Força.',
        },
        {
            name: 'Estilo de Luta Adicional',
            level: 10,
            description:
                'No 10º nível, você pode escolher uma segunda opção da característica de classe Estilo de Luta.',
        },
        {
            name: 'Crítico Superior',
            level: 15,
            description:
                'A partir do 15º nível, seus ataques com arma causam um acerto crítico em um resultado de 18-20.',
        },
        {
            name: 'Sobrevivente',
            level: 18,
            description:
                'No 18º nível, você atinge o auge da resistência em batalha. No início de cada um de seus turnos, você recupera pontos de vida iguais a 5 + seu modificador de Constituição, se tiver menos da metade de seus pontos de vida restantes. Você não ganha esse benefício se tiver 0 pontos de vida.',
        },
    ],
}

const fighter: DnD5eClass = {
    key: 'fighter',
    name: 'Guerreiro',
    description: 'HP d10, Habilidade For ou Des, TR For e Con',
    features,
    subclasses: [champion],
    hp: {
        dice: 'd10',
        average: 6,
    },
    proficiencies: {
        armor: ['light', 'medium', 'heavy', 'shield'],
        weapon: ['simple', 'martial'],
        savingThrows: ['strength', 'constitution'],
        skills: {
            amount: 2,
            options: [
                { label: 'Acrobacia (Acrobatics)', value: 'acrobatics' },
                {
                    label: 'Lidar com animais (Animal Handling)',
                    value: 'animal_handling',
                },
                { label: 'Atletismo (Athletics)', value: 'athletics' },
                { label: 'História (History)', value: 'history' },
                { label: 'Intuição (Insight)', value: 'insight' },
                { label: 'Intimidação (Intimidation)', value: 'intimidation' },
                { label: 'Percepção (Perception)', value: 'perception' },
                { label: 'Sobrevivência (Survival)', value: 'survival' },
            ],
        },
    },
    equipmentOptions: [
        [
            [{ item: 'chain-mail', amount: 1 }],
            [
                { item: 'leather-armor', amount: 1 },
                { item: 'longbow', amount: 1 },
                { item: 'arrow', amount: 20 },
            ],
        ],
        [
            [
                { item: 'Martial', amount: 1 },
                { item: 'shield', amount: 1 },
            ],
            [{ item: 'Martial', amount: 2 }],
        ],
        [
            [
                { item: 'crossbow-light', amount: 1 },
                { item: 'crossbow-bolt', amount: 20 },
            ],
            [{ item: 'handaxe', amount: 2 }],
        ],
        [
            [{ item: 'dungeoneers-pack', amount: 1 }],
            [{ item: 'explorers-pack', amount: 1 }],
        ],
    ],
}

export default fighter

/*
Analise o texto a seguir e gere um arquivo json para cada paragrafo traduzido seguindo este schema: {
name: string em português;
level: number | number[];
description: string em português;
}

Texto:
*/

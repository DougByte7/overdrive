import type { DnD5eClass, DnD5eFeature, DnD5eSubClass } from './interfaces'

const features: DnD5eFeature[] = [
    {
        name: 'Fúria',
        level: 1,
        description: `
    Na batalha, você luta com ferocidade primitiva. No seu turno, você pode entrar em fúria como uma ação bônus. Enquanto estiver em fúria, você ganha os seguintes benefícios se não estiver usando armadura pesada:

    • Você tem vantagem em testes de Força e testes de resistência de Força.

    • Quando você faz um ataque corpo a corpo usando Força, você ganha um bônus na jogada de dano que aumenta conforme você ganha níveis como um bárbaro, conforme mostrado na coluna Dano de Fúria da tabela Bárbaro.

    • Você tem resistência a dano de concussão, perfuração e corte.

    Se você for capaz de lançar feitiços, não poderá lançá-los ou se concentrar neles enquanto estiver em fúria. Sua fúria dura 1 minuto. Termina cedo se você ficar inconsciente ou se seu turno terminar e você não tiver atacado uma criatura hostil desde seu último turno ou sofrido dano desde então. Você também pode acabar com sua fúria no seu turno como uma ação bônus. Uma vez que você tenha enfurecido o número de vezes mostrado para seu nível de bárbaro na coluna Fúrias da tabela Bárbaro, você deve terminar um longo descanso antes de poder entrar em fúria novamente.
    `,
    },
    {
        name: 'Defesa Sem Armadura',
        level: 1,
        description:
            'Enquanto você não estiver usando nenhuma armadura, sua Classe de Armadura é igual a 10 + seu modificador de Destreza + seu modificador de Constituição. Você pode usar um escudo e ainda assim obter esse benefício.',
        rules: [{ action: 'CA=10+DEX_MOD+CON_MOD', isActive: true }],
    },
    {
        name: 'Ataque Descuidado',
        level: 2,
        description:
            'A partir do 2º nível, você pode jogar fora todas as preocupações com a defesa para atacar com desespero feroz. Quando você faz seu primeiro ataque em seu turno, pode decidir atacar de forma descuidada. Fazê-lo lhe dá vantagem em rolagens de ataque com arma corpo a corpo usando Força durante este turno, mas rolagens de ataque contra você têm vantagem até o seu próximo turno.',
    },
    {
        name: 'Sentido de Perigo',
        level: 2,
        description:
            'No 2º nível, você adquire um sentido incomum de quando as coisas próximas não estão como deveriam ser, dando-lhe uma vantagem quando você se esquiva para longe do perigo. Você tem vantagem em testes de resistência de Destreza contra efeitos que você pode ver, como armadilhas e magias. Para obter esse benefício, você não pode estar cego, surdo ou incapacitado.',
    },
    {
        name: 'Caminho Primitivo',
        level: 3,
        description:
            'No 3º nível, você escolhe um caminho que molda a natureza da sua fúria. Escolha o Caminho do Berserker ou o Caminho do Guerreiro Totêmico, ambos detalhados no final da descrição da classe. Sua escolha concede recursos a você no 3º nível e novamente nos níveis 6º, 10º e 14º.',
    },
    {
        name: 'Melhoria de Atributo',
        level: [4, 8, 12, 16, 19],
        description:
            'Ao atingir o 4º nível, e novamente no 8º, 12º, 16º e 19º nível, você pode aumentar um atributo de sua escolha em 2 ou dois atributos de sua escolha em 1. Como normal, você não pode aumentar um atributo acima de 20 usando essa característica.',
    },
    {
        name: 'Ataque extra',
        level: 5,
        description:
            'A partir do 5º nível, você pode atacar duas vezes, em vez de uma, sempre que realizar a ação Ataque em seu turno.',
    },
    {
        name: 'Fast Movement',
        level: 5,
        description:
            'Começando no 5º nível, sua velocidade aumenta em 2 espaços (3m / 10ft) enquanto você não estiver usando armadura pesada.',
    },
    {
        name: 'Instinto Feral',
        level: 7,
        description:
            'No 7º nível, seus instintos estão tão aprimorados que você tem vantagem em rolagens de iniciativa. Além disso, se você for pego de surpresa no início do combate e não estiver incapacitado, poderá agir normalmente em seu primeiro turno, mas somente se entrar em fúria antes de fazer qualquer outra coisa nesse turno.',
    },
    {
        name: 'Crítico Brutal',
        level: [9, 13, 17],
        description:
            'A partir do 9º nível, você pode rolar um dado adicional de dano de arma ao determinar o dano extra de um acerto crítico com um ataque corpo a corpo. Isso aumenta para dois dados adicionais no 13º nível e três dados adicionais no 17º nível.',
    },
    {
        name: 'Fúria implacável',
        level: 11,
        description:
            'A partir do 11º nível, sua fúria pode mantê-lo lutando apesar de ferimentos graves. Se você cair a 0 pontos de vida enquanto está em fúria e não morrer imediatamente, você pode fazer um teste de resistência de Constituição (CD 10). Se você obtiver sucesso, cairá para 1 ponto de vida em vez de morrer. Cada vez que você usa essa habilidade depois da primeira, a CD aumenta em 5. Quando você terminar um descanso curto ou longo, a CD volta a ser 10.',
    },
    {
        name: 'Fúria Persistente',
        level: 15,
        description:
            'A partir do 15º nível, sua fúria é tão intensa que ela termina precocemente apenas se você ficar inconsciente ou escolher terminá-la.',
    },
    {
        name: 'Poder Indomável',
        level: 18,
        description:
            'A partir do 18º nível, se o seu total em um teste de Força for menor que a sua pontuação de Força, você pode usar essa pontuação no lugar do total.',
    },
    {
        name: 'Campeão Primal',
        level: 20,
        description:
            'Ao atingir o 20º nível, você incorpora o poder da natureza. Seus valores de Força e Constituição aumentam em 4. Seu valor máximo para esses atributos agora é 24.',
    },
]

const berserker: DnD5eSubClass = {
    name: 'Caminho do Berserker',
    description:
        'Para alguns bárbaros, a fúria é um meio para um fim - esse fim é a violência. O Caminho do Berserker é um caminho de fúria incontrolável, ensopado de sangue. Ao entrar em fúria do berserker, você se emociona com o caos da batalha, sem se importar com sua própria saúde ou bem-estar.',
    features: [
        {
            name: 'Frenesi',
            level: 3,
            description:
                'Ao escolher este caminho no 3º nível, você pode entrar em frenesi quando estiver em fúria. Se o fizer, durante a duração da sua fúria, você pode fazer um único ataque com arma corpo a corpo como uma ação bônus em cada um de seus turnos após este. Quando sua fúria termina, você sofre um nível de exaustão (conforme descrito no Apêndice PH-A).',
        },
        {
            name: 'Fúria Irracional',
            level: 6,
            description:
                'A partir do 6º nível, você não pode ser enfeitiçado ou amedrontado enquanto estiver em fúria. Se você estiver enfeitiçado ou amedrontado quando entrar em fúria, o efeito será suspenso durante a duração da fúria.',
        },
        {
            name: 'Presença Intimidadora',
            level: 10,
            description:
                'A partir do 10º nível, você pode usar sua ação para intimidar alguém com sua presença ameaçadora. Quando você faz isso, escolha uma criatura que você possa ver a até 30 pés de você. Se a criatura puder ver ou ouvir você, ela deve ter sucesso em um teste de resistência de Sabedoria (CD igual a 8 + seu bônus de proficiência + seu modificador de Carisma) ou ficar amedrontada por você até o final de seu próximo turno. Em turnos subsequentes, você pode usar sua ação para estender a duração deste efeito na criatura amedrontada até o final de seu próximo turno. Este efeito termina se a criatura terminar seu turno fora do seu alcance de visão ou a mais de 12 espaços (18m / 60ft) de você. Se a criatura tiver sucesso em seu teste de resistência, você não poderá usar essa habilidade nessa criatura novamente por 24 horas.',
        },
        {
            name: 'Retaliação',
            level: 14,
            description:
                'A partir do 14º nível, quando você sofre dano de uma criatura que está a até 1 espaço (1,5m / 5ft) de você, você pode usar sua reação para fazer um ataque corpo a corpo contra essa criatura.',
        },
    ],
}

const barbarian: DnD5eClass = {
    key: 'barbarian',
    name: 'Bárbaro',
    description: 'HP d12, Habilidade For, TR For e Con',
    features,
    subclasses: [berserker],
    hp: {
        dice: 'd12',
        average: 7,
    },
    proficiencies: {
        armor: ['light', 'medium', 'shield'],
        weapon: ['simple', 'martial'],
        savingThrows: ['strength', 'constitution'],
        skills: {
            amount: 2,
            options: [
                {
                    label: 'Lidar com animais (Animal Handling)',
                    value: 'animal_handling',
                },
                { label: 'Atletismo (Athletics)', value: 'athletics' },
                { label: 'Intimidação (Intimidation)', value: 'intimidation' },
                { label: 'Natureza (Nature)', value: 'nature' },
                { label: 'Percepção (Perception)', value: 'perception' },
                { label: 'Sobrevivência (Survival)', value: 'survival' },
            ],
        },
    },
    equipmentOptions: [
        [
            [{ item: 'greataxe', amount: 1 }],
            [{ item: 'Martial Melee', amount: 1 }],
        ],
        [[{ item: 'handaxe', amount: 2 }], [{ item: 'Simple', amount: 1 }]],
        [[{ item: 'explorers-pack', amount: 1 }]],
        [[{ item: 'javelin', amount: 4 }]],
    ],
}

export default barbarian

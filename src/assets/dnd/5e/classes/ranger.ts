import type { DnD5eClass, DnD5eFeature, DnD5eSubClass } from './interfaces'

const features: DnD5eFeature[] = [
    {
        name: 'Inimigo Favorito',
        level: [1, 6, 14],
        description:
            'A partir do 1º nível, você possui uma grande experiência estudando, rastreando, caçando e até mesmo conversando com um tipo específico de inimigo. Escolha um tipo de inimigo favorito: aberrações, bestas, celestiais, construtos, dragões, elementais, fadas, demônios, gigantes, monstros, criaturas disformes, plantas ou mortos-vivos. Alternativamente, você pode selecionar duas raças de humanoides (como gnolls e orcs) como inimigos favoritos. Você tem vantagem em testes de Sabedoria (Sobrevivência) para rastrear seus inimigos favoritos, bem como em testes de Inteligência para lembrar informações sobre eles. Quando você adquire esta habilidade, também aprende um idioma de sua escolha que é falado pelos seus inimigos favoritos, se eles falarem um. Você escolhe um inimigo favorito adicional, bem como um idioma associado, no 6º e 14º níveis. À medida que você ganha níveis, suas escolhas devem refletir os tipos de monstros que você encontrou em suas aventuras.',
    },
    {
        name: 'Explorador Natural',
        level: [1, 6, 10],
        description:
            'Você é particularmente familiarizado com um tipo de ambiente natural e é hábil em viajar e sobreviver nessas regiões. Escolha um tipo de terreno favorito: ártico, costa, deserto, floresta, pastagem, montanha ou pântano. Quando você faz um teste de Inteligência ou Sabedoria relacionado ao seu terreno favorito, seu bônus de proficiência é dobrado se estiver usando uma habilidade que você é proficiente. Enquanto viaja por uma hora ou mais no seu terreno favorito, você obtém os seguintes benefícios: terreno difícil não diminui a velocidade de movimento do seu grupo; seu grupo não pode se perder, exceto por meios mágicos; mesmo quando você está envolvido em outra atividade enquanto viaja (como forragear, navegar ou rastrear), você permanece alerta ao perigo; se você está viajando sozinho, pode se mover furtivamente a uma velocidade normal; quando forrageia, encontra o dobro de comida do que encontraria normalmente; ao rastrear outras criaturas, você também aprende o número exato, o tamanho e quando elas passaram pela área. Você escolhe tipos adicionais de terreno favorito no 6º e no 10º nível.',
    },
    {
        name: 'Estilo de Combate',
        level: 2,
        description:
            'Ao chegar no 2º nível, você adota um estilo particular de combate como sua especialidade. Escolha uma das opções a seguir. Você não pode escolher uma opção de Estilo de Combate mais de uma vez, mesmo que mais tarde você tenha a chance de escolher novamente.',
        rules: [
            { action: 'WEAPON_RANGED_ATK+=2', isActive: false },
            { action: 'CA+=1', isActive: false },
            { action: 'WEAPON_MELEE_DMG+=2', isActive: false },
        ],
        options: [
            {
                label: 'Arquearia',
                value: 'archery',
                description:
                    'Você recebe um bônus de +2 em rolagens de ataque que você faz com armas de longo alcance.',
            },
            {
                label: 'Defesa',
                value: 'defense',
                description:
                    'Enquanto estiver usando armadura, você recebe um bônus de +1 na CA (Classe de Armadura).',
            },
            {
                label: 'Duelo',
                value: 'dueling',
                description:
                    'Quando estiver empunhando uma arma de combate corpo a corpo em uma mão e nenhuma outra arma, você recebe um bônus de +2 em rolagens de dano com essa arma.',
            },
            {
                label: 'Combate com Duas Armas',
                value: 'two_weapon_fighting',
                description:
                    'Quando você se envolve em combate com duas armas, você pode adicionar seu modificador de habilidade ao dano do segundo ataque.',
            },
        ],
    },
    {
        name: 'Magias',
        level: 2,
        description:
            'Ao alcançar o 2º nível, você aprendeu a utilizar a essência mágica da natureza para conjurar magias, assim como um druida. ',
    },
    {
        name: 'Espaços de Magia',
        level: 2,
        description:
            'A tabela do Ranger mostra quantos espaços de magia você tem para conjurar suas magias de 1º nível ou superior. Para conjurar uma dessas magias, você deve gastar um espaço do nível da magia ou superior. Você recupera todos os espaços gastos de magia quando termina um descanso longo. Por exemplo, se você conhece a magia amizade animal de 1º nível e tem um espaço de magia de 1º nível e um de 2º nível disponível, você pode conjurar amizade animal usando qualquer um dos espaços.',
    },
    {
        name: 'Magias Conhecidas de 1º Nível ou Superior',
        level: 2,
        description:
            'Você conhece duas magias de 1º nível de sua escolha da lista de magias do ranger. A coluna Magias Conhecidas da tabela do Ranger mostra quando você aprende mais magias de ranger de sua escolha. Cada uma dessas magias deve ser de um nível para o qual você tenha espaços de magia. Por exemplo, quando você alcança o 5º nível nesta classe, pode aprender uma nova magia de 1º ou 2º nível. Além disso, quando você ganha um nível nesta classe, pode escolher uma das magias de ranger que conhece e substituí-la por outra magia da lista de magias do ranger, que também deve ser de um nível para o qual você tenha espaços de magia.',
    },
    {
        name: 'Habilidade de Conjuração',
        level: 2,
        description:
            'Sabedoria é sua habilidade de conjuração para suas magias de ranger, pois sua magia se baseia em sua sintonia com a natureza. Você usa sua Sabedoria sempre que uma magia se referir à sua habilidade de conjuração. Além disso, você usa seu modificador de Sabedoria ao estabelecer a CD de resistência para uma magia de ranger que você conjura e ao fazer um teste de ataque com uma delas. CD de resistência da magia = 8 + seu bônus de proficiência + seu modificador de Sabedoria. Modificador de ataque com magia = seu bônus de proficiência + seu modificador de Sabedoria.',
    },
    {
        name: 'Arquétipo do Patrulheiro',
        level: 3,
        description:
            'Ao atingir o 3º nível, você escolhe um arquétipo que deseja emular, como o Caçador. Sua escolha concede recursos no 3º nível e novamente no 7º, 11º e 15º nível.',
    },
    {
        name: 'Consciência Primeva',
        level: 3,
        description:
            'A partir do 3º nível, você pode usar sua ação e gastar um espaço de magia de patrulheiro para focar sua consciência na região ao seu redor. Por 1 minuto por nível do espaço de magia que você gastar, você pode sentir se os seguintes tipos de criaturas estão presentes a até 1,5km (1 milha) de você (ou até 10km (6 milhas) se você estiver em seu terreno predileto): aberrações, celestiais, dragões, elementais, fadas, demônios e mortos-vivos. Este recurso não revela a localização ou o número das criaturas.',
    },
    {
        name: 'Melhoria de Atributo',
        level: [4, 8, 12, 16, 19],
        description:
            'Ao atingir o 4º nível, e novamente no 8º, 12º, 16º e 19º nível, você pode aumentar um atributo de sua escolha em 2, ou pode aumentar dois atributos de sua escolha em 1. Como de costume, você não pode aumentar um atributo acima de 20 usando esse recurso.',
    },
    {
        name: 'Ataque Extra',
        level: 5,
        description:
            'A partir do 5º nível, você pode atacar duas vezes, em vez de uma, sempre que usar a ação de Ataque em seu turno.',
    },
    {
        name: 'Percorrer a Terra',
        level: 8,
        description:
            'A partir do 8º nível, mover-se através de terrenos difíceis não mágicos não custa movimento extra. Você também pode atravessar plantas não mágicas sem ser impedido por elas e sem receber dano delas se elas tiverem espinhos, pontas ou algum perigo similar. Além disso, você tem vantagem em testes de resistência contra plantas que são criadas ou manipuladas magicamente para impedir movimento, como aquelas criadas pelo feitiço embaraçar.',
    },
    {
        name: 'Esconder em Plena Vista',
        level: 10,
        description:
            'A partir do 10º nível, você pode gastar 1 minuto criando camuflagem para si mesmo. Você deve ter acesso a lama fresca, sujeira, plantas, fuligem e outros materiais naturalmente ocorrentes com os quais criar sua camuflagem. Uma vez camuflado dessa maneira, você pode tentar se esconder pressionando-se contra uma superfície sólida, como uma árvore ou parede, que seja pelo menos tão alta e larga quanto você. Você ganha um bônus de +10 em testes de Destreza (Furtividade) enquanto permanecer lá sem se mover ou realizar ações. Uma vez que você se move ou toma uma ação ou uma reação, você deve se camuflar novamente para obter esse benefício.',
    },
    {
        name: 'Desaparecer',
        level: 14,
        description:
            'Começando no 14º nível, você pode usar a ação Esconder-se como uma ação bônus em seu turno. Além disso, você não pode ser rastreado por meios não mágicos, a menos que escolha deixar um rastro.',
    },
    {
        name: 'Sentidos Selvagens',
        level: 18,
        description:
            'No 18º nível, você ganha sentidos preternaturais que ajudam você a lutar contra criaturas que não pode ver. Quando você ataca uma criatura que não pode ver, sua incapacidade de vê-la não impõe desvantagem em seus ataques contra ela. Você também está ciente da localização de qualquer criatura invisível dentro de 6 espaços (9m / 30ft) de você, desde que a criatura não esteja escondida de você e você não esteja cego ou surdo.',
    },
    {
        name: 'Matador de Inimigos',
        level: 20,
        description:
            'Ao atingir o 20º nível, você se torna um caçador incomparável de seus inimigos. Uma vez em cada um de seus turnos, você pode adicionar seu modificador de Sabedoria ao rolagem de ataque ou dano de um ataque que você faz contra um de seus inimigos favoritos. Você pode escolher usar esta característica antes ou depois da rolagem, mas antes de quaisquer efeitos da rolagem serem aplicados.',
    },
]

const hunter: DnD5eSubClass = {
    name: 'Caçador',
    description:
        'Emular o arquétipo do Caçador significa aceitar o seu lugar como uma fortaleza entre a civilização e os terrores da natureza. Conforme você segue o caminho do Hunter, você aprende técnicas especializadas para lutar contra as ameaças que enfrenta, desde ogres enfurecidos e hordas de orcs até gigantes imponentes e dragões aterrorizantes.',
    features: [
        {
            name: 'Presas do Caçador',
            level: 3,
            description:
                'No 3º nível, você ganha uma das seguintes características à sua escolha.',
            options: [
                {
                    label: 'Colossus Slayer',
                    value: 'Colossus Slayer',
                    description:
                        'Sua tenacidade pode desgastar os inimigos mais potentes. Quando você atinge uma criatura com um ataque de arma, a criatura recebe 1d8 de dano extra se estiver abaixo de seu máximo de pontos de vida. Você só pode causar este dano extra uma vez por turno.',
                },
                {
                    label: 'Giant Killer',
                    value: 'Giant Killer',
                    description:
                        'Quando uma criatura Grande ou maior dentro de 1 espaço (1,5m / 5ft) de você acerta ou erra um ataque contra você, você pode usar sua reação para atacar essa criatura imediatamente após o ataque dela, desde que você possa ver a criatura',
                },
                {
                    label: 'Horde Breaker',
                    value: 'Horde Breaker',
                    description:
                        'Uma vez em cada um de seus turnos quando você faz um ataque com arma, você pode fazer outro ataque com a mesma arma contra uma criatura diferente que esteja dentro de 1 espaço (1,5m / 5ft) do alvo original e dentro do alcance de sua arma.',
                },
            ],
        },
        {
            name: 'Táticas Defensivas',
            level: 7,
            description:
                'No 7º nível, você ganha uma das seguintes características de sua escolha.',
            options: [
                {
                    label: 'Fugir da Multidão',
                    value: 'escape_the_horde',
                    description:
                        'Ataques de oportunidade contra você são feitos com desvantagem.',
                },
                {
                    label: 'Defesa Multiataque',
                    value: 'multiattack_defense',
                    description:
                        'Quando uma criatura acerta você com um ataque, você ganha um bônus de +4 na CA contra todos os ataques subsequentes feitos por essa criatura pelo resto do turno. ',
                },
                {
                    label: 'Vontade de Aço',
                    value: 'steel_will',
                    description:
                        'Você tem vantagem em testes de resistência contra ser amedrontado.',
                },
            ],
        },
        {
            name: 'Multiataque',
            level: 11,
            description:
                'No 11º nível, você ganha uma das seguintes características de sua escolha.',
            options: [
                {
                    label: 'Chuva de Flechas',
                    value: 'volley',
                    description:
                        'Você pode usar sua ação para fazer um ataque à distância contra qualquer número de criaturas a até 10 pés de um ponto que você possa ver dentro do alcance de sua arma. Você deve ter munição para cada alvo, como normal, e faz um rolamento de ataque separado para cada alvo.',
                },
                {
                    label: 'Ataque de Redemoinho',
                    value: 'whirlwind_attack',
                    description:
                        'Você pode usar sua ação para fazer um ataque corpo-a-corpo contra qualquer número de criaturas a até 5 pés de você, com um rolamento de ataque separado para cada alvo.',
                },
            ],
        },
        {
            name: 'Defesa Superior do Caçador',
            level: 15,
            description:
                'No 15º nível, você ganha uma das seguintes características de sua escolha.',
            options: [
                {
                    label: 'Evasão',
                    value: 'evasion',
                    description:
                        'Quando você é submetido a um efeito, como o sopro de fogo de um dragão vermelho ou um feitiço de raio, que permite que você faça um teste de resistência de Destreza para sofrer apenas metade do dano, você não sofre dano se tiver sucesso no teste de resistência e apenas metade do dano se falhar.',
                },
                {
                    label: 'Manter-se contra a Maré',
                    value: 'stand_against_the_tide',
                    description:
                        'Quando uma criatura hostil erra você com um ataque corpo-a-corpo, você pode usar sua reação para fazer com que aquela criatura repita o mesmo ataque contra outra criatura (que não ela mesma) de sua escolha. ',
                },
                {
                    label: 'Esquiva Sinistra',
                    value: 'uncanny_dodge',
                    description:
                        'Quando um atacante que você pode ver acerta você com um ataque, você pode usar sua reação para reduzir pela metade o dano do ataque contra você.',
                },
            ],
        },
    ],
}

const ranger: DnD5eClass = {
    key: 'ranger',
    name: 'Patrulheiro',
    description: 'HP d10, Habilidade Des e Sab, TR For e Des',
    features,
    subclasses: [hunter],
    hp: {
        dice: 'd10',
        average: 6,
    },
    spellsKnown: [
        0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11,
    ],
    spellsSlots: [
        [0, 0],
        [0, 2],
        [0, 3],
        [0, 3],
        [0, 4, 2],
        [0, 4, 2],
        [0, 4, 3],
        [0, 4, 3],
        [0, 4, 3, 2],
        [0, 4, 3, 2],
        [0, 4, 3, 3],
        [0, 4, 3, 3],
        [0, 4, 3, 3, 1],
        [0, 4, 3, 3, 1],
        [0, 4, 3, 3, 2],
        [0, 4, 3, 3, 2],
        [0, 4, 3, 3, 3, 1],
        [0, 4, 3, 3, 3, 1],
        [0, 4, 3, 3, 3, 2],
        [0, 4, 3, 3, 3, 2],
    ],
    proficiencies: {
        armor: ['light', 'medium', 'shield'],
        weapon: ['simple', 'martial'],
        savingThrows: ['strength', 'dexterity'],
        skills: {
            amount: 3,
            options: [
                {
                    label: 'Lidar com animais (Animal Handling)',
                    value: 'animal_handling',
                },
                { label: 'Atletismo (Athletics)', value: 'athletics' },
                { label: 'Intuição (Insight)', value: 'insight' },
                {
                    label: 'Investigação (Investigation)',
                    value: 'investigation',
                },
                { label: 'Natureza (Nature)', value: 'nature' },
                { label: 'Percepção (Perception)', value: 'perception' },
                { label: 'Furtividade (Stealth)', value: 'stealth' },
            ],
        },
    },
    equipmentOptions: [
        [
            [{ item: 'scale-mail', amount: 1 }],
            [{ item: 'leather-armor', amount: 1 }],
        ],
        [
            [{ item: 'shortsword', amount: 2 }],
            [{ item: 'Simple Melee', amount: 2 }],
        ],
        [
            [{ item: 'dungeoneers-pack', amount: 1 }],
            [{ item: 'explorers-pack', amount: 1 }],
        ],
        [
            [
                { item: 'longbow', amount: 1 },
                { item: 'arrow', amount: 20 },
            ],
        ],
        [[{ item: 'quiver', amount: 1 }]],
    ],
}

export default ranger

/*
Analise o texto a seguir e gere um arquivo json para cada paragrafo traduzido seguindo este schema: {
name: string em português;
level: number | number[];
description: string em português;
}

Texto:



*/

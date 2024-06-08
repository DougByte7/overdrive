import type { DnD5eClass, DnD5eFeature, DnD5eSubClass } from './interfaces'

const features: DnD5eFeature[] = [
    {
        name: 'Patrono de Outro Mundo',
        level: 1,
        description:
            'No 1º nível, você fez um acordo com um ser de outro mundo de sua escolha: o Arquifada, o Diabo ou o Ancião Primordial, cada um deles é detalhado no final da descrição da classe. Sua escolha concede a você características no 1º nível e novamente no 6º, 10º e 14º nível.',
    },
    {
        name: 'Magia de pacto',
        level: 1,
        description:
            'Seu estudo arcano e a magia concedida por seu patrono lhe deram habilidade com feitiços.',
    },
    {
        name: 'Truques',
        level: 1,
        description:
            'Você conhece dois truques à sua escolha da lista de magias do warlock. Você aprende mais truques de warlock à sua escolha em níveis mais altos, conforme mostrado na coluna Truques Conhecidos da tabela do Warlock.',
    },
    {
        name: 'Espaços de magia',
        level: 1,
        description:
            'A tabela do Warlock mostra quantos slots de magia você tem. A tabela também mostra qual é o nível desses slots; todos os seus slots de magia são do mesmo nível. Para conjurar uma de suas magias de warlock de 1º nível ou superior, você precisa gastar um slot de magia. Você recupera todos os slots de magia gastos quando termina um descanso curto ou longo. Por exemplo, quando você está no 5º nível, você tem dois slots de magia de 3º nível. Para conjurar a magia de 1º nível thunderwave, você precisa gastar um desses slots e conjurá-la como uma magia de 3º nível.',
    },
    {
        name: 'Magias Conhecidas de 1º Nível e Superior',
        level: 1,
        description:
            'No 1º nível, você conhece duas magias de 1º nível à sua escolha da lista de magias de warlock. A coluna Magias Conhecidas da tabela do Warlock mostra quando você aprende mais magias de warlock de sua escolha de 1º nível ou superior. Uma magia que você escolhe deve ser de um nível não superior ao que é mostrado na coluna Nível do Slot da tabela para o seu nível. Quando você alcança o 6º nível, por exemplo, você aprende uma nova magia de warlock, que pode ser de 1º, 2º ou 3º nível. Além disso, quando você ganha um nível nesta classe, você pode escolher uma das magias de warlock que conhece e substituí-la por outra magia da lista de magias de warlock, que também deve ser de um nível para o qual você tenha slots de magia.',
    },
    {
        name: 'Habilidade de Conjuração',
        level: 1,
        description:
            'Carisma é a sua habilidade de conjuração de magias para suas magias de warlock, então você usa seu Carisma sempre que uma magia se referir à sua habilidade de conjuração. Além disso, você usa seu modificador de Carisma ao definir a CD de resistência para uma magia de warlock que você conjura e ao fazer uma jogada de ataque com uma. CD de resistência da magia = 8 + seu bônus de proficiência + seu modificador de Carisma. Modificador de ataque de magia = seu bônus de proficiência + seu modificador de Carisma.',
    },
    {
        name: 'Foco de Conjuração',
        level: 1,
        description:
            'Você pode usar um foco arcano como foco de conjuração para suas magias de bruxo.',
    },
    {
        name: 'Invocações Místicas',
        level: [2, 5, 7, 9, 12, 15, 18],
        description: [
            'Em seu estudo do conhecimento oculto, você descobriu invocações místicas, fragmentos de conhecimento proibido que lhe conferem uma habilidade mágica duradoura. No 2º nível, você obtém duas invocações místicas de sua escolha. Suas opções de invocação estão detalhadas no final da descrição da classe. Quando você alcança certos níveis de bruxo, obtém invocações adicionais de sua escolha, conforme mostrado na coluna Invocações Conhecidas da tabela Warlock. Além disso, quando você sobe de nível nesta classe, pode escolher uma das invocações que conhece e substituí-la por outra invocação que poderia aprender naquele nível.',
        ],
        amount: [0, 2, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8],
        options: [
            {
                label: 'Agonizing Blast',
                value: 'agonizing-blast',
            },
            {
                label: 'Armor of Shadows',
                value: 'armor-of-shadows',
            },
            {
                label: 'Ascendant Step',
                value: 'ascendant-step',
            },
            {
                label: 'Beast Speech',
                value: 'beast-speech',
            },
            {
                label: 'Beguiling Influence',
                value: 'beguiling-influence',
            },
            {
                label: 'Bewitching Whispers',
                value: 'bewitching-whispers',
            },
            {
                label: 'Book of Ancient Secrets',
                value: 'book-of-ancient-secrets',
            },
            {
                label: 'Chains of Carceri',
                value: 'chains-of-carceri',
            },
            {
                label: "Devil's Sight",
                value: 'devils-sight',
            },
            {
                label: 'Dreadful Word',
                value: 'dreadful-word',
            },
            {
                label: 'Eldritch Sight',
                value: 'eldritch-sight',
            },
            {
                label: 'Eldritch Spear',
                value: 'eldritch-spear',
            },
            {
                label: 'Eyes of the Rune Keeper',
                value: 'eyes-of-the-rune-keeper',
            },
            {
                label: 'Fiendish Vigor',
                value: 'fiendish-vigor',
            },
            {
                label: 'Gaze of Two Minds',
                value: 'gaze-of-two-minds',
            },
            {
                label: 'Lifedrinker',
                value: 'lifedrinker',
            },
            {
                label: 'Mask of Many Faces',
                value: 'mask-of-many-faces',
            },
            {
                label: 'Master of Myriad Forms',
                value: 'master-of-myriad-forms',
            },
            {
                label: 'Minions of Chaos',
                value: 'minions-of-chaos',
            },
            {
                label: 'Mire the Mind',
                value: 'mire-the-mind',
            },
            {
                label: 'Misty Visions',
                value: 'misty-visions',
            },
            {
                label: 'One with Shadows',
                value: 'one-with-shadows',
            },
            {
                label: 'Otherworldly Leap',
                value: 'otherworldly-leap',
            },
            {
                label: 'Repelling Blast',
                value: 'repelling-blast',
            },
            {
                label: 'Sculptor of Flesh',
                value: 'sculptor-of-flesh',
            },
            {
                label: 'Sign of Ill Omen',
                value: 'sign-of-ill-omen',
            },
            {
                label: 'Thief of Five Fates',
                value: 'thief-of-five-fates',
            },
            {
                label: 'Thirsting Blade',
                value: 'thirsting-blade',
            },
            {
                label: 'Visions of Distant Realms',
                value: 'visions-of-distant-realms',
            },
            {
                label: 'Voice of the Chain Master',
                value: 'voice-of-the-chain-master',
            },
            {
                label: 'Whispers of the Grave',
                value: 'whispers-of-the-grave',
            },
            {
                label: 'Witch Sight',
                value: 'witch-sight',
            },
        ],
        misc: {
            'agonizing-blast': [
                'Agonizing Blast',
                'Prerequisite: eldritch blast cantrip',
                'When you cast eldritch blast, add your Charisma modifier to the damage it deals on a hit.',
            ],
            'armor-of-shadows': [
                'Armor of Shadows',
                'You can cast mage armor on yourself at will, without expending a spell slot or material components.',
            ],
            'ascendant-step': [
                'Ascendant Step',
                'Prerequisite: 9th level',
                'You can cast levitate on yourself at will, without expending a spell slot or material components.',
            ],

            'beast-speech': [
                'Beast Speech',
                'You can cast speak with animals at will, without expending a spell slot',
            ],
            'beguiling-influence': [
                'Beguiling Influence',
                'You gain proficiency in the Deception and Persuasion skills',
            ],
            'bewitching-whispers': [
                'Bewitching Whispers',
                'Prerequisite: 7th level',
                'You can cast compulsion once using a warlock spell slot',
                "You can't do so again until you finish a long rest",
            ],
            'book-of-ancient-secrets': [
                'Book of Ancient Secrets',
                'Prerequisite: Pact of the Tome feature',
                'You can now inscribe magical rituals in your Book of Shadows',
                "Choose two 1st-level spells that have the ritual tag from any class's spell list",
                "The spells appear in the book and don't count against the number of spells you know",
                'With your Book of Shadows in hand, you can cast the chosen spells as rituals',
                'You can also cast a warlock spell you know as a ritual if it has the ritual tag',
                'On your adventures, you can add other ritual spells to your Book of Shadows',
                "When you find such a spell, you can add it to the book if the spell's level is equal to or less than half your warlock level (rounded up) and if you can spare the time to transcribe the spell",
                'For each level of the spell, the transcription process takes 2 hours and costs 50 gp for the rare inks needed to inscribe it',
            ],
            'chains-of-carceri': [
                'Chains of Carceri',
                'Prerequisite: 15th level, Pact of the Chain feature',
                'You can cast hold monster at will—targeting a celestial, fiend, or elemental—without expending a spell slot or material components',
                'You must finish a long rest before you can use this invocation on the same creature again',
            ],
            'devils-sight': [
                "Devil's Sight",
                'You can see normally in darkness, both magical and nonmagical, to a distance of 120 feet',
            ],
            'dreadful-word': [
                'Dreadful Word',
                'Prerequisite: 7th level',
                'You can cast confusion once using a warlock spell slot',
                "You can't do so again until you finish a long rest",
            ],
            'eldritch-sight': [
                'Eldritch Sight',
                'You can cast detect magic at will, without expending a spell slot',
            ],
            'eldritch-spear': [
                'Eldritch Spear',
                'Prerequisite: eldritch blast cantrip',
                'When you cast eldritch blast, its range is 300 feet',
            ],
            'eyes-of-the-rune-keeper': [
                'Eyes of the Rune Keeper',
                'You can read all writing',
            ],
            'fiendish-vigor': [
                'Fiendish Vigor',
                'You can cast false life on yourself at will as a 1st-level spell, without expending a spell slot or material components',
            ],
            'gaze-of-two-minds': [
                'Gaze of Two Minds',
                'You can use your action to touch a willing humanoid and perceive through its senses until the end of your next turn',
                'As long as the creature is on the same plane of existence as you, you can use your action on subsequent turns to maintain this connection, extending the duration until the end of your next turn',
                "While perceiving through the other creature's senses, you benefit from any special senses possessed by that creature, and you are blinded and deafened to your own surroundings",
            ],
            lifedrinker: [
                'Lifedrinker',
                'Prerequisite: 12th level, Pact of the Blade feature',
                'When you hit a creature with your pact weapon, the creature takes extra necrotic damage equal to your Charisma modifier (minimum 1)',
            ],
            'mask-of-many-faces': [
                'Mask of Many Faces',
                'You can cast disguise self at will, without expending a spell slot',
            ],
            'master-of-myriad-forms': [
                'Master of Myriad Forms',
                'Prerequisite: 15th level',
                'You can cast alter self at will, without expending a spell slot',
            ],
            'minions-of-chaos': [
                'Minions of Chaos',
                'Prerequisite: 9th level',
                'You can cast conjure elemental once using a warlock spell slot',
                "You can't do so again until you finish a long rest",
            ],
            'mire-the-mind': [
                'Mire the Mind',
                'Prerequisite: 5th level',
                'You can cast slow once using a warlock spell slot',
                "You can't do so again until you finish a long rest",
            ],
            'misty-visions': [
                'Misty Visions: You can cast silent image at will, without expending a spell slot or material components',
            ],
            'one-with-shadows': [
                'One with Shadows',
                'Prerequisite: 5th level',
                'When you are in an area of dim light or darkness, you can use your action to become invisible until you move or take an action or a reaction',
            ],
            'otherworldly-leap': [
                'Otherworldly Leap',
                'Prerequisite: 9th level',
                'You can cast jump on yourself at will, without expending a spell slot or material components',
            ],
            'repelling-blast': [
                'Repelling Blast',
                'Prerequisite: eldritch blast cantrip',
                'When you hit a creature with eldritch blast, you can push the creature up to 10 feet away from you in a straight line',
            ],
            'sculptor-of-flesh': [
                'Sculptor of Flesh',
                'Prerequisite: 7th level',
                'You can cast polymorph once using a warlock spell slot',
                "You can't do so again until you finish a long rest",
            ],
            'sign-of-ill-omen': [
                'Sign of Ill Omen',
                'Prerequisite: 5th level',
                'You can cast bestow curse once using a warlock spell slot',
                "You can't do so again until you finish a long rest",
            ],
            'thief-of-five-fates': [
                'Thief of Five Fates',
                'You can cast bane once using a warlock spell slot',
                "You can't do so again until you finish a long rest",
            ],
            'thirsting-blade': [
                'Thirsting Blade',
                'Prerequisite: 5th level, Pact of the Blade feature',
                'You can attack with your pact weapon twice, instead of once, whenever you take the Attack action on your turn',
            ],
            'visions-of-distant-realms': [
                'Visions of Distant Realms',
                'Prerequisite: 15th level',
                'You can cast arcane eye at will, without expending a spell slot',
            ],
            'voice-of-the-chain-master': [
                'Voice of the Chain Master',
                'Prerequisite: Pact of the Chain feature',
                "You can communicate telepathically with your familiar and perceive through your familiar's senses as long as you are on the same plane of existence",
                "Additionally, while perceiving through your familiar's senses, you can also speak through your familiar in your own voice, even if your familiar is normally incapable of speech",
            ],
            'whispers-of-the-grave': [
                'Whispers of the Grave',
                'Prerequisite: 9th level',
                'You can cast speak with dead at will, without expending a spell slot',
            ],
            'witch-sight': [
                'Witch Sight',
                'Prerequisite: 15th level',
                'You can see the true form of any shapechanger or creature concealed by illusion or transmutation magic while the creature is within 30 feet of you and within line of sight',
            ],
        },
    },
    {
        name: 'Dádiva do Pacto',
        level: 3,
        description:
            'No 3º nível, seu patrono sobrenatural concede um presente a você por seu serviço leal. Você ganha uma das seguintes características de sua escolha.',
        options: [
            {
                label: 'Pacto da Corrente',
                value: 'pact-of-the-chain',
            },
            {
                label: 'Pacto da Lâmina',
                value: 'pact-of-the-blade',
            },
            {
                label: 'Pacto do Tomo',
                value: 'pact-of-the-tome',
            },
        ],
        misc: {
            'pact-of-the-chain': [
                'Pacto da Corrente',
                "Você aprende a magia 'Find Familiar' e pode lançá-lo como um ritual. O feitiço não conta no número de feitiços que você conhece.",
                'Quando você lança a magia, pode escolher uma das formas normais para o seu familiar ou uma das seguintes formas especiais: imp, pseudodragon, quasit ou sprite.',
                'Além disso, quando você realiza a ação de Ataque, você pode renunciar a um dos seus próprios ataques para permitir que seu familiar faça um ataque próprio com sua reação.',
            ],
            'pact-of-the-blade': [
                'Pacto da Lâmina',
                'Você pode usar sua ação para criar uma arma de pacto em sua mão vazia. Você pode escolher a forma que esta arma corpo a corpo assume cada vez que a cria. Você é proficiente com ela enquanto a empunha. Esta arma conta como mágica para superar resistência e imunidade a ataques e dano não mágico.',
                'Sua arma de pacto desaparece se estiver a mais de 1.5m (5ft) de você por 1 minuto ou mais. Ela também desaparece se você usar este recurso novamente, se a dispensar (sem ação necessária) ou se você morrer.',
                'Você pode transformar uma arma mágica em sua arma de pacto realizando um ritual especial enquanto segura a arma. Você realiza o ritual ao longo de 1 hora, que pode ser feito durante um descanso curto. Em seguida, você pode dispensar a arma, enviando-a para um espaço extra-dimensional, e ela aparece sempre que você criar sua arma de pacto depois disso. Você não pode afetar um artefato ou uma arma consciente dessa maneira. A arma deixa de ser sua arma de pacto se você morrer, se realizar o ritual de 1 hora em uma arma diferente ou se usar um ritual de 1 hora para quebrar seu vínculo com ela. A arma aparece aos seus pés se estiver no espaço extra-dimensional quando o vínculo se rompe.',
            ],
            'pact-of-the-tome': [
                'Pacto do Tomo',
                'Seu patrono lhe concede um grimório chamado Livro das Sombras. Quando você obtém esse recurso, escolha três truques de qualquer lista de magias de classe (os três não precisam ser da mesma lista). Enquanto o livro estiver em sua pessoa, você pode lançar esses truques à vontade. Eles não contam no número de truques que você conhece. Se eles não estiverem na lista de magias do warlock, eles ainda são considerados magias de warlock para você.',
                'Se você perder o seu Livro das Sombras, pode realizar uma cerimônia de 1 hora para receber um substituto do seu patrono. Essa cerimônia pode ser realizada durante um descanso curto ou longo e destrói o livro anterior. O livro se transforma em cinzas quando você morre.',
            ],
        },
    },
    {
        name: 'Melhoria de Atributo',
        level: [4, 8, 12, 16, 19],
        description:
            'Quando você alcança o 4º nível, e novamente no 8º, 12º, 16º e 19º nível, você pode aumentar um atributo de sua escolha em 2, ou pode aumentar dois atributos de sua escolha em 1. Como de costume, você não pode aumentar um atributo acima de 20 usando essa característica.',
    },
    {
        name: 'Arcano Místico',
        level: [11, 13, 15, 17],
        description:
            'No 11º nível, seu patrono concede a você um segredo mágico chamado arcano. Escolha um feitiço de 6º nível da lista de feitiços de bruxo como este arcano. Você pode conjurar seu feitiço arcano uma vez sem gastar um espaço de feitiço. Você deve terminar um descanso longo antes de poder fazê-lo novamente. Em níveis mais altos, você ganha mais feitiços de bruxo de sua escolha que podem ser conjurados desta maneira: um feitiço de 7º nível no 13º nível, um feitiço de 8º nível no 15º nível e um feitiço de 9º nível no 17º nível. Você recupera todos os usos do seu Arcano Místico quando termina um descanso longo.',
    },
    {
        name: 'Mestre Místico',
        level: 20,
        description:
            'No 20º nível, você pode recorrer à sua reserva interna de poder místico enquanto suplica ao seu patrono para recuperar espaços de feitiços gastos. Você pode gastar 1 minuto implorando ao seu patrono por ajuda para recuperar todos os seus espaços de feitiços gastos da característica Magia do Pacto. Depois de recuperar espaços de feitiços com essa característica, você deve terminar um descanso longo antes de poder fazê-lo novamente.',
    },
    {
        name: 'Sua Dádiva do Pacto',
        level: 1,
        description:
            'Cada opção de Dádiva do Pacto produz uma criatura especial ou um objeto que reflete a natureza do seu patrono. Pacto da Corrente: Seu familiar é mais astuto do que um familiar típico. Sua forma padrão pode ser um reflexo do seu patrono, com diabretes e quasits ligados ao Diabo. Pacto da Lâmina: Se você serve ao Diabo, sua arma pode ser um machado feito de metal negro e adornado com chamas decorativas. Pacto do Tomo: Seu Livro das Sombras pode ser um pesado tomo encadernado em pele de demônio cravejado de ferro, contendo feitiços de conjuração e uma riqueza de conhecimento proibido sobre as sinistras regiões do cosmos, um presente do Diabo.',
    },
]

const fiend: DnD5eSubClass = {
    name: 'O Diabo',
    description:
        "Você fez um pacto com um demônio dos planos inferiores da existência, um ser cujos objetivos são malignos, mesmo que você lute contra esses objetivos. Esses seres desejam a corrupção ou destruição de todas as coisas, incluindo você no final. Demônios poderosos o suficiente para forjar um pacto incluem senhores demônios como Demogorgon, Orcus, Fraz'Urb-luu e Baphomet; arquidiabos como Asmodeus, Dispater, Mefistófeles e Belial; demônios abissais e balors especialmente poderosos; e ultroloths e outros senhores dos yugoloths.",
    features: [
        {
            name: 'Lista Expandida de Feitiços',
            level: 1,
            description: `O Diabo permite que você escolha em uma lista expandida de feitiços quando aprende um feitiço de bruxo. Os seguintes feitiços são adicionados à lista de feitiços de bruxo para você. Feitiços Expandidos do Diabo: Nível de Feitiço - Feitiços; 1º - burning	hands,	command; 2º - blindness/deafness,	scorching	ray; 3º - fireball,	stinking	cloud; 4º - fire	shield,	wall	of	fire; 5º - flame	strike,	hallow.`,
        },
        {
            name: 'Bênção do Obscuro',
            level: 1,
            description:
                'A partir do 1º nível, quando você reduzir uma criatura hostil a 0 pontos de vida, você ganha pontos de vida temporários iguais ao seu modificador de Carisma + seu nível de bruxo (mínimo de 1).',
        },
        {
            name: 'Sorte do Próprio Obscuro',
            level: 6,
            description:
                'A partir do 6º nível, você pode invocar seu patrono para alterar o destino a seu favor. Quando você faz uma verificação de habilidade ou um teste de resistência, você pode usar esta característica para adicionar um d10 à sua rolagem. Você pode fazer isso após ver a rolagem inicial, mas antes de qualquer um dos efeitos da rolagem ocorrerem. Depois de usar esta característica, você não pode usá-la novamente até terminar um descanso curto ou longo.',
        },
        {
            name: 'Resiliência Diabólica',
            level: 10,
            description:
                'A partir do 10º nível, você pode escolher um tipo de dano quando terminar um descanso curto ou longo. Você ganha resistência a esse tipo de dano até escolher um diferente com essa característica. O dano de armas mágicas ou armas de prata ignora essa resistência.',
        },
        {
            name: 'Arremesso Através do Inferno',
            level: 14,
            description:
                'A partir do 14º nível, quando você acertar uma criatura com um ataque, você pode usar esta característica para transportar instantaneamente o alvo através dos planos inferiores. A criatura desaparece e é lançada através de uma paisagem aterrorizante. No final do seu próximo turno, o alvo retorna ao espaço que ocupava anteriormente ou ao espaço desocupado mais próximo. Se o alvo não for um demônio, ele sofre 10d10 de dano psíquico ao se recuperar de sua horrível experiência. Depois de usar esta característica, você não pode usá-la novamente até terminar um descanso longo.',
        },
    ],
    expandedSpellList: [
        'Burning Hands',
        'Command',
        'Blindness/Deafness',
        'Scorching Ray',
        'Fireball',
        'Stinking Cloud',
        'Fire Shield',
        'Wall of Fire',
        'Flame Strike',
        'Hallow',
    ],
}

const warlock: DnD5eClass = {
    key: 'warlock',
    name: 'Bruxo',
    description: 'HP d8, Habilidade Cha, TR Sab e Car',
    features,
    subclasses: [fiend],
    hp: {
        dice: 'd8',
        average: 5,
    },
    cantripKnown: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    spellsKnown: [
        2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15,
    ],
    spellsSlots: [
        [Infinity, 1],
        [Infinity, 2],
        [Infinity, 0, 2],
        [Infinity, 0, 2],
        [Infinity, 0, 0, 2],
        [Infinity, 0, 0, 2],
        [Infinity, 0, 0, 0, 2],
        [Infinity, 0, 0, 0, 2],
        [Infinity, 0, 0, 0, 0, 2],
        [Infinity, 0, 0, 0, 0, 2],
        [Infinity, 0, 0, 0, 0, 3],
        [Infinity, 0, 0, 0, 0, 3],
        [Infinity, 0, 0, 0, 0, 3],
        [Infinity, 0, 0, 0, 0, 3],
        [Infinity, 0, 0, 0, 0, 3],
        [Infinity, 0, 0, 0, 0, 3],
        [Infinity, 0, 0, 0, 0, 4],
        [Infinity, 0, 0, 0, 0, 4],
        [Infinity, 0, 0, 0, 0, 4],
        [Infinity, 0, 0, 0, 0, 4],
    ],
    proficiencies: {
        weapon: ['simple'],
        savingThrows: ['wisdom', 'charisma'],
        skills: {
            amount: 2,
            options: [
                { label: 'Arcana', value: 'arcana' },
                { label: 'Enganação (Deception)', value: 'deception' },
                { label: 'História (History)', value: 'history' },
                { label: 'Intimidação (Intimidation)', value: 'intimidation' },
                {
                    label: 'Investigação (Investigation)',
                    value: 'investigation',
                },
                { label: 'Natureza (Nature)', value: 'nature' },
                { label: 'Religião (Religion)', value: 'religion' },
            ],
        },
    },
    equipmentOptions: [
        [
            [
                { item: 'crossbow-light', amount: 1 },
                { item: 'crossbow-bolt', amount: 20 },
            ],
            [{ item: 'Simple', amount: 1 }],
        ],
        [
            [{ item: 'component-pouch', amount: 1 }],
            [{ item: 'arcane-foci', amount: 1 }],
        ],
        [
            [{ item: 'scholars-pack', amount: 1 }],
            [{ item: 'dungeoneers-pack', amount: 1 }],
        ],
        [[{ item: 'dagger', amount: 2 }]],
        [
            [
                { item: 'leather-armor', amount: 1 },
                { item: 'Simple', amount: 1 },
            ],
        ],
    ],
}

export default warlock

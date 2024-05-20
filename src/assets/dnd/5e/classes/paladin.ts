import type { DnD5eClass, DnD5eFeature, DnD5eSubClass } from './interfaces'

const features: DnD5eFeature[] = [
    {
        name: 'Sentido Divino',
        level: 1,
        description:
            'A presença do mal forte é registrada em seus sentidos como um odor nocivo e o poder do bem forte é como música celestial aos seus ouvidos. Como uma ação, você pode abrir sua consciência para detectar essas forças. Até o final do seu próximo turno, você conhece a localização de qualquer celestial, demoníaco ou morto-vivo dentro de 12 espaços (18m / 60ft) de você que não esteja atrás de cobertura total. Você conhece o tipo (celestial, demoníaco ou morto-vivo) de qualquer ser cuja presença você detecta, mas não sua identidade (como o vampiro Conde Strahd von Zarovich, por exemplo). Dentro do mesmo raio, você também detecta a presença de qualquer lugar ou objeto que tenha sido consagrado ou profanado, como com o feitiço santificar. Você pode usar essa habilidade um número de vezes igual a 1 + seu modificador de Carisma. Quando você termina um descanso longo, você recupera todos os usos gastos.',
    },
    {
        name: 'Imposição de Mãos',
        level: 1,
        description:
            'Seu toque abençoado pode curar ferimentos. Você tem um reserva de poder de cura que se recupera quando você faz um descanso longo. Com essa reserva, você pode restaurar um número total de pontos de vida igual ao seu nível de paladino × 5. Como uma ação, você pode tocar uma criatura e retirar poder da reserva para restaurar um número de pontos de vida para aquela criatura, até o máximo restante em sua reserva. Alternativamente, você pode gastar 5 pontos de vida do sua reserva de cura para curar a criatura de uma doença ou neutralizar um veneno afetando-a. Você pode curar várias doenças e neutralizar vários venenos com um único uso de Imposição de Mãos, gastando pontos de vida separadamente para cada um. Esta habilidade não tem efeito sobre mortos-vivos e construtos.',
    },
    {
        name: 'Estilo de Combate',
        level: 2,
        description:
            'No 2º nível, você adota um estilo de luta como sua especialidade. Escolha uma das seguintes opções. Você não pode escolher uma opção de Estilo de Combate mais de uma vez, mesmo que possa escolher novamente mais tarde.',
    },
    {
        name: 'Lançamento de Feitiços',
        level: 2,
        description:
            'No 2º nível, você aprendeu a canalizar a magia divina por meio de meditação e oração para lançar feitiços como um clérigo. ',
    },
    {
        name: 'Preparação e Lançamento de Feitiços',
        level: 2,
        description:
            'A tabela de paladino mostra quantos espaços de feitiço você tem para lançar seus feitiços. Para lançar um de seus feitiços de paladino de 1º nível ou superior, você deve gastar um espaço de feitiço do nível do feitiço ou superior. Você recupera todos os espaços de feitiço gastos quando termina um descanso longo. Você prepara a lista de feitiços de paladino que estão disponíveis para você lançar, escolhendo da lista de feitiços de paladino. Quando o fizer, escolha um número de feitiços de paladino igual ao seu modificador de Carisma + metade do seu nível de paladino, arredondado para baixo (mínimo de um feitiço). Os feitiços devem ser de um nível para o qual você tenha espaços de feitiço. Por exemplo, se você for um paladino de 5º nível, terá quatro espaços de feitiço de 1º nível e dois de 2º nível. Com um Carisma de 14, sua lista de feitiços preparados pode incluir quatro feitiços de 1º ou 2º nível, em qualquer combinação. Se você preparar o feitiço de 1º nível cura ferimentos, pode lançá-lo usando um espaço de 1º ou 2º nível. Lançar o feitiço não o remove de sua lista de feitiços preparados. Você pode alterar sua lista de feitiços preparados quando termina um descanso longo. Preparar uma nova lista de feitiços de paladino requer tempo gasto em oração e meditação: pelo menos 1 minuto por nível de feitiço para cada feitiço em sua lista.',
    },
    {
        name: 'Habilidade de Lançamento de Feitiços',
        level: 2,
        description:
            'O Carisma é sua habilidade de lançamento de feitiços para seus feitiços de paladino, pois seu poder deriva da força de suas convicções. Você usa seu Carisma sempre que um feitiço se refere à sua habilidade de lançamento de feitiços. Além disso, você usa o modificador de Carisma ao definir a CD de resistência para um feitiço de paladino que você lançar e ao fazer um teste de ataque com um deles. CD de resistência do feitiço = 8 + seu bônus de proficiência + seu modificador de Carisma. Modificador de ataque de feitiço = seu bônus de proficiência + seu modificador de Carisma.',
    },
    {
        name: 'Foco de Lançamento de Feitiços',
        level: 2,
        description:
            'Você pode usar um símbolo sagrado como foco de lançamento de feitiços para seus feitiços de paladino.',
    },
    {
        name: 'Golpe Divino',
        level: 2,
        description:
            'Ao atacar com uma arma corpo-a-corpo, você pode gastar um espaço de magia para causar dano radiante adicional ao alvo, além do dano da arma. O dano extra é 2d8 para um espaço de magia de 1º nível, mais 1d8 para cada nível de magia acima do 1º, até um máximo de 5d8. O dano aumenta em 1d8 se o alvo for um morto-vivo ou um abissal.',
    },
    {
        name: 'Saúde Divina',
        level: 3,
        description:
            'A magia divina fluindo através de você o torna imune a doenças.',
    },
    {
        name: 'Juramento Sagrado',
        level: 3,
        description:
            'Ao atingir o nível 3, você presta um juramento que o vincula como paladino para sempre. Até então, você esteve em uma fase preparatória, comprometido com o caminho, mas ainda não jurou. Agora, você escolhe um juramento, como o Juramento de Devoção. Sua escolha concede a você recursos no nível 3 e novamente nos níveis 7, 15 e 20. Esses recursos incluem feitiços juramentados e a característica Canalizar Divindade.',
    },
    {
        name: 'Feitiços de Juramento',
        level: 3,
        description:
            'Cada juramento tem uma lista de feitiços associados. Você obtém acesso a esses feitiços nos níveis especificados na descrição do juramento. Uma vez que você tenha acesso a um feitiço juramentado, você sempre o terá preparado. Feitiços juramentados não contam contra o número de feitiços que você pode preparar a cada dia. Se você obtiver um feitiço juramentado que não esteja na lista de feitiços do paladino, o feitiço será um feitiço de paladino para você.',
    },
    {
        name: 'Canalizar Divindade',
        level: 3,
        description:
            'Seu juramento permite que você canalize energia divina para alimentar efeitos mágicos. Cada opção de Canalizar Divindade fornecida pelo seu juramento explica como usá-la. Quando você usa sua Canalizar Divindade, escolhe qual opção usar. Você deve então terminar um descanso curto ou longo para usar sua Canalizar Divindade novamente. Alguns efeitos da Canalizar Divindade requerem jogadas de salvamento. Quando você usa tal efeito desta classe, o DC é igual ao seu DC de salvamento de feitiço de paladino.',
    },
    {
        name: 'Melhoria de Atributo',
        level: [4, 8, 12, 16, 19],
        description:
            'Quando você alcança o 4º nível e novamente no 8º, 12º, 16º e 19º nível, você pode aumentar um atributo de sua escolha em 2, ou pode aumentar dois atributos de sua escolha em 1. Como de costume, você não pode aumentar um atributo acima de 20 usando essa característica.',
    },
    {
        name: 'Ataque Extra',
        level: 5,
        description:
            'A partir do 5º nível, você pode atacar duas vezes, em vez de uma, sempre que usar a ação Atacar em seu turno.',
    },
    {
        name: 'Aura de Proteção',
        level: [6, 18],
        description:
            'Começando no 6º nível, sempre que você ou uma criatura amigável dentro de 2 espaços ( 3m / 10ft ) de você precisar fazer um teste de resistência, a criatura recebe um bônus ao teste de resistência igual ao seu modificador de Carisma (com um bônus mínimo de +1). Você precisa estar consciente para conceder esse bônus. No 18º nível, o alcance desta aura aumenta para 6 espaços ( 9m / 30ft ).',
    },
    {
        name: 'Aura de Coragem',
        level: [10, 18],
        description:
            'Começando no 10º nível, você e as criaturas amigáveis dentro de 2 espaços ( 3m / 10ft ) de você não podem ficar amedrontados enquanto você estiver consciente. No 18º nível, o alcance desta aura aumenta para 6 espaços ( 9m / 30ft ).',
    },
    {
        name: 'Golpe Divino Aprimorado',
        level: 11,
        description:
            'A partir do 11º nível, você está tão impregnado de poder divino que todos os seus ataques com arma corpo a corpo carregam poder divino com eles. Sempre que você acertar uma criatura com uma arma corpo a corpo, a criatura recebe um dano adicional de 1d8 de dano radiante. Se você também usar o Golpe Divino com um ataque, adicione esse dano ao dano adicional do seu Golpe Divino.',
    },
    {
        name: 'Toque Purificador',
        level: 14,
        description:
            'Começando no 14º nível, você pode usar sua ação para acabar com um feitiço em si mesmo ou em uma criatura voluntária que você tocar. Você pode usar essa habilidade um número de vezes igual ao seu modificador de Carisma (com um mínimo de uma vez). Você recupera todos os usos gastos quando termina um descanso longo.',
    },
    {
        name: 'Juramentos Sagrados',
        level: 3,
        description:
            'Tornar-se um paladino envolve fazer votos que comprometam o paladino à causa da retidão, um caminho ativo de combater a maldade. O juramento final, tomado quando ele ou ela atinge o 3º nível, é a culminação de todo o treinamento do paladino. Alguns personagens com essa classe não se consideram verdadeiros paladinos até que atinjam o 3º nível e façam esse juramento. Para outros, o próprio ato de prestar o juramento é uma formalidade, um carimbo oficial no que sempre foi verdadeiro no coração do paladino.',
    },
    {
        name: 'Quebrando seu Juramento',
        level: 3,
        description:
            'Um paladino tenta manter os mais altos padrões de conduta, mas mesmo o paladino mais virtuoso é falível. Às vezes, o caminho certo se mostra muito exigente, às vezes uma situação exige o menor dos dois males e, às vezes, o calor da emoção faz com que um paladino transgrida seu juramento. Um paladino que quebrou um juramento normalmente busca a absolvição de um clérigo que compartilha de sua fé ou de outro paladino da mesma ordem. O paladino pode passar uma vigília inteira em oração como sinal de penitência, ou empreender um jejum ou ato semelhante de auto-negação. Após um rito de confissão e perdão, o paladino começa de novo. Se um paladino violar seu juramento voluntariamente e não mostrar nenhum sinal de arrependimento, as consequências podem ser mais sérias. A critério do Mestre, um paladino impenitente pode ser forçado a abandonar esta classe e adotar outra.',
    },
]

const devotion: DnD5eSubClass = {
    name: 'Juramento de Devoção',
    description:
        'O Juramento de Devoção prende o paladino aos ideais mais elevados de justiça, virtude e ordem. Às vezes chamados de cavaleiros, cavaleiros brancos ou guerreiros sagrados, esses paladinos atendem ao ideal do cavaleiro de armadura reluzente, agindo com honra em busca da justiça e do bem maior. Eles se mantêm nos mais altos padrões de conduta, e alguns, para melhor ou para pior, mantêm o resto do mundo nos mesmos padrões. Muitos que fazem esse juramento são devotos de deuses da lei e do bem e usam os preceitos de seus deuses como medida de sua devoção. Eles consideram os anjos - os servos perfeitos do bem - como seus ideais e incorporam imagens de asas angelicais em seus capacetes ou brasões de armas.',
    features: [
        {
            name: 'Preceitos da Devoção',
            level: 3,
            description:
                'Embora as palavras exatas e os preceitos do Juramento de Devoção variem, os paladinos deste juramento compartilham destes preceitos: Honestidade. Não minta nem trapaceie. Deixe sua palavra ser sua promessa. Coragem. Nunca tema agir, embora a cautela seja sábia. Compaixão. Auxilie os outros, proteja os fracos e puna aqueles que os ameaçam. Mostre misericórdia aos seus inimigos, mas tempere-a com sabedoria. Honra. Trate os outros com justiça e deixe suas ações honrosas serem um exemplo para eles. Faça o máximo de bem possível, causando o menor dano. Dever. Seja responsável por suas ações e suas consequências, proteja aqueles que lhe são confiados e obedeça aqueles que têm autoridade justa sobre você.',
        },
        {
            name: 'Magias do Juramento',
            level: 3,
            description: [
                'Você ganha magias de juramento nos níveis de paladino listados.',
                '| Nível de Paladino | Magias |',
                '|-|-|',
                '| 3rd  | protection	from	evil	and	good,	sanctuary |',
                '| 5th  | lesser	restoration,	zone	of	truth       |',
                '| 9th  | beacon	of	hope,	dispel	magic             |',
                '| 13th | freedom	of	movement,	guardian	of	faith   |',
                '| 17th | commune,	flame	strike                      |',
            ],
        },
        {
            name: 'Canalizar Divindade',
            level: 3,
            description:
                'Quando você faz este juramento no 3º nível, você ganha as duas seguintes opções de Canalizar Divindade. Arma Sagrada: Com uma ação, você pode imbuir uma arma que está segurando com energia positiva, usando sua Canalizar Divindade. Por 1 minuto, você adiciona o seu modificador de Carisma para rolagens de ataque feitas com essa arma (com um bônus mínimo de +1). A arma também emite uma luz brilhante em um raio de 4 espaços (6m / 20ft) e uma luz fraca em 4 espaços (6m / 20ft) além disso. Se a arma não é mágica, ela se torna mágica durante a duração. Você pode terminar esse efeito em seu turno como parte de qualquer outra ação. Se você não estiver mais segurando ou carregando esta arma, ou se você ficar inconsciente, este efeito termina. Expulsar o Profano: Com uma ação, você apresenta o seu símbolo sagrado e profere uma oração censurando aberrações e mortos-vivos, usando sua Canalizar Divindade. Cada abominação ou morto-vivo que puder ver ou ouvi-lo dentro de 6 espaços (9m / 30ft) de você deve fazer um teste de resistência de Sabedoria. Se a criatura falhar em sua jogada de salvamento, ela é afastada por 1 minuto ou até que sofra dano. Uma criatura afastada deve gastar seus turnos tentando se mover o mais longe possível de você e não pode se mover voluntariamente para um espaço dentro de 6 espaços (9m / 30ft) de você. Ela também não pode realizar reações. Para sua ação, ela pode usar apenas a ação Disparada ou tentar escapar de um efeito que a impeça de se mover. Se não houver para onde se mover, a criatura pode usar a ação Esquivar.',
        },
        {
            name: 'Aura de Devoção',
            level: [7, 18],
            description:
                'A partir do 7º nível, você e criaturas amigáveis ​​dentro de 2 espaços (3m / 10ft) de você não podem ser enfeitiçados enquanto você estiver consciente. No 18º nível, o alcance dessa aura aumenta para 6 espaços (9m / 30ft).',
        },
        {
            name: 'Pureza de Espírito',
            level: 15,
            description:
                'A partir do 15º nível, você está sempre sob os efeitos do feitiço proteção contra o mal e o bem.',
        },
        {
            name: 'Nimbus Sagrado',
            level: 20,
            description:
                'No 20º nível, com uma ação, você pode emanar uma aura de luz solar. Por 1 minuto, luz brilhante brilha em um raio de 6 espaços (9m / 30ft) a partir de você, e luz fraca brilha a 6 espaços (9m / 30ft) além disso. Sempre que uma criatura inimiga começa seu turno na luz brilhante, ela sofre 10 de dano radiante. Além disso, durante a duração, você tem vantagem em testes de resistência contra magias lançadas por fiends ou undead. Depois de usar essa habilidade, você não pode usá-la novamente até terminar um descanso longo.',
        },
    ],
    spells: [
        'Protection from Evil and Good',
        'Sanctuary',
        'Lesser Restoration',
        'Zone of Truth',
        'Beacon of Hope',
        'Dispel Magic',
        'Freedom of Movement',
        'Guardian of Faith',
        'Commune',
        'Flame Strike',
    ],
}

const paladin: DnD5eClass = {
    key: 'paladin',
    name: 'Paladino',
    description: 'HP d10, Habilidade Sab e Car, TR Sab e Car',
    features,
    subclasses: [devotion],
    hp: {
        dice: 'd10',
        average: 6,
    },
    spellsKnown: Infinity,
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
        armor: ['light', 'medium', 'heavy', 'shield'],
        weapon: ['simple', 'martial'],
        savingThrows: ['wisdom', 'charisma'],
        skills: {
            amount: 2,
            options: [
                { label: 'Atletismo (Athletics)', value: 'athletics' },
                { label: 'Intuição (Insight)', value: 'insight' },
                { label: 'Intimidação (Intimidation)', value: 'intimidation' },
                { label: 'Medicina (Medicine)', value: 'medicine' },
                { label: 'Persuasão (Persuasion)', value: 'persuasion' },
                { label: 'Religião (Religion)', value: 'religion' },
            ],
        },
    },
    equipmentOptions: [
        [
            [
                { item: 'Martial', amount: 1 },
                { item: 'shield', amount: 1 },
            ],

            [{ item: 'Martial', amount: 2 }],
        ],
        [
            [{ item: 'javelin', amount: 5 }],
            [{ item: 'Simple Melee', amount: 1 }],
        ],
        [
            [{ item: 'priests-pack', amount: 1 }],
            [{ item: 'explorers-pack', amount: 1 }],
        ],
        [[{ item: 'chain-mail', amount: 1 }]],
        [[{ item: 'holy-symbols', amount: 1 }]],
    ],
}

export default paladin

/*
Analise o texto a seguir e gere um arquivo json para cada paragrafo traduzido seguindo este schema: {
name: string em português;
level: number | number[];
description: string em português;
}

Texto:
*/

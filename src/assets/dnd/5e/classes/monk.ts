import dedent from 'dedent'

import type { DnD5eClass, DnD5eFeature, DnD5eSubClass } from './interfaces'

const features: DnD5eFeature[] = [
    {
        name: 'Defesa sem Armadura',
        level: 1,
        description:
            'Começando no 1º nível, enquanto você não está vestindo armadura e não está empunhando um escudo, sua CA é igual a 10 + seu modificador de Destreza + seu modificador de Sabedoria.',
        rules: [{ action: 'CA=10+DEX_MOD+WIS_MOD', isActive: true }],
    },
    {
        name: 'Artes Marciais',
        level: 1,
        description:
            'No 1º nível, a prática de artes marciais concede a você o domínio de estilos de combate que usam ataques desarmados e armas de monge, que são espadas curtas e quaisquer armas simples de combate corpo a corpo que não tenham a propriedade duas mãos ou pesado. Você obtém os seguintes benefícios enquanto estiver desarmado ou empunhando apenas armas de monge e não estiver vestindo armadura ou empunhando um escudo: • Você pode usar Destreza em vez de Força para os ataques e dano dos seus ataques desarmados e armas de monge. • Você pode rolar um d4 em vez do dano normal do seu ataque desarmado ou arma de monge. Este dado muda à medida que você avança nos níveis de monge, conforme mostrado na coluna Artes Marciais da tabela de Monge. • Quando você usa a ação Ataque com um ataque desarmado ou uma arma de monge em seu turno, pode fazer um ataque desarmado como ação bônus. Por exemplo, se você tomar a ação de Ataque e atacar com um bastão, também pode fazer um ataque desarmado como ação bônus, supondo que você não tenha tomado uma ação bônus neste turno.',
    },
    {
        name: 'Ki',
        level: 2,
        description:
            'A partir do 2º nível, seu treinamento permite que você canalize a energia mística do ki. Seu acesso a essa energia é representado por um número de pontos de ki. Seu nível de monge determina o número de pontos que você tem, conforme mostrado na coluna Pontos de Ki da tabela de Monge.\nVocê pode gastar esses pontos para alimentar vários recursos do ki. Você começa conhecendo três desses recursos: Série de Golpes, Defesa Paciente e Passo do Vento. Você aprende mais recursos do ki conforme avança nos níveis nesta classe.\nQuando você gasta um ponto de ki, ele não está disponível até que você termine um descanso curto ou longo, ao final do qual você recupera todos os seus pontos de ki gastos. Você deve gastar pelo menos 30 minutos do descanso meditando para recuperar seus pontos de ki.',
    },
    {
        name: 'Série de Golpes',
        level: 2,
        description:
            'Imediatamente após você realizar a ação de Ataque em seu turno, pode gastar 1 ponto de ki para fazer dois ataques desarmados como ação bônus.',
    },
    {
        name: 'Defesa Paciente',
        level: 2,
        description:
            'Você pode gastar 1 ponto de ki para realizar a ação Esquivar como ação bônus em seu turno.',
    },
    {
        name: 'Passo do Vento',
        level: 2,
        description:
            'Você pode gastar 1 ponto de ki para tomar a ação Desengajar ou Correr como uma ação bônus em seu turno, e sua distância de salto é dobrada para o turno.',
    },
    {
        name: 'Movimento sem Armadura',
        level: [2, 9],
        description:
            'A partir do 2º nível, seu deslocamento aumenta em 2 espaços (3m / 10ft) enquanto você não estiver usando armadura ou empunhando um escudo. Este bônus aumenta quando você atinge determinados níveis de monge, como mostrado na tabela do Monge. No 9º nível, você adquire a habilidade de se mover ao longo de superfícies verticais e através de líquidos em seu turno sem cair durante o movimento.',
    },
    {
        name: 'Tradição Monástica',
        level: 3,
        description:
            'Quando você atinge o 3º nível, você se compromete com uma tradição monástica, como o Caminho da Mão Aberta. Sua tradição concede recursos a você no 3º nível e novamente no 6º, 11º e 17º nível.',
    },
    {
        name: 'Desviar Projéteis',
        level: 3,
        description:
            'A partir do 3º nível, você pode usar sua reação para desviar ou pegar o projétil quando atingido por um ataque de arma à distância. Quando você faz isso, o dano que você sofre do ataque é reduzido por 1d10 + seu modificador de Destreza + seu nível de monge. Se você reduzir o dano a 0, você pode pegar o projétil se ele for pequeno o suficiente para segurar em uma mão e você tiver pelo menos uma mão livre. Se você pegar um projétil dessa maneira, pode gastar 1 ponto de ki para fazer um ataque à distância com a arma ou munição que acabou de pegar, como parte da mesma reação. Você faz esse ataque com proficiência, independentemente de suas proficiências em armas, e o projétil conta como uma arma de monge para o ataque, o que tem um alcance normal de 4 espaços (6m / 20ft) e um alcance longo de 12 espaços (18m / 60ft).',
    },
    {
        name: 'Melhoria de Atributo',
        level: [4, 8, 12, 16, 19],
        description:
            'Quando você alcança o 4º nível e novamente no 8º, 12º, 16º e 19º nível, você pode aumentar um atributo de sua escolha em 2 ou aumentar dois atributos de sua escolha em 1. Como de costume, você não pode aumentar um atributo acima de 20 usando essa característica.',
    },
    {
        name: 'Queda Suave',
        level: 4,
        description:
            'A partir do 4º nível, você pode usar sua reação quando cair para reduzir qualquer dano de queda que sofrer em uma quantidade igual a cinco vezes o seu nível de monge.',
    },
    {
        name: 'Ataque Extra',
        level: 5,
        description:
            'A partir do 5º nível, você pode atacar duas vezes, em vez de uma, sempre que usar a ação de Ataque em seu turno.',
    },
    {
        name: 'Golpe Estonteante',
        level: 5,
        description:
            'A partir do 5º nível, você pode interferir no fluxo de ki no corpo do oponente. Quando você acerta outra criatura com um ataque com arma corpo a corpo, você pode gastar 1 ponto de ki para tentar um ataque impressionante. O alvo deve ser bem-sucedido em um teste de resistência de Constituição ou ficará atordoado até o final do seu próximo turno.',
    },
    {
        name: 'Golpes Potencializados pelo Ki',
        level: 6,
        description:
            'A partir do 6º nível, seus ataques desarmados contam como mágicos para o propósito de superar a resistência e a imunidade a ataques e danos não mágicos.',
    },
    {
        name: 'Evasão',
        level: 7,
        description:
            'No 7º nível, sua agilidade instintiva permite que você se esquive de certos efeitos de área, como o sopro de relâmpago de um dragão azul ou a magia bola de fogo. Quando você é submetido a um efeito que permite fazer um teste de resistência de Destreza para receber apenas metade do dano, você não recebe dano algum se obtiver sucesso no teste de resistência, e apenas metade do dano se falhar.',
    },
    {
        name: 'Tranquilidade Mental',
        level: 7,
        description:
            'A partir do 7º nível, você pode usar sua ação para acabar com um efeito em você que esteja fazendo com que você seja enfeitiçado ou amedrontado.',
    },
    {
        name: 'Pureza do Corpo',
        level: 10,
        description:
            'No 10º nível, seu domínio do ki que flui através de você o torna imune a doenças e venenos.',
    },
    {
        name: 'Língua do Sol e da Lua',
        level: 13,
        description:
            'A partir do 13º nível, você aprende a tocar o ki de outras mentes para que você possa entender todos os idiomas falados. Além disso, qualquer criatura que possa entender um idioma pode entender o que você diz.',
    },
    {
        name: 'Alma de Diamante',
        level: 14,
        description:
            'Começando no 14º nível, seu domínio do ki concede a você proficiência em todos os testes de resistência. Além disso, sempre que você faz um teste de resistência e falha, pode gastar 1 ponto de ki para rolar novamente e usar o segundo resultado.',
    },
    {
        name: 'Corpo Imperecível',
        level: 15,
        description:
            'No 15º nível, seu ki o sustenta para que você não sofra nenhuma das fraquezas da velhice, e você não pode ser envelhecido magicamente. Você ainda pode morrer de velhice, no entanto. Além disso, você não precisa mais de comida ou água.',
    },
    {
        name: 'Corpo Vazio',
        level: 18,
        description:
            'Começando no 18º nível, você pode usar sua ação para gastar 4 pontos de ki e se tornar invisível por 1 minuto. Durante esse tempo, você também tem resistência a todos os danos, exceto dano de força. Além disso, você pode gastar 8 pontos de ki para conjurar a magia de projeção astral, sem precisar de componentes materiais. Quando o fizer, você não pode levar nenhuma outra criatura com você.',
    },
    {
        name: 'Eu Perfeito',
        level: 20,
        description:
            'No 20º nível, quando você rolar para iniciativa e não tiver nenhum ponto de ki restante, você recupera 4 pontos de ki.',
    },
]

const openHand: DnD5eSubClass = {
    name: 'Caminho da Mão Aberta',
    description:
        'Os monges do Caminho da Mão Aberta são os mestres finais do combate em artes marciais, quer estejam armados ou desarmados. Eles aprendem técnicas para empurrar e derrubar seus oponentes, manipular o ki para curar danos em seus corpos e praticar meditação avançada que pode protegê-los do perigo.',
    features: [
        {
            name: 'Técnica da Mão Aberta',
            level: 3,
            description: dedent`
                A partir do momento em que você escolhe esta tradição no 3º nível, pode manipular o ki do seu inimigo quando canaliza o seu próprio. Sempre que você acerta uma criatura com um dos ataques concedidos por sua Enxurrada de Golpes, pode impor um dos seguintes efeitos a esse alvo:
                - Ele deve ser bem sucedido em um teste de resistência de Destreza ou ficará caído.
                - Ele deve fazer um teste de resistência de Força. Se falhar, você pode empurrá-lo até 3 espaços (7,5m / 15ft) de distância de você.
                - Ele não pode fazer reações até o final do seu próximo turno.`,
        },
        {
            name: 'Integridade do Corpo',
            level: 6,
            description:
                'No 6º nível, você ganha a habilidade de curar a si mesmo. Como uma ação, você pode recuperar pontos de vida igual a três vezes o seu nível de monge. Você deve terminar um descanso longo antes de poder usar esta habilidade novamente.',
        },
        {
            name: 'Tranquilidade',
            level: 11,
            description:
                'A partir do 11º nível, você pode entrar em uma meditação especial que o envolve com uma aura de paz. No final de um descanso longo, você obtém o efeito de um feitiço santuário que dura até o início do seu próximo descanso longo (o feitiço pode terminar mais cedo como normal). O DC de salvamento para o feitiço é igual a 8 + seu modificador de Sabedoria + seu bônus de proficiência.',
        },
        {
            name: 'Palma Trêmula',
            level: 17,
            description:
                'No 17º nível, você ganha a habilidade de estabelecer vibrações letais no corpo de alguém. Quando você atinge uma criatura com um golpe desarmado, pode gastar 3 pontos de ki para iniciar essas vibrações imperceptíveis, que duram um número de dias igual ao seu nível de monge. As vibrações são inofensivas a menos que você use sua ação para acabar com elas. Para fazer isso, você e o alvo devem estar no mesmo plano de existência. Quando você usa essa ação, a criatura deve fazer um teste de resistência de Constituição. Se falhar, ela é reduzida a 0 pontos de vida. Se tiver sucesso, ela sofre 10d10 de dano necrótico. Você só pode ter uma criatura sob o efeito desta habilidade de cada vez. Você pode escolher encerrar as vibrações de forma inofensiva sem usar uma ação.',
        },
    ],
}

const monk: DnD5eClass = {
    key: 'monk',
    name: 'Monge',
    description: 'HP d8, Habilidade Des e Sab, TR For e Des',
    features,
    subclasses: [openHand],
    hp: {
        dice: 'd8',
        average: 5,
    },
    proficiencies: {
        weapon: ['simple', 'shortSword'],
        tools: ['musicalInstrument', 'artisansTools'],
        savingThrows: ['strength', 'dexterity'],
        skills: {
            amount: 2,
            options: [
                { label: 'Acrobacia (Acrobatics)', value: 'acrobatics' },
                { label: 'Atletismo (Athletics)', value: 'athletics' },
                { label: 'História (History)', value: 'history' },
                { label: 'Intuição (Insight)', value: 'insight' },
                { label: 'Religião (Religion)', value: 'religion' },
                { label: 'Furtividade (Stealth)', value: 'stealth' },
            ],
        },
    },
    equipmentOptions: [
        [[{ item: 'shortsword', amount: 1 }], [{ item: 'Simple', amount: 1 }]],
        [
            [{ item: 'dungeoneers-pack', amount: 1 }],
            [{ item: 'explorers-pack', amount: 1 }],
        ],
        [[{ item: 'dart', amount: 10 }]],
    ],
}

export default monk

/*
Analise o texto a seguir e gere um arquivo json para cada paragrafo traduzido seguindo este schema: {
name: string em português;
level: number | number[];
description: string em português;
}

Texto:

*/

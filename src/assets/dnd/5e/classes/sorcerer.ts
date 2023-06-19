import type { DnD5eFeature, DnD5eClass, DnD5eSubClass } from "./interfaces"

const features: DnD5eFeature[] = [
  {
    name: "Lançamento de Magias",
    level: 1,
    description:
      "Um evento no seu passado, ou na vida de um pai ou ancestral, deixou uma marca indelével em você, infundindo-o com magia arcana. Essa fonte de magia, qualquer que seja a sua origem, alimenta suas magias.",
  },
  {
    name: "Truques",
    level: 1,
    description:
      "No 1º nível, você conhece quatro truques de sua escolha da lista de magias de feiticeiro. Você aprende truques adicionais de feiticeiro de sua escolha em níveis mais altos, como mostrado na coluna Truques Conhecidos da tabela de Feiticeiro.",
  },
  {
    name: "Espaços de Magia",
    level: 1,
    description:
      "A tabela de Feiticeiro mostra quantos espaços de magia você tem para conjurar suas magias de 1º nível e superiores. Para conjurar uma dessas magias de feiticeiro, você deve gastar um espaço de nível da magia ou superior. Você recupera todos os espaços de magia gastos quando termina um descanso longo. Por exemplo, se você conhece a magia de 1º nível Mãos Flamejantes e tem um espaço de magia de 1º e 2º nível disponível, você pode conjurar Mãos Flamejantes usando qualquer um dos espaços.",
  },
  {
    name: "Magias Conhecidas de 1º Nível e Superior",
    level: 1,
    description:
      "Você conhece duas magias de 1º nível de sua escolha da lista de magias de feiticeiro. A coluna Magias Conhecidas da tabela de Feiticeiro mostra quando você aprende mais magias de feiticeiro de sua escolha. Cada uma dessas magias deve ser de um nível para o qual você tenha espaços de magia. Por exemplo, quando você alcança o 3º nível nesta classe, pode aprender uma nova magia de 1º ou 2º nível. Além disso, quando você ganha um nível nesta classe, você pode escolher uma das magias de feiticeiro que conhece e substituí-la por outra magia da lista de magias de feiticeiro, que também deve ser de um nível para o qual você tenha espaços de magia.",
  },
  {
    name: "Habilidade de Lançamento de Magias",
    level: 1,
    description:
      "Carisma é a sua habilidade de lançamento de magias para suas magias de feiticeiro, uma vez que o poder de sua magia depende de sua habilidade de projetar sua vontade no mundo. Você usa seu Carisma sempre que uma magia se referir à sua habilidade de lançamento de magias. Além disso, você usa seu modificador de Carisma ao definir a CD de resistência para uma magia de feiticeiro que você conjura e ao fazer um rolagem de ataque com uma magia. CD de Resistência de Magia e Modificador de Ataque de Magia, CD de resistência de magia = 8 + seu bônus de proficiência + seu modificador de Carisma. Modificador de ataque de magia = seu bônus de proficiência + seu modificador de Carisma.",
  },
  {
    name: "Foco de Conjuração",
    level: 1,
    description:
      "Você pode usar um foco arcana como foco de conjuração para suas magias de feiticeiro.",
  },
  {
    name: "Origem Feiticeira",
    level: 1,
    description:
      "Escolha uma origem feiticeira, que descreve a fonte de seu poder mágico inato, como Linhagem Draconiana. Sua escolha concede recursos quando você a escolhe no 1º nível e novamente no 6º, 14º e 18º nível.",
  },
  {
    name: "Fonte de Magia",
    level: 2,
    description:
      "No 2º nível, você acessa uma fonte profunda de magia dentro de si. Esta fonte é representada por pontos de feitiçaria, que permitem que você crie uma variedade de efeitos mágicos.",
  },
  {
    name: "Pontos de Feitiçaria",
    level: 2,
    description:
      "Você tem 2 pontos de feitiçaria e ganha mais à medida que atinge níveis mais altos, como mostrado na coluna Pontos de Feitiçaria da tabela de Feiticeiro. Você nunca pode ter mais pontos de feitiçaria do que os mostrados na tabela para o seu nível. Você recupera todos os pontos de feitiçaria gastos quando termina um descanso longo.",
  },
  {
    name: "Conjuração Flexível",
    level: 2,
    description: `Você pode usar seus pontos de feitiçaria para ganhar espaços de magia adicionais ou sacrificar espaços de magia para ganhar pontos de feitiçaria adicionais. Você aprende outras maneiras de usar seus pontos de feitiçaria à medida que atinge níveis mais altos.
    | Nível do espaço de magia | Custo de pontos de feitiçaria |
    | ------------------------ | ----------------------------- |
    | 1st                      | 2                             |
    | 2nd                      | 3                             |
    | 3rd                      | 5                             |
    | 4th                      | 6                             |
    | 5th                      | 7                             |
    `,
  },
  {
    name: "Conversão de Espaços de Magia em Pontos de Feitiçaria",
    level: 2,
    description:
      "Como ação bônus em seu turno, você pode gastar um espaço de magia e ganhar um número de pontos de feitiçaria igual ao nível do espaço.",
  },
  {
    name: "Metamagia",
    level: 3,
    description:
      "No 3º nível, você adquire a habilidade de torcer suas magias para atender às suas necessidades. Você adquire duas das seguintes opções de Metamagia de sua escolha. Você ganha outra opção aos níveis 10 e 17. Você só pode usar uma opção de Metamagia em uma magia quando a conjura, a menos que seja indicado o contrário.",
  },
  {
    name: "Melhoria de Habilidade",
    level: [4, 8, 12, 16, 19],
    description:
      "Quando você alcança o 4º nível e novamente nos níveis 8, 12, 16 e 19, você pode aumentar um atributo de sua escolha em 2, ou pode aumentar dois atributos de sua escolha em 1. Como normal, você não pode aumentar um atributo acima de 20 usando essa característica.",
  },
  {
    name: "Restauração de Feitiçaria",
    level: 20,
    description:
      "No 20º nível, você recupera 4 pontos de feitiçaria gastos sempre que termina um descanso curto.",
  },
]

const draconicBloodline: DnD5eSubClass = {
  name: "Linhagem Draconiana",
  description:
    "Sua magia inata vem da magia draconiana que se misturou com seu sangue ou com o de seus ancestrais. Na maioria das vezes, feiticeiros com essa origem traçam sua descendência de volta a um poderoso feiticeiro de tempos antigos que fez um acordo com um dragão ou que até mesmo pode ter reivindicado um pai dragão. Algumas dessas linhagens sanguíneas são bem estabelecidas no mundo, mas a maioria é obscura. Qualquer feiticeiro pode ser o primeiro de uma nova linhagem, como resultado de um pacto ou alguma outra circunstância excepcional.",
  features: [
    {
      name: "Ancestral de Dragão",
      level: 1,
      description: `No 1º nível, você escolhe um tipo de dragão como seu ancestral. O tipo de dano associado a cada dragão é usado por recursos que você ganha mais tarde.
        | Dragão   | Tipo de dano |
        | -------- | ------------ |
        | Preto    | Ácido        |
        | Cobre    | Ácido        |
        | Azul     | Raio         |
        | Bronze   | Raio         |
        | Ouro     | Fogo         |
        | Vermelho | Fogo         |
        | Verde    | Veneno       |
        | Prata    | Frio         |
        | Branco   | Frio         |
        
        Você pode falar, ler e escrever em Dracônico. Além disso, sempre que fizer um teste de Carisma ao interagir com dragões, seu bônus de proficiência é dobrado, se aplicável ao teste. Resiliência Draconiana: À medida que a magia flui pelo seu corpo, ela faz com que traços físicos de seus antepassados de dragão surjam. No 1º nível, seu total de pontos de vida aumenta em 1 e aumenta em 1 novamente sempre que você ganha um nível nesta classe. Além disso, partes de sua pele são cobertas por uma fina camada de escamas semelhantes às de um dragão. Quando você não está usando armadura, sua Classe de Armadura é igual a 13 + seu modificador de Destreza.
        `,
    },
    {
      name: "Resiliência Draconiana",
      level: 1,
      description:
        "Conforme a magia flui pelo seu corpo, traços físicos dos seus ancestrais dragões começam a emergir. No 1º nível, o seu máximo de pontos de vida aumenta em 1 e aumenta em 1 novamente sempre que você ganhar um nível nesta classe. Além disso, partes da sua pele são cobertas por uma fina camada de escamas semelhantes a de dragão. Quando você não está usando armadura, sua CA é igual a 13 + seu modificador de Destreza.",
    },
    {
      name: "Afinidade Elemental",
      level: 6,
      description:
        "A partir do 6º nível, quando você conjura uma magia que causa dano do tipo associado à sua ancestralidade draconiana, você pode adicionar seu modificador de Carisma em um rolagem de dano dessa magia. Ao mesmo tempo, você pode gastar 1 ponto de feitiçaria para ganhar resistência àquele tipo de dano por 1 hora.",
    },
    {
      name: "Asas de Dragão",
      level: 14,
      description:
        "No 14º nível, você ganha a habilidade de crescer um par de asas de dragão em suas costas, ganhando uma velocidade de voo igual à sua velocidade atual. Você pode criar essas asas como uma ação bônus no seu turno. Elas duram até você dispensá-las como uma ação bônus no seu turno. Você não pode manifestar suas asas enquanto usa armadura, a menos que a armadura seja feita para acomodá-las, e as roupas que não foram feitas para acomodar suas asas podem ser destruídas quando você as manifestar.",
    },
    {
      name: "Presença Draconiana",
      level: 18,
      description:
        "A partir do 18º nível, você pode canalizar a presença ameaçadora do seu ancestral dragão, fazendo com que aqueles ao seu redor fiquem atônitos ou amedrontados. Como uma ação, você pode gastar 5 pontos de feitiçaria para evocar esse poder e exalar uma aura de admiração ou medo (sua escolha) em uma distância de 60 pés. Por 1 minuto ou até você perder sua concentração (como se você estivesse conjurando um feitiço que exige concentração), cada criatura hostil que começar seu turno nesta aura deve ser bem-sucedida em um teste de resistência de Sabedoria ou ficará encantada (se você escolheu admiração) ou amedrontada (se você escolheu medo) até o término da aura. Uma criatura que for bem-sucedida nesse teste de resistência fica imune à sua aura por 24 horas.",
    },
  ],
}

const sorcerer: DnD5eClass = {
  name: "Feiticeiro",
  description: "HP d6, Habilidade Cha, TR Con e Car",
  features,
  subclasses: [draconicBloodline],
  hp: {
    dice: "d6",
    average: 4,
  },
  proficiencies: {
    weapon: ["dagger", "dart", "quarterstaff", "lightCrossbow"],
    savingThrows: ["con", "cha"],
    skills: {
      amount: 2,
      options: [
        "Arcana",
        "Enganação (Deception)",
        "Intuição (Insight)",
        "Intimidação (Intimidation)",
        "Persuasão (Persuasion)",
        "Religião (Religion)",
      ],
    },
    equipmentOptions: [
      [
        { name: "lightCrossbow", amount: 1, ammo: 20 },
        { name: "simpleWeapon", amount: 1 },
      ],
      [
        { name: "componentPouch", amount: 1 },
        { name: "arcaneFocus", amount: 1 },
      ],
      [
        { name: "dungeoneersPack", amount: 1 },
        { name: "explorersPack", amount: 1 },
      ],
      [{ name: "dagger", amount: 2 }],
    ],
  },
}

export default sorcerer

/*
Analise o texto a seguir e gere um arquivo json para cada paragrafo traduzido seguindo este schema: {
name: string em português;
level: number | number[];
description: string em português;
}

Texto:



*/
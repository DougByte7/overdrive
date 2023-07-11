import type { DnD5eFeature, DnD5eClass, DnD5eSubClass } from "./interfaces"

const features: DnD5eFeature[] = [
  {
    name: "Patrono de Outro Mundo",
    level: 1,
    description:
      "No 1º nível, você fez um acordo com um ser de outro mundo de sua escolha: o Arquifada, o Diabo ou o Ancião Primordial, cada um deles é detalhado no final da descrição da classe. Sua escolha concede a você características no 1º nível e novamente no 6º, 10º e 14º nível.",
  },
  {
    name: "Magia de pacto",
    level: 1,
    description:
      "Seu estudo arcano e a magia concedida por seu patrono lhe deram habilidade com feitiços.",
  },
  {
    name: "Truques",
    level: 1,
    description:
      "Você conhece dois truques à sua escolha da lista de magias do warlock. Você aprende mais truques de warlock à sua escolha em níveis mais altos, conforme mostrado na coluna Truques Conhecidos da tabela do Warlock.",
  },
  {
    name: "Espaços de magia",
    level: 1,
    description:
      "A tabela do Warlock mostra quantos slots de magia você tem. A tabela também mostra qual é o nível desses slots; todos os seus slots de magia são do mesmo nível. Para conjurar uma de suas magias de warlock de 1º nível ou superior, você precisa gastar um slot de magia. Você recupera todos os slots de magia gastos quando termina um descanso curto ou longo. Por exemplo, quando você está no 5º nível, você tem dois slots de magia de 3º nível. Para conjurar a magia de 1º nível thunderwave, você precisa gastar um desses slots e conjurá-la como uma magia de 3º nível.",
  },
  {
    name: "Magias Conhecidas de 1º Nível e Superior",
    level: 1,
    description:
      "No 1º nível, você conhece duas magias de 1º nível à sua escolha da lista de magias de warlock. A coluna Magias Conhecidas da tabela do Warlock mostra quando você aprende mais magias de warlock de sua escolha de 1º nível ou superior. Uma magia que você escolhe deve ser de um nível não superior ao que é mostrado na coluna Nível do Slot da tabela para o seu nível. Quando você alcança o 6º nível, por exemplo, você aprende uma nova magia de warlock, que pode ser de 1º, 2º ou 3º nível. Além disso, quando você ganha um nível nesta classe, você pode escolher uma das magias de warlock que conhece e substituí-la por outra magia da lista de magias de warlock, que também deve ser de um nível para o qual você tenha slots de magia.",
  },
  {
    name: "Habilidade de Conjuração",
    level: 1,
    description:
      "Carisma é a sua habilidade de conjuração de magias para suas magias de warlock, então você usa seu Carisma sempre que uma magia se referir à sua habilidade de conjuração. Além disso, você usa seu modificador de Carisma ao definir a CD de resistência para uma magia de warlock que você conjura e ao fazer uma jogada de ataque com uma. CD de resistência da magia = 8 + seu bônus de proficiência + seu modificador de Carisma. Modificador de ataque de magia = seu bônus de proficiência + seu modificador de Carisma.",
  },
  {
    name: "Foco de Conjuração",
    level: 1,
    description:
      "Você pode usar um foco arcano como foco de conjuração para suas magias de bruxo.",
  },
  {
    name: "Invocações Místicas",
    level: 2,
    description:
      "Em seu estudo do conhecimento oculto, você descobriu invocações místicas, fragmentos de conhecimento proibido que lhe conferem uma habilidade mágica duradoura. No 2º nível, você obtém duas invocações místicas de sua escolha. Suas opções de invocação estão detalhadas no final da descrição da classe. Quando você alcança certos níveis de bruxo, obtém invocações adicionais de sua escolha, conforme mostrado na coluna Invocações Conhecidas da tabela Warlock. Além disso, quando você sobe de nível nesta classe, pode escolher uma das invocações que conhece e substituí-la por outra invocação que poderia aprender naquele nível.",
  },
  {
    name: "Dádiva do Pacto",
    level: 3,
    description:
      "No 3º nível, seu patrono sobrenatural concede um presente a você por seu serviço leal. Você ganha uma das seguintes características de sua escolha.",
  },
  {
    name: "Melhoria de Atributo",
    level: [4, 8, 12, 16, 19],
    description:
      "Quando você alcança o 4º nível, e novamente no 8º, 12º, 16º e 19º nível, você pode aumentar um atributo de sua escolha em 2, ou pode aumentar dois atributos de sua escolha em 1. Como de costume, você não pode aumentar um atributo acima de 20 usando essa característica.",
  },
  {
    name: "Arcano Místico",
    level: 11,
    description:
      "No 11º nível, seu patrono concede a você um segredo mágico chamado arcano. Escolha um feitiço de 6º nível da lista de feitiços de bruxo como este arcano. Você pode conjurar seu feitiço arcano uma vez sem gastar um espaço de feitiço. Você deve terminar um descanso longo antes de poder fazê-lo novamente. Em níveis mais altos, você ganha mais feitiços de bruxo de sua escolha que podem ser conjurados desta maneira: um feitiço de 7º nível no 13º nível, um feitiço de 8º nível no 15º nível e um feitiço de 9º nível no 17º nível. Você recupera todos os usos do seu Arcano Místico quando termina um descanso longo.",
  },
  {
    name: "Mestre Místico",
    level: 20,
    description:
      "No 20º nível, você pode recorrer à sua reserva interna de poder místico enquanto suplica ao seu patrono para recuperar espaços de feitiços gastos. Você pode gastar 1 minuto implorando ao seu patrono por ajuda para recuperar todos os seus espaços de feitiços gastos da característica Magia do Pacto. Depois de recuperar espaços de feitiços com essa característica, você deve terminar um descanso longo antes de poder fazê-lo novamente.",
  },
  {
    name: "Sua Dádiva do Pacto",
    level: 1,
    description:
      "Cada opção de Dádiva do Pacto produz uma criatura especial ou um objeto que reflete a natureza do seu patrono. Pacto da Corrente: Seu familiar é mais astuto do que um familiar típico. Sua forma padrão pode ser um reflexo do seu patrono, com diabretes e quasits ligados ao Diabo. Pacto da Lâmina: Se você serve ao Diabo, sua arma pode ser um machado feito de metal negro e adornado com chamas decorativas. Pacto do Tomo: Seu Livro das Sombras pode ser um pesado tomo encadernado em pele de demônio cravejado de ferro, contendo feitiços de conjuração e uma riqueza de conhecimento proibido sobre as sinistras regiões do cosmos, um presente do Diabo.",
  },
]

const fiend: DnD5eSubClass = {
  name: "O Diabo",
  description:
    "Você fez um pacto com um demônio dos planos inferiores da existência, um ser cujos objetivos são malignos, mesmo que você lute contra esses objetivos. Esses seres desejam a corrupção ou destruição de todas as coisas, incluindo você no final. Demônios poderosos o suficiente para forjar um pacto incluem senhores demônios como Demogorgon, Orcus, Fraz'Urb-luu e Baphomet; arquidiabos como Asmodeus, Dispater, Mefistófeles e Belial; demônios abissais e balors especialmente poderosos; e ultroloths e outros senhores dos yugoloths.",
  features: [
    {
      name: "Lista Expandida de Feitiços",
      level: 1,
      description: `O Diabo permite que você escolha em uma lista expandida de feitiços quando aprende um feitiço de bruxo. Os seguintes feitiços são adicionados à lista de feitiços de bruxo para você. Feitiços Expandidos do Diabo: Nível de Feitiço - Feitiços; 1º - burning	hands,	command; 2º - blindness/deafness,	scorching	ray; 3º - fireball,	stinking	cloud; 4º - fire	shield,	wall	of	fire; 5º - flame	strike,	hallow.`,
    },
    {
      name: "Bênção do Obscuro",
      level: 1,
      description:
        "A partir do 1º nível, quando você reduzir uma criatura hostil a 0 pontos de vida, você ganha pontos de vida temporários iguais ao seu modificador de Carisma + seu nível de bruxo (mínimo de 1).",
    },
    {
      name: "Sorte do Próprio Obscuro",
      level: 6,
      description:
        "A partir do 6º nível, você pode invocar seu patrono para alterar o destino a seu favor. Quando você faz uma verificação de habilidade ou um teste de resistência, você pode usar esta característica para adicionar um d10 à sua rolagem. Você pode fazer isso após ver a rolagem inicial, mas antes de qualquer um dos efeitos da rolagem ocorrerem. Depois de usar esta característica, você não pode usá-la novamente até terminar um descanso curto ou longo.",
    },
    {
      name: "Resiliência Diabólica",
      level: 10,
      description:
        "A partir do 10º nível, você pode escolher um tipo de dano quando terminar um descanso curto ou longo. Você ganha resistência a esse tipo de dano até escolher um diferente com essa característica. O dano de armas mágicas ou armas de prata ignora essa resistência.",
    },
    {
      name: "Arremesso Através do Inferno",
      level: 14,
      description:
        "A partir do 14º nível, quando você acertar uma criatura com um ataque, você pode usar esta característica para transportar instantaneamente o alvo através dos planos inferiores. A criatura desaparece e é lançada através de uma paisagem aterrorizante. No final do seu próximo turno, o alvo retorna ao espaço que ocupava anteriormente ou ao espaço desocupado mais próximo. Se o alvo não for um demônio, ele sofre 10d10 de dano psíquico ao se recuperar de sua horrível experiência. Depois de usar esta característica, você não pode usá-la novamente até terminar um descanso longo.",
    },
  ],
}

const warlock: DnD5eClass = {
  name: "Bruxo",
  description: "HP d8, Habilidade Cha, TR Sab e Car",
  features,
  subclasses: [fiend],
  hp: {
    dice: "d8",
    average: 5,
  },
  proficiencies: {
    weapon: ["simple"],
    savingThrows: ["wisdom", "charisma"],
    skills: {
      amount: 2,
      options: [
        "Arcana",
        "Enganação (Deception)",
        "História (History)",
        "Intimidação (Intimidation)",
        "Investigação (Investigation)",
        "Natureza (Nature)",
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
        { name: "scholarsPack", amount: 1 },
        { name: "dungeoneersPack", amount: 1 },
      ],
      [{ name: "dagger", amount: 2 }],
      [{ name: ["leatherArmor", "simpleWeapon"], amount: 1 }],
    ],
  },
}

export default warlock

/*
Analise o texto a seguir e gere um arquivo json para cada paragrafo traduzido seguindo este schema: {
name: string em português;
level: number | number[];
description: string em português;
}

Texto:



*/

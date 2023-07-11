import type { DnD5eFeature, DnD5eClass, DnD5eSubClass } from "./interfaces"

const features: DnD5eFeature[] = [
  {
    name: "Estilo de Luta",
    level: 1,
    description:
      "Você adota um estilo particular de luta como sua especialidade. Escolha uma das opções a seguir. Você não pode escolher a mesma opção de Estilo de Luta mais de uma vez, mesmo que depois possa escolher novamente.",
  },
  {
    name: "Retomar folego",
    level: 1,
    description:
      "Você tem um poço limitado de resistência que pode ser usado para se proteger de danos. Em seu turno, você pode usar uma ação bônus para recuperar pontos de vida iguais a 1d10 + seu nível de guerreiro. Depois de usar esse recurso, você deve terminar um descanso curto ou longo antes de poder usá-lo novamente.",
  },
  {
    name: "Ataque Poderoso",
    level: 2,
    description:
      "A partir do 2º nível, você pode se esforçar além dos seus limites normais por um momento. Em seu turno, você pode tomar uma ação adicional além de sua ação regular e uma possível ação bônus. Depois de usar esse recurso, você deve terminar um descanso curto ou longo antes de poder usá-lo novamente. A partir do 17º nível, você pode usá-lo duas vezes antes de um descanso, mas apenas uma vez no mesmo turno.",
  },
  {
    name: "Arquétipo Marcial",
    level: 3,
    description:
      "No 3º nível, você escolhe uma especialização que você se esforça para emular em seus estilos e técnicas de combate, como o Campeão. A especialização que você escolhe concede recursos para você no 3º nível e novamente no 7º, 10º, 15º e 18º níveis.",
  },
  {
    name: "Aumento no valor de atributo",
    level: [4, 6, 8, 12, 14, 16, 19],
    description:
      "Quando você atinge o 4º nível, e novamente no 6º, 8º, 12º, 14º, 16º e 19º níveis, você pode aumentar um atributo de sua escolha em 2, ou pode aumentar dois atributos de sua escolha em 1. Como normal, você não pode aumentar um atributo acima de 20 usando essa habilidade.",
  },
  {
    name: "Ataque Extra",
    level: 5,
    description:
      "A partir do 5º nível, você pode atacar duas vezes, em vez de uma, sempre que tomar a ação de Ataque em seu turno. O número de ataques aumenta para três quando você alcança o 11º nível nesta classe e quatro quando alcança o 20º nível nesta classe.",
  },
  {
    name: "Indomável",
    level: 9,
    description:
      "A partir do 9º nível, você pode rolar novamente uma jogada de salvamento que falhe. Se fizer isso, deve usar a nova jogada e não pode usar esse recurso novamente até terminar um descanso longo. Você pode usar esse recurso duas vezes entre descansos longos a partir do 13º nível e três vezes entre descansos longos a partir do 17º nível.",
  },
]

const champion: DnD5eSubClass = {
  name: "Campeão",
  description:
    "O Campeão arquetípico concentra-se no desenvolvimento de poder físico bruto lapidado para a perfeição letal. Aqueles que se modelam nesse arquétipo combinam treinamento rigoroso com excelência física para desferir golpes devastadores.",
  features: [
    {
      name: "Crítico Aprimorado",
      level: 3,
      description:
        "Começando quando você escolhe este arquétipo no 3º nível, seus ataques com arma causam um acerto crítico em um resultado de 19 ou 20.",
    },
    {
      name: "Atleta Notável",
      level: 7,
      description:
        "A partir do 7º nível, você pode adicionar metade do seu bônus de proficiência (arredondado para cima) em qualquer teste de Força, Destreza ou Constituição que não use seu bônus de proficiência. Além disso, quando você faz um salto longo de corrida, a distância que você pode cobrir aumenta em um número de pés igual ao seu modificador de Força.",
    },
    {
      name: "Estilo de Luta Adicional",
      level: 10,
      description:
        "No 10º nível, você pode escolher uma segunda opção da característica de classe Estilo de Luta.",
    },
    {
      name: "Crítico Superior",
      level: 15,
      description:
        "A partir do 15º nível, seus ataques com arma causam um acerto crítico em um resultado de 18-20.",
    },
    {
      name: "Sobrevivente",
      level: 18,
      description:
        "No 18º nível, você atinge o auge da resistência em batalha. No início de cada um de seus turnos, você recupera pontos de vida iguais a 5 + seu modificador de Constituição, se tiver menos da metade de seus pontos de vida restantes. Você não ganha esse benefício se tiver 0 pontos de vida.",
    },
  ],
}

const fighter: DnD5eClass = {
  name: "Guerreiro",
  description: "HP d10, Habilidade For ou Des, TR For e Con",
  features,
  subclasses: [champion],
  hp: {
    dice: "d10",
    average: 6,
  },
  proficiencies: {
    armor: ["light", "medium", "heavy", "shield"],
    weapon: ["simple", "martial"],
    savingThrows: ["strength", "constitution"],
    skills: {
      amount: 2,
      options: [
        "Acrobacia (Acrobatics)",
        "Lidar com animais (Animal Handling)",
        "Atletismo (Athletics)",
        "História (History)",
        "Intuição (Insight)",
        "Intimidação (Intimidation)",
        "Percepção (Perception)",
        "Sobrevivência (Survival)",
      ],
    },
    equipmentOptions: [
      [
        { name: "chainMail", amount: 1 },
        { name: ["leatherArmor", "longbow"], amount: 1, ammo: 20 },
      ],
      [
        { name: ["martialWeapon", "shield"], amount: 1 },
        { name: "martialWeapon", amount: 2 },
      ],
      [
        { name: "lightCrossbow", amount: 1, ammo: 20 },
        { name: "handaxe", amount: 2 },
      ],
      [
        { name: "dungeoneersPack", amount: 1 },
        { name: "explorersPack", amount: 1 },
      ],
    ],
  },
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

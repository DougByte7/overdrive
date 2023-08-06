import type { DnD5eFeature, DnD5eClass, DnD5eSubClass } from "./interfaces"

const features: DnD5eFeature[] = [
  {
    name: "Truques",
    level: 1,
    description:
      "Você conhece dois truques à sua escolha da lista de magias de bardo. Você aprende mais truques de bardo à sua escolha em níveis mais altos, como mostrado na coluna Truques Conhecidos da tabela de Bardo.",
  },
  {
    name: "Espaços de Magia",
    level: 1,
    description:
      "A tabela de Bardo mostra quantos espaços de magia você tem para conjurar suas magias de 1º nível ou mais alto. Para conjurar uma dessas magias, você precisa gastar um espaço do nível da magia ou superior. Você recupera todos os espaços de magia gastos quando termina um descanso longo. Por exemplo, se você conhece a magia de 1º nível Cura Ferimentos e tem um espaço de magia de 1º e outro de 2º nível disponíveis, pode conjurar Cura Ferimentos usando qualquer um dos espaços.",
  },
  {
    name: "Magias Conhecidas de 1º Nível ou Mais Alto",
    level: 1,
    description:
      "Você conhece quatro magias de 1º nível à sua escolha da lista de magias de bardo. A coluna Magias Conhecidas da tabela de Bardo mostra quando você aprende mais magias de bardo à sua escolha. Cada uma dessas magias precisa ser de um nível para o qual você tenha espaços de magia, como mostrado na tabela. Por exemplo, quando você alcança o 3º nível nesta classe, pode aprender uma nova magia de 1º ou 2º nível. Além disso, quando ganha um nível nesta classe, pode escolher uma das magias de bardo que conhece e substituí-la por outra magia da lista de magias de bardo, que também precisa ser de um nível para o qual você tenha espaços de magia.",
  },
  {
    name: "Habilidade de Conjuração",
    level: 1,
    description:
      "Carisma é a sua habilidade de conjuração para suas magias de bardo. Sua magia vem do coração e da alma que você coloca na performance de sua música ou oração. Você usa seu Carisma sempre que uma magia se refere à sua habilidade de conjuração. Além disso, você usa seu modificador de Carisma ao definir a CD de resistência para uma magia de bardo que conjura e ao fazer um teste de ataque com uma delas. CD de resistência da magia = 8 + seu bônus de proficiência + seu modificador de Carisma. Modificador de ataque com magia = seu bônus de proficiência + seu modificador de Carisma.",
  },
  {
    name: "Conjuração de Ritual",
    level: 1,
    description:
      "Você pode conjurar qualquer magia de bardo que conheça como um ritual se essa magia tiver a etiqueta de ritual.",
  },
  {
    name: "Foco Arcano",
    level: 1,
    description:
      "Você pode usar um instrumento musical (ver “Equipamento”) como foco de conjuração para seus feitiços de bardo.",
  },
  {
    name: "Inspiração Bárdica",
    level: 1,
    description:
      "Você pode inspirar os outros através de palavras inspiradoras ou música. Para fazer isso, você usa uma ação bônus em seu turno para escolher uma criatura que não seja você dentro de 60 pés de você que possa ouvi-lo. Essa criatura ganha um dado de Inspiração Bárdica, um d6. Uma vez dentro dos próximos 10 minutos, a criatura pode rolar o dado e adicionar o número rolado a um teste de habilidade, rolagem de ataque ou jogada de resistência que ela faça. A criatura pode esperar até depois de rolar o d20 antes de decidir usar o dado de Inspiração Bárdica, mas deve decidir antes do Mestre dizer se o teste tem sucesso ou falha. Uma vez que o dado de Inspiração Bárdica é rolado, ele é perdido. Uma criatura só pode ter um dado de Inspiração Bárdica de cada vez. Você pode usar essa habilidade um número de vezes igual ao seu modificador de Carisma (um mínimo de uma vez). Você recupera quaisquer usos gastos quando termina um descanso longo. Seu dado de Inspiração Bárdica muda quando você alcança certos níveis nesta classe. O dado se torna um d8 no 5º nível, um d10 no 10º nível e um d12 no 15º nível.",
  },
  {
    name: "Pau para toda obra",
    level: 2,
    description:
      "A partir do 2º nível, você pode adicionar metade do seu bônus de proficiência, arredondado para baixo, em qualquer teste de habilidade que você faça e que ainda não inclua o seu bônus de proficiência.",
  },

  {
    name: "Canção de Descanso",
    level: 2,
    description:
      "A partir do 2º nível, você pode usar música suave ou oratória para ajudar a revigorar seus aliados feridos durante um descanso curto. Se você ou quaisquer criaturas amigáveis que possam ouvir sua performance recuperarem pontos de vida ao final do descanso curto, gastando um ou mais Dados de Vida, cada uma dessas criaturas recupera um extra de 1d6 pontos de vida. Os pontos de vida extras aumentam quando você atinge determinados níveis nesta classe: para 1d8 no 9º nível, para 1d10 no 13º nível e para 1d12 no 17º nível.",
  },

  {
    name: "Faculdade Bárdica",
    level: 3,
    description:
      "No 3º nível, você mergulha nas técnicas avançadas de uma Faculdade Bárdica de sua escolha, como o Faculdade de Conhecimento. Sua escolha concede recursos a você no 3º nível e novamente no 6º e 14º níveis.",
  },

  {
    name: "Perícia",
    level: 3,
    description:
      "No 3º nível, escolha duas das suas proficiências em habilidades. Seu bônus de proficiência é dobrado em qualquer teste de habilidade que você fizer que use qualquer uma das proficiências escolhidas. No 10º nível, você pode escolher mais duas proficiências em habilidades para obter este benefício.",
  },

  {
    name: "Aumento no valor de atributo",
    level: 4,
    description:
      "Quando você atinge o 4º nível e novamente no 8º, 12º, 16º e 19º níveis, pode aumentar um valor de habilidade de sua escolha em 2 ou aumentar dois valores de habilidade de sua escolha em 1. Como de costume, você não pode aumentar um valor de habilidade acima de 20 usando este recurso.",
  },
  {
    name: "Fonte de inspiração",
    level: 5,
    description:
      "A partir do 5º nível, você recupera todas as suas utilizações expiradas de Inspiração Bárdica quando termina um descanso curto ou longo.",
  },
  {
    name: "Contrafeitiço",
    level: 6,
    description:
      "No 6º nível, você adquire a habilidade de usar notas musicais ou palavras de poder para interromper efeitos de influência mental. Como uma ação, você pode iniciar uma performance que dura até o final do seu próximo turno. Durante esse tempo, você e quaisquer criaturas amigáveis dentro de 6 espaços (9m / 30ft) de você têm vantagem em testes de resistência contra serem assustados ou enfeitiçados. Uma criatura deve ser capaz de ouvir você para obter este benefício. A performance termina mais cedo se você estiver incapacitado ou silenciado ou se você terminar voluntariamente (nenhuma ação necessária).",
  },
  {
    name: "Segredos Mágicos",
    level: 10,
    description:
      "A partir do 10º nível, você saqueou conhecimento mágico de uma ampla variedade de disciplinas. Escolha dois feitiços de qualquer classe, incluindo esta. O feitiço que você escolher deve ser de um nível que você possa conjurar, conforme mostrado na tabela do Bardo, ou um truque. Os feitiços escolhidos contam como feitiços de bardo para você e estão incluídos no número na coluna de Feitiços Conhecidos da tabela do Bardo. Você aprende mais dois feitiços de qualquer classe no 14º nível e novamente no 18º nível.",
  },
  {
    name: "Inspiração Superior",
    level: 20,
    description:
      "No 20º nível, quando você rola iniciativa e não tem mais usos de Inspiração Bárdica restantes, você recupera um uso.",
  },
]

const lore: DnD5eSubClass = {
  name: "Faculdade de Conhecimento",
  description:
    "Bardos da Faculdade de Conhecimento sabem um pouco sobre a maioria das coisas, coletando pedaços de conhecimento de fontes tão diversas quanto tomos acadêmicos e contos populares. Seja cantando baladas folclóricas em tavernas ou elaboradas composições em cortes reais, esses bardos usam seus talentos para prender audiências. Quando os aplausos cessam, os membros da audiência podem se encontrar questionando tudo o que consideravam verdadeiro, desde sua fé na hierarquia do templo local até sua lealdade ao rei. A lealdade desses bardos reside na busca pela beleza e pela verdade, não na fidelidade a um monarca ou na observação dos preceitos de uma divindade. Um nobre que mantém tal bardo como arauto ou conselheiro sabe que o bardo prefere ser honesto do que político. Os membros da faculdade se reúnem em bibliotecas e às vezes em faculdades reais, completas com salas de aula e dormitórios, para compartilhar seus conhecimentos uns com os outros. Eles também se encontram em festivais ou assuntos de estado, onde podem expor corrupção, desvendar mentiras e zombar de autoridades presunçosas.",
  features: [
    {
      name: "Palavras Cortantes",
      level: 3,
      description:
        "Também no 3º nível, você aprende a usar sua astúcia para distrair, confundir e de outra forma enfraquecer a confiança e a competência dos outros. Quando uma criatura que você pode ver a até 12 espaços (18m / 60ft) de você faz uma jogada de ataque, uma jogada de habilidade ou uma jogada de dano, você pode usar sua reação para gastar um dos seus usos de Inspiração Bárdica, rolando um dado de Inspiração Bárdica e subtraindo o número rolado da jogada da criatura. Você pode optar por usar esse recurso depois que a criatura faz sua jogada, mas antes do Mestre determinar se a jogada de ataque ou habilidade é bem-sucedida ou falha, ou antes de a criatura causar seu dano. A criatura é imune se não puder ouvi-lo ou se for imune a ser encantada.",
    },
    {
      name: "Segredos Mágicos Adicionais",
      level: 6,
      description:
        "No 6º nível, você aprende duas magias de sua escolha de qualquer classe. Uma magia que você escolher deve ser de um nível que você possa conjurar, conforme mostrado na tabela de Bardo, ou um truque. As magias escolhidas contam como magias de bardo para você, mas não contam contra o número de magias de bardo que você conhece.",
    },
    {
      name: "Habilidade Inigualável",
      level: 14,
      description:
        "A partir do 14º nível, quando você faz uma jogada de habilidade, você pode gastar um uso de Inspiração Bárdica. Role um dado de Inspiração Bárdica e adicione o número rolado à sua jogada de habilidade. Você pode optar por fazer isso depois de rolar o dado para a jogada de habilidade, mas antes do Mestre dizer se você tem sucesso ou fracassa.",
    },
  ],
}

const bard: DnD5eClass = {
  name: "Bardo",
  description: "HP d8, Habilidade Car, TR Des e Car",
  features,
  subclasses: [lore],
  hp: {
    dice: "d8",
    average: 5,
  },
  cantripKnown: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  spellsKnown: [
    4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22,
  ],
  spellsSlots: [
    [Infinity, 2],
    [Infinity, 3],
    [Infinity, 4, 2],
    [Infinity, 4, 3],
    [Infinity, 4, 3, 2],
    [Infinity, 4, 3, 3],
    [Infinity, 4, 3, 3, 1],
    [Infinity, 4, 3, 3, 2],
    [Infinity, 4, 3, 3, 3, 1],
    [Infinity, 4, 3, 3, 3, 2],
    [Infinity, 4, 3, 3, 3, 2, 1],
    [Infinity, 4, 3, 3, 3, 2, 1],
    [Infinity, 4, 3, 3, 3, 2, 1, 1],
    [Infinity, 4, 3, 3, 3, 2, 1, 1],
    [Infinity, 4, 3, 3, 3, 2, 1, 1, 1],
    [Infinity, 4, 3, 3, 3, 2, 1, 1, 1],
    [Infinity, 4, 3, 3, 3, 2, 1, 1, 1, 1],
    [Infinity, 4, 3, 3, 3, 3, 1, 1, 1, 1],
    [Infinity, 4, 3, 3, 3, 3, 2, 1, 1, 1],
    [Infinity, 4, 3, 3, 3, 3, 2, 2, 1, 1],
  ],
  proficiencies: {
    armor: ["light"],
    weapon: ["simple", "handCrossbow", "longSword", "rapier", "shortSword"],
    tools: ["musicalInstrument", "musicalInstrument", "musicalInstrument"],
    savingThrows: ["dexterity", "charisma"],
    skills: {
      amount: 3,
      options: [
        { label: "Arcana", value: "arcana" },
        {
          label: "Lidar com animais (Animal Handling)",
          value: "animal_handling",
        },
        { label: "Atletismo (Athletics)", value: "athletics" },
        { label: "Acrobacia (Acrobatics)", value: "acrobatics" },
        { label: "Enganação (Deception)", value: "deception" },
        { label: "Furtividade (Stealth)", value: "stealth" },
        { label: "Intimidação (Intimidation)", value: "intimidation" },
        { label: "Investigação (Investigation)", value: "investigation" },
        { label: "Natureza (Nature)", value: "nature" },
        { label: "Percepção (Perception)", value: "perception" },
        { label: "Sobrevivência (Survival)", value: "survival" },
        { label: "História (History)", value: "history" },
        { label: "Intuição (Insight)", value: "insight" },
        { label: "Medicina (Medicine)", value: "medicine" },
        { label: "Persuasão (Persuasion)", value: "persuasion" },
        { label: "Religião (Religion)", value: "religion" },
      ],
    },
    equipmentOptions: [
      [
        { index: "rapier", amount: 1 },
        { index: "longsword", amount: 1 },
        { category_range: "Simple", amount: 1 },
      ],
      [
        { index: "diplomats-pack", amount: 1 },
        { index: "entertainers-pack", amount: 1 },
      ],
      [{ tool_category: "Musical Instrument", amount: 1 }],
      [{ index: "leather-armor", amount: 1 }],
      [{ amount: 1, index: "dagger" }],
    ],
  },
}

export default bard

/*
Analise o texto a seguir e gere um arquivo json seguindo este schema: {
name: string em portugues;
level: number;
description: string em portugues;
}

Texto:

 */

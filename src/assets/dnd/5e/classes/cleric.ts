import type { DnD5eFeature, DnD5eClass, DnD5eSubClass } from "./interfaces";

const features: DnD5eFeature[] = [
  {
    name: "Conjurador",
    level: 1,
    description:
      "Como um canal para o poder divino, você pode lançar magias de clérigo.",
  },
  {
    name: "Truques",
    level: 1,
    description:
      "No 1º nível, você conhece três truques à sua escolha da lista de magias de clérigo. Você aprende mais truques de clérigo à sua escolha em níveis superiores, como mostrado na coluna Truques Conhecidos da tabela de Clérigo.",
  },
  {
    name: "Preparando e Lançando Magias",
    level: 1,
    description:
      "A tabela de Clérigo mostra quantos espaços de magia você tem para lançar suas magias de 1º nível ou superior. Para lançar uma dessas magias, você deve gastar um espaço de magia do nível da magia ou superior. Você recupera todos os espaços de magia gastos quando termina um descanso longo. Você prepara a lista de magias de clérigo que estão disponíveis para você lançar, escolhendo da lista de magias de clérigo. Ao fazer isso, escolha um número de magias de clérigo igual ao seu modificador de Sabedoria + seu nível de clérigo (mínimo de uma magia). As magias devem ser de um nível para o qual você tenha espaços de magia. Por exemplo, se você for um clérigo de 3º nível, você terá quatro espaços de magia de 1º nível e dois espaços de magia de 2º nível. Com uma Sabedoria de 16, sua lista de magias preparadas pode incluir seis magias de 1º ou 2º nível, em qualquer combinação. Se você preparar a magia de 1º nível Cura de Ferimentos, você pode lançá-la usando um espaço de magia de 1º ou 2º nível. Lançar a magia não a remove da sua lista de magias preparadas. Você pode alterar sua lista de magias preparadas quando terminar um descanso longo. Preparar uma nova lista de magias de clérigo requer tempo gasto em oração e meditação: pelo menos 1 minuto por nível de magia para cada magia em sua lista.",
  },
  {
    name: "Habilidade de Lançamento de Magia",
    level: 1,
    description:
      "Sabedoria é sua habilidade de lançamento de magia para suas magias de clérigo. O poder de suas magias vem de sua devoção a sua divindade. Você usa sua Sabedoria sempre que uma magia de clérigo se referir à sua habilidade de lançamento de magia. Além disso, você usa seu modificador de Sabedoria ao definir a CD de jogada de salvamento para uma magia de clérigo que você lançar e ao fazer uma jogada de ataque com uma magia. CD de salvamento de magia = 8 + seu bônus de proficiência + seu modificador de Sabedoria. Modificador de ataque de magia = seu bônus de proficiência + seu modificador de Sabedoria.",
  },
  {
    name: "Conjuração de Ritual",
    level: 1,
    description:
      "Você pode conjurar uma magia de clérigo como um ritual se ela tiver a tag de ritual e você tiver a magia preparada. Você pode usar um símbolo sagrado (veja 'Equipamento') como foco de conjuração para suas magias de clérigo.",
  },
  {
    name: "Domínio Divino",
    level: 1,
    description:
      "Escolha um domínio relacionado à sua divindade, como Vida. Cada domínio é detalhado no final da descrição da classe e cada um fornece exemplos de deuses associados a ele. Sua escolha concede a você magias de domínio e outras características quando você a escolhe no 1º nível. Também concede maneiras adicionais de usar Canalizar Divindade quando você obtém essa característica no 2º nível e benefícios adicionais nos níveis 6, 8 e 17.",
  },
  {
    name: "Feitiços de Domínio",
    level: 1,
    description:
      "Cada domínio tem uma lista de magias - suas magias de domínio que você obtém nos níveis de clérigo indicados na descrição do domínio. Uma vez que você ganhe uma magia de domínio, você sempre a terá preparada e ela não conta contra o número de magias que você pode preparar a cada dia. Se você tiver uma magia de domínio que não aparece na lista de magias de clérigo, a magia é ainda assim uma magia de clérigo para você.",
  },
  {
    name: "Canalizar Divindade",
    level: [2, 6, 18],
    description:
      "Você ganha a habilidade de canalizar energia divina diretamente de sua divindade, usando essa energia para alimentar efeitos mágicos. Você começa com dois efeitos: Turn Undead e um efeito determinado pelo seu domínio. Alguns domínios concedem efeitos adicionais conforme você avança nos níveis, como observado na descrição do domínio. Ao usar sua Channel Divinity, você escolhe qual efeito criar. Você deve então terminar um descanso curto ou longo para usar sua Channel Divinity novamente. Alguns efeitos de Channel Divinity exigem testes de resistência. Quando você usa tal efeito desta classe, o DC é igual ao seu DC de salvamento de feitiço de clérigo. A partir do 6º nível, você pode usar sua Channel Divinity duas vezes entre descansos e, a partir do 18º nível, pode usá-la três vezes entre descansos. Quando você termina um descanso curto ou longo, recupera seus usos gastos.",
  },
  {
    name: "Canalizar Divindade: Expulsar Morto-vivo",
    level: 2,
    description:
      "Como uma ação, você apresenta seu símbolo sagrado e profere uma oração censurando os mortos-vivos. Cada morto-vivo que pode vê-lo ou ouvi-lo dentro de 6 espaços (9m / 30ft) de você deve fazer um teste de resistência de Sabedoria. Se a criatura falhar em seu teste de resistência, ela é expulsa por 1 minuto ou até receber qualquer dano. Uma criatura expulsa deve gastar seus turnos tentando se afastar de você o máximo possível e não pode se mover voluntariamente para um espaço dentro de 6 espaços (9m / 30ft) de você. Também não pode tomar reações. Para sua ação, ela só pode usar a ação Desviar ou tentar escapar de um efeito que a impede de se mover. Se não houver lugar para se mover, a criatura pode usar a ação Esquivar.",
  },
  {
    name: "Melhoria de Atributo",
    level: [4, 8, 12, 16, 19],
    description:
      "Quando você alcança o 4º nível e novamente no 8º, 12º, 16º e 19º nível, pode aumentar um atributo de sua escolha em 2, ou pode aumentar dois atributos de sua escolha em 1. Como de costume, você não pode aumentar um atributo acima de 20 usando essa habilidade.",
  },
  {
    name: "Destruir Mortos-vivos",
    level: [5, 8, 11, 14, 17],
    description:
      "A partir do 5º nível, quando um morto-vivo falha em seu teste de resistência contra sua habilidade Expulsar Morto-vivo, a criatura é instantaneamente destruída se sua classificação de desafio estiver igual ou abaixo de um determinado limite, como mostrado na tabela Destruir Mortos-vivos. Destruir Mortos-Vivos no Nível 5 do Clérigo: CR 1/2 ou menos, 8º nível 1 ou menos, 11º nível 2 ou menos, 14º nível 3 ou menos, 17º nível 4 ou menos.",
  },
  {
    name: "Intervenção Divina",
    level: [10, 20],
    description:
      "A partir do 10º nível, você pode chamar a intervenção do seu deus em seu favor quando sua necessidade é grande. Pedir a ajuda do seu deus exige que você use sua ação. Descreva a assistência que você procura e role os dados percentuais. Se você rolar um número igual ou menor que o seu nível de clérigo, seu deus intervém. O Mestre escolhe a natureza da intervenção; o efeito de qualquer magia de clérigo ou de magia de domínio de clérigo seria apropriado. Se seu deus intervir, você não pode usar essa habilidade novamente por 7 dias. Caso contrário, você pode usá-la novamente depois de terminar um descanso longo. No 20º nível, seu chamado para a intervenção é bem-sucedido automaticamente, sem necessidade de rolagem.",
  },
];

const life: DnD5eSubClass = {
  name: "Domínio da Vida",
  description:
    "O Domínio da Vida foca a energia positiva vibrante - uma das forças fundamentais do universo - que sustenta toda a vida. Os deuses da vida promovem vitalidade e saúde através da cura dos doentes e feridos, cuidando dos necessitados e expulsando as forças da morte e da morte-viva. Quase qualquer divindade não maligna pode afirmar influência sobre este domínio, especialmente deidades agrícolas (como Chauntea, Arawai e Demeter), deuses solares (como Lathander, Pelor e Re-Horakhty), deuses da cura ou resistência (como Ilmater, Mishakal, Apollo e Diancecht) e deuses do lar e da comunidade (como Hestia, Hathor e Boldrei).",
  features: [
    {
      name: "Magias do Domínio da Vida",
      level: 1,
      description:
        "Nível do Clérigo Magias: 1º abençoar, curar ferimentos; 3º restauração menor, arma espiritual; 5º farol da esperança, reviver; 7º proteção contra a morte, guardião da fé; 9º cura em massa, ressurreição.",
    },
    {
      name: "Proficiência Bônus",
      level: 1,
      description:
        "Quando você escolhe este domínio no 1º nível, você ganha proficiência com armadura pesada.",
    },
    {
      name: "Discípulo da Vida",
      level: 1,
      description:
        "Também a partir do 1º nível, seus feitiços de cura são mais eficazes. Sempre que você usar um feitiço de 1º nível ou superior para restaurar pontos de vida a uma criatura, a criatura recupera pontos de vida adicionais iguais a 2 + o nível do feitiço.",
    },
    {
      name: "Canalizar Divindade: Preservar Vida",
      level: 2,
      description:
        "A partir do 2º nível, você pode usar sua Canalizar Divindade para curar os gravemente feridos. Como uma ação, você apresenta seu símbolo sagrado e evoca energia de cura que pode restaurar um número de pontos de vida igual a cinco vezes o seu nível de clérigo. Escolha quaisquer criaturas dentro de 6 espaços (9m / 30ft) de você e divida aqueles pontos de vida entre elas. Este recurso pode restaurar uma criatura para não mais do que metade de seu máximo de pontos de vida. Você não pode usar este recurso em um morto-vivo ou em um construto.",
    },
    {
      name: "Curandeiro Abençoado",
      level: 6,
      description:
        "Começando no 6º nível, os feitiços de cura que você conjura em outros também curam você. Quando você conjura um feitiço de 1º nível ou superior que restaura pontos de vida a uma criatura que não seja você, você recupera pontos de vida iguais a 2 + o nível do feitiço.",
    },
    {
      name: "Ataque Divino",
      level: [8, 14],
      description:
        "No 8º nível, você ganha a habilidade de infundir seus ataques de armas com energia divina. Uma vez em cada um de seus turnos, quando você atinge uma criatura com um ataque de arma, você pode fazer com que o ataque cause um dano radiante extra de 1d8 ao alvo. Quando você atinge o 14º nível, o dano extra aumenta para 2d8.",
    },
    {
      name: "Cura Suprema",
      level: 17,
      description:
        "A partir do 17º nível, quando você normalmente rolaria um ou mais dados para restaurar pontos de vida com um feitiço, você usa em vez disso o número mais alto possível para cada dado. Por exemplo, em vez de restaurar 2d6 pontos de vida a uma criatura, você restaura 12.",
    },
  ],
  spells: [
    "Bless",
    "Cure Wounds",
    "Lesser Restoration",
    "Spiritual Weapon",
    "Beacon of Hope",
    "Revivify",
    "Death Ward",
    "Guardian of Faith",
    "Mass Cure Wounds",
    "Raise Dead",
  ],
};

const cleric: DnD5eClass = {
  key: "cleric",
  name: "Clérigo",
  description: "HP d8, Habilidade Sab, TR Sab e Car",
  features,
  subclasses: [life],
  hp: {
    dice: "d8",
    average: 5,
  },
  cantripKnown: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  spellsKnown: Infinity,
  spellsSlots: [
    [Infinity, 2], // 1
    [Infinity, 3], // 2
    [Infinity, 4, 2], // 3
    [Infinity, 4, 3], // 4
    [Infinity, 4, 3, 2], // 5
    [Infinity, 4, 3, 3], // 6
    [Infinity, 4, 3, 3, 1], // 7
    [Infinity, 4, 3, 3, 2], // 8
    [Infinity, 4, 3, 3, 3, 1], // 9
    [Infinity, 4, 3, 3, 3, 2], // 10
    [Infinity, 4, 3, 3, 3, 2, 1], // 11
    [Infinity, 4, 3, 3, 3, 2, 1], // 12
    [Infinity, 4, 3, 3, 3, 2, 1, 1], // 13
    [Infinity, 4, 3, 3, 3, 2, 1, 1], // 14
    [Infinity, 4, 3, 3, 3, 2, 1, 1, 1], // 15
    [Infinity, 4, 3, 3, 3, 2, 1, 1, 1], // 16
    [Infinity, 4, 3, 3, 3, 2, 1, 1, 1, 1], // 17
    [Infinity, 4, 3, 3, 3, 3, 1, 1, 1, 1], // 18
    [Infinity, 4, 3, 3, 3, 3, 2, 1, 1, 1], // 19
    [Infinity, 4, 3, 3, 3, 3, 2, 2, 1, 1], // 20
  ],
  proficiencies: {
    armor: ["light", "medium", "shield"],
    weapon: ["simple"],
    savingThrows: ["wisdom", "charisma"],
    skills: {
      amount: 2,
      options: [
        { label: "História (History)", value: "history" },
        { label: "Intuição (Insight)", value: "insight" },
        { label: "Medicina (Medicine)", value: "medicine" },
        { label: "Persuasão (Persuasion)", value: "persuasion" },
        { label: "Religião (Religion)", value: "religion" },
      ],
    },
    equipmentOptions: [
      [
        { index: "mace", amount: 1 },
        { index: "warhammer", amount: 1 },
      ],
      [
        { index: "scale-mail", amount: 1 },
        { index: "leather-armor", amount: 1 },
        { index: "chain-mail", amount: 1 },
      ],
      [
        { index: "crossbow-light", amount: 1, ammo: 20 },
        { category_range: "Simple", amount: 1 },
      ],
      [
        { index: "priests-pack", amount: 1 },
        { index: "explorers-pack", amount: 1 },
      ],
      [{ index: "shield", amount: 1 }],
      [{ gear_category: "holy-symbols", amount: 1 }],
    ],
  },
};

export default cleric;

/*
Analise o texto a seguir e gere um arquivo json traduzido seguindo este schema: {
name: string em portugues;
level: number;
description: string em portugues;
}

Texto:

 */

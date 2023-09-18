import type { DnD5eFeature, DnD5eClass, DnD5eSubClass } from "./interfaces"

const features: DnD5eFeature[] = [
  {
    name: "Expertise",
    level: [1, 6],
    description:
      "No 1º nível, escolha duas proficiências em perícias ou uma proficiência em perícia e uma proficiência em ferramentas de ladrão. O seu bônus de proficiência é dobrado para qualquer teste de habilidade que você fizer que use uma das proficiências escolhidas. No 6º nível, você pode escolher mais duas de suas proficiências (em perícias ou com ferramentas de ladrão) para obter esse benefício.",
  },
  {
    name: "Ataque Furtivo",
    level: 1,
    description:
      "Começando no 1º nível, você sabe como atacar sutilmente e explorar a distração do inimigo. Uma vez por turno, você pode causar um dano extra de 1d6 a uma criatura que você atingir com um ataque se tiver vantagem no rolamento de ataque. O ataque deve usar uma arma com a propriedade à distância ou de acuidade. Você não precisa de vantagem no rolamento de ataque se outro inimigo do alvo estiver a até 1 espaço (1,5m / 5ft) dele, esse inimigo não estiver incapacitado e você não tiver desvantagem no rolamento de ataque. A quantidade do dano extra aumenta à medida que você ganha níveis nesta classe, como mostrado na coluna Ataque Furtivo da tabela de Ladino.",
  },
  {
    name: "Gíria dos Ladrões",
    level: 1,
    description:
      "Durante seu treinamento como ladino, você aprendeu a gíria dos ladrões, uma mistura secreta de dialetos, jargões e códigos que permite esconder mensagens em conversas aparentemente normais. Somente outra criatura que conhece a gíria dos ladrões entende essas mensagens. Leva quatro vezes mais tempo para transmitir tal mensagem do que falar a mesma ideia diretamente. Além disso, você entende um conjunto de sinais e símbolos secretos usados para transmitir mensagens curtas e simples, como se uma área é perigosa ou é o território de uma guilda de ladrões, se há tesouro nas proximidades, ou se as pessoas em uma área são presas fáceis ou fornecerão um refúgio seguro para ladrões em fuga.",
  },
  {
    name: "Ação Ardilosa",
    level: 2,
    description:
      "A partir do 2° nível, sua agilidade e pensamento rápido permitem que você se mova e aja rapidamente. Você pode usar uma ação bônus em cada um de seus turnos em combate. Essa ação pode ser usada apenas para realizar a ação Disparada, Desengajar ou Esconder.",
  },
  {
    name: "Arquétipo Ardiloso",
    level: 3,
    description:
      "No 3° nível, você escolhe um arquétipo que deseja emular no uso de suas habilidades de ladino, como o de Ladrão. A escolha do seu arquétipo concede a você recursos no 3° nível e novamente no 9°, 13° e 17° níveis.",
  },
  {
    name: "Melhoria de Atributo",
    level: [4, 8, 10, 12, 16, 19],
    description:
      "Quando você alcança o 4° nível e novamente no 8°, 10°, 12°, 16° e 19° níveis, você pode aumentar um valor de habilidade de sua escolha em 2, ou aumentar dois valores de habilidade de sua escolha em 1. Você não pode aumentar um valor de habilidade acima de 20 usando essa característica.",
  },
  {
    name: "Esquiva Sobrenatural",
    level: 5,
    description:
      "A partir do 5° nível, quando um atacante que você possa ver o atinge com um ataque, você pode usar sua reação para reduzir pela metade o dano do ataque contra você.",
  },
  {
    name: "Evasão",
    level: 7,
    description:
      "Começando no 7° nível, você pode facilmente esquivar de certos efeitos de área, como o sopro de fogo de um dragão vermelho ou a magia tempestade de gelo. Quando você for submetido a um efeito que permite fazer um teste de resistência de Destreza para tomar apenas metade do dano, você não sofrerá nenhum dano se obtiver sucesso no teste de resistência e apenas metade do dano se falhar.",
  },
  {
    name: "Talento Confiável",
    level: 11,
    description:
      "A partir do 11° nível, você aprimorou suas habilidades escolhidas até atingir a perfeição. Sempre que você fizer um teste de habilidade que permita adicionar seu bônus de proficiência, você pode considerar um resultado de 9 ou inferior em um d20 como tendo um resultado de 10.",
  },
  {
    name: "Percepção às cegas",
    level: 14,
    description:
      "Começando no 14º nível, se você for capaz de ouvir, estará ciente da localização de qualquer criatura oculta ou invisível a até 2 espaços (3m / 10ft) de você.",
  },
  {
    name: "Mente Escorregadia",
    level: 15,
    description:
      "No 15º nível, você adquiriu uma força mental maior. Você ganha proficiência em testes de resistência de Sabedoria.",
  },
  {
    name: "Evasivo",
    level: 18,
    description:
      "Começando no 18º nível, você é tão evasivo que os atacantes raramente têm vantagem contra você. Nenhuma rolagem de ataque tem vantagem contra você enquanto você não estiver incapacitado.",
  },
  {
    name: "Golpe de Sorte",
    level: 20,
    description:
      "No 20º nível, você tem um talento estranho para ter sucesso quando precisa. Seu ataque falha, você pode transformar o fracasso em um acerto. Alternativamente, se você falhar em um teste de habilidade, pode tratar a rolagem de d20 como um 20. Depois de usar essa habilidade, você não pode usá-la novamente até terminar um descanso curto ou longo.",
  },
]

const thief: DnD5eSubClass = {
  name: "Ladrão",
  description:
    "Você aprimora suas habilidades nas artes do roubo. Ladrões, bandidos, batedores de carteira e outros criminosos geralmente seguem essa especialização, mas também o fazem os rogues que preferem se pensar como caçadores de tesouros profissionais, exploradores, delvers e investigadores. Além de melhorar sua agilidade e furtividade, você aprende habilidades úteis para explorar antigas ruínas, ler línguas desconhecidas e usar itens mágicos que normalmente não poderia usar.",
  features: [
    {
      name: "Mãos Rápidas",
      level: 3,
      description:
        "A partir do 3º nível, você pode usar a ação bônus concedida pela sua Ação Ardilosa para fazer um teste de Destreza (Ladinagem), usar suas ferramentas de ladrão para desarmar uma armadilha ou abrir uma fechadura, ou usar a ação Usar um Objeto.",
    },
    {
      name: "Trabalho em Segundo Plano",
      level: 3,
      description:
        "Quando você escolhe esta especialização no 3º nível, você ganha a habilidade de escalar mais rápido que o normal; a escalada não mais custa movimento extra. Além disso, quando você faz um salto em corrida, a distância que você cobre aumenta em um número de pés igual ao seu modificador de Destreza.",
    },
    {
      name: "Furtivo Supremo",
      level: 9,
      description:
        "A partir do 9º nível, você tem vantagem em um teste de Destreza (Furtividade) se não se mover mais do que metade da sua velocidade no mesmo turno.",
    },
    {
      name: "Usar Item Mágico",
      level: 13,
      description:
        "No 13º nível, você aprendeu o suficiente sobre o funcionamento da magia que pode improvisar o uso de itens, mesmo quando eles não são destinados a você. Você ignora todos os requisitos de classe, raça e nível no uso de itens mágicos.",
    },
    {
      name: "Reflexos do Ladrão",
      level: 17,
      description:
        "Quando você alcança o 17º nível, se torna hábil em armar emboscadas e escapar rapidamente do perigo. Você pode tomar duas ações durante o primeiro turno de qualquer combate. Você toma sua primeira ação em sua iniciativa normal e sua segunda ação em sua iniciativa menos 10. Você não pode usar esta habilidade quando está surpreso.",
    },
  ],
}

const rogue: DnD5eClass = {
  name: "Ladino",
  description: "HP d8, Habilidade Des, TR Des e Int",
  features,
  subclasses: [thief],
  hp: {
    dice: "d8",
    average: 5,
  },
  proficiencies: {
    armor: ["light"],
    weapon: ["simple", "handCrossbow", "longSword", "rapier", "shortSword"],
    savingThrows: ["dexterity", "intelligence"],
    skills: {
      amount: 4,
      options: [
        { label: "Acrobacia (Acrobatics)", value: "acrobatics" },
        { label: "Atletismo (Athletics)", value: "athletics" },
        { label: "Enganação (Deception)", value: "deception" },
        { label: "Intuição (Insight)", value: "insight" },
        { label: "Investigação (Investigation)", value: "investigation" },
        { label: "Natureza (Nature)", value: "nature" },
        { label: "Percepção (Perception)", value: "perception" },
        { label: "Furtividade (Stealth)", value: "stealth" },
      ],
    },
    equipmentOptions: [
      [
        { index: "rapier", amount: 1 },
        { index: "shortsword", amount: 1 },
      ],
      [
        {
          list: [
            { index: "shortbow", amount: 1, ammo: 20 },
            { index: "quiver", amount: 1 },
          ],
        },
        { index: "shortsword", amount: 1 },
      ],
      [
        { index: "burglars-pack", amount: 1 },
        { index: "dungeoneers-pack", amount: 1 },
        { index: "explorers-pack", amount: 1 },
      ],
      [{ index: "leather-armor", amount: 1 }],
      [{ index: "dagger", amount: 2 }],
      [{ index: "thieves-tools", amount: 1 }],
    ],
  },
}

export default rogue

/*
Analise o texto a seguir e gere um arquivo json para cada paragrafo traduzido seguindo este schema: {
name: string em português;
level: number | number[];
description: string em português;
}

Texto:



*/

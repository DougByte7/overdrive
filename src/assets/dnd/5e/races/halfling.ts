import type { DnD5eRace, DnD5eSubrace, DnD5eTrait } from "./interfaces"

const traits: DnD5eTrait[] = [
  {
    name: "Aumento no valor de habilidade.",
    description: "Seu valor de Destreza aumenta em 2.",
  },
  {
    name: "Idade.",
    description:
      "Um halfling atinge a idade adulta aos 20 anos e geralmente vive até a metade de seu segundo século.",
  },
  {
    name: "Alinhamento.",
    description:
      "A maioria dos halflings são leais e bons. Como regra, eles têm bom coração e são gentis, odeiam ver os outros sofrendo e não toleram a opressão. Eles também são muito ordeiros e tradicionais, apoiando-se fortemente no apoio de sua comunidade e no conforto de seus velhos costumes.",
  },
  {
    name: "Tamanho.",
    description:
      "Os halflings medem em média cerca de 1 metro de altura (3ft) e pesam cerca de 18 quilos (40 libras). Seu tamanho é Pequeno.",
  },
  {
    name: "Velocidade.",
    description:
      "Seu deslocamento base de caminhada é de 5 espaços (7,5m / 25ft).",
  },
  {
    name: "Sortudo.",
    description:
      "Quando você rola 1 no d20 para uma jogada de ataque, teste de habilidade ou teste de resistência, você pode rolar o dado novamente e deve usar a nova jogada.",
  },
  {
    name: "Corajoso.",
    description:
      "Você tem vantagem em testes de resistência contra ficar amedrontado.",
  },
  {
    name: "Agilidade Halfling.",
    description:
      "Você pode se mover pelo espaço de qualquer criatura de tamanho maior que o seu.",
  },
  {
    name: "Línguas.",
    description:
      "Você pode falar, ler e escrever Comum e Halfling. A linguagem Halfling não é secreta, mas os halflings relutam em compartilhá-la com outros. Eles escrevem muito pouco, então não têm uma literatura rica. Sua tradição oral, no entanto, é muito forte. Quase todos os halflings falam o idioma Comum para conversar com as pessoas em cujas terras vivem ou pelas quais estão viajando.",
  },
]

const lightfoot: DnD5eSubrace = {
  name: "Lightfoot",
  description:
    "Como um halfling lightfoot, você pode se esconder facilmente, mesmo usando outras pessoas como cobertura. Você tende a ser afável e se dar bem com os outros. Lightfoots são mais propensos ao desejo de viajar do que outros halflings, e muitas vezes vivem ao lado de outras raças ou levam uma vida nômade.",
  boost: {
    charisma: 1,
  },
  traits: [
    {
      name: "Aumento no valor de habilidade.",
      description: "Seu valor de Carisma aumenta em 1.",
    },
    {
      name: "Naturalmente furtivo.",
      description:
        "Você pode tentar se esconder mesmo quando estiver obscurecido apenas por uma criatura que seja pelo menos um tamanho maior que você.",
    },
  ],
}

const halfling: DnD5eRace = {
  name: "Halfling",
  description: "+2 Des, +1 Car",
  traits,
  subraces: [lightfoot],
  boost: {
    dexterity: 2,
    charisma: 1,
    speed: 5,
  },
}

export default halfling

import type { DnD5eRace, DnD5eSubrace, DnD5eTrait } from "./interfaces"

const traits: DnD5eTrait[] = [
  {
    name: "Aumento no valor de habilidade.",
    description: "Seu valor de Destreza aumenta em 2.",
  },
  {
    name: "Idade.",
    description:
      "Embora os elfos atinjam a maturidade física aproximadamente na mesma idade que os humanos, a compreensão élfica da idade adulta vai além do crescimento físico para abranger a experiência mundana. Um elfo normalmente reivindica a idade adulta e um nome adulto por volta dos 100 anos e pode viver até os 750 anos.",
  },
  {
    name: "Alinhamento.",
    description:
      "Os elfos amam a liberdade, a variedade e a auto-expressão, então eles se inclinam fortemente para os aspectos mais suaves do caos. Eles valorizam e protegem a liberdade dos outros, assim como a sua própria, e tendem para o bem.",
  },
  {
    name: "Tamanho.",
    description:
      "Os elfos variam de menos de 1,50 a mais de 1,80 metro (5 e 6ft) de altura e têm constituição esbelta. Seu tamanho é Médio",
  },
  {
    name: "Velocidade.",
    description:
      "Seu deslocamento base de caminhada é de 6 espaços (9m / 30ft).",
  },
  {
    name: "Visão no escuro.",
    description:
      "Acostumado a florestas crepusculares e ao céu noturno, você tem uma visão superior no escuro e na penumbra. Você pode enxergar na penumbra a até 12 espaços (18m / 60ft) de você como se fosse luz plena e na escuridão como se fosse penumbra. Você não pode discernir cores no escuro, apenas tons de cinza.",
  },
  {
    name: "Sentidos Aguçados.",
    description: "Você tem proficiência na Habilidade de Percepção.",
  },
  {
    name: "Ancestralidade Feérica.",
    description:
      "Você tem vantagem em testes de resistência contra ser enfeitiçado e a magia não pode fazer você dormir",
  },
  {
    name: "Transe.",
    description:
      "Elfos não precisam dormir. Em vez disso, eles meditam profundamente, permanecendo semiconscientes, durante 4 horas por dia. (A palavra comum para tal meditação é “transe”.) Enquanto medita, você pode sonhar de certa forma; tais sonhos são, na verdade, exercícios mentais que se tornaram reflexivos ao longo de anos de prática. Depois de descansar dessa forma, você ganha o mesmo benefício que um humano ganha com 8 horas de sono.",
  },
  {
    name: "Línguas.",
    description:
      "Você pode falar, ler e escrever comum e élfico. Élfico é fluido, com entonações sutis e gramática intrincada. A literatura élfica é rica e variada, e suas canções e poemas são famosos entre outras raças. Muitos bardos aprendem seu idioma para que possam adicionar baladas élficas a seus repertórios.",
  },
]

const highElf: DnD5eSubrace = {
  name: "Alto Elfo",
  description:
    "Como um alto elfo, você tem uma mente aguçada e um domínio de pelo menos o básico da magia. Em muitos mundos de jogos de fantasia, existem dois tipos de elfos superiores. Um tipo é arrogante e recluso, acreditando ser superior aos não-elfos e até mesmo a outros elfos. O outro tipo é mais comum e amigável, e frequentemente encontrado entre humanos e outras raças.",
  boost: {
    intelligence: 1,
  },
  traits: [
    {
      name: "Aumento no valor de habilidade.",
      description: "Seu valor de Inteligencia aumenta em 1.",
    },
    {
      name: "Treinamento em Armas Élficas.",
      description:
        "Você tem proficiência com a espada longa, espada curta, arco curto e arco longo.",
    },
    {
      name: "Truque.",
      description:
        "Você conhece um truque à sua escolha da lista de magias do mago. Inteligência é sua habilidade de conjuração para isso.",
    },
    {
      name: "Língua Extra.",
      description:
        "Você pode falar, ler e escrever um idioma extra de sua escolha.",
    },
  ],
}

const elf: DnD5eRace = {
  name: "Elfo",
  description: "+2 Des, +1 Int",
  traits,
  subraces: [highElf],
  boost: {
    dexterity: 2,
    speed: 6,
    darkvision: 12,
  },
  proficiency: {
    perception: true,
  },
}

export default elf

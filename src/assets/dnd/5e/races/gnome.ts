import type { DnD5eRace, DnD5eSubrace, DnD5eTrait } from "./interfaces"

const traits: DnD5eTrait[] = [
  {
    name: "Aumento no valor de habilidade.",
    description: "Seu valor de Inteligência aumenta em 2.",
  },
  {
    name: "Idade.",
    description:
      "Os gnomos amadurecem na mesma proporção que os humanos, e espera-se que a maioria chegue à vida adulta por volta dos 40 anos. Eles podem viver de 350 a quase 500 anos.",
  },
  {
    name: "Alinhamento.",
    description:
      "Os gnomos costumam ser bons. Aqueles que tendem para a lei são sábios, engenheiros, pesquisadores, estudiosos, investigadores ou inventores. Aqueles que tendem ao caos são menestréis, trapaceiros, andarilhos ou joalheiros fantasiosos. Os gnomos têm bom coração e até mesmo os trapaceiros entre eles são mais brincalhões do que cruéis.",
  },
  {
    name: "Tamanho.",
    description:
      "Os gnomos têm entre 0,90 e 1,20 metros (3 e 4ft) de altura e pesam em média cerca de 18kg (40 libras). Seu tamanho é Pequeno.",
  },
  {
    name: "Velocidade.",
    description:
      "Seu deslocamento base de caminhada é de 5 espaços (7,5m / 25ft).",
  },
  {
    name: "Visão no escuro.",
    description:
      "Acostumado à vida subterrânea, você tem uma visão superior em condições de escuridão e penumbra. Você pode enxergar na penumbra a até 12 espaços (18m / 60ft) de você como se fosse luz plena e na escuridão como se fosse penumbra. Você não pode discernir cores no escuro, apenas tons de cinza.",
  },
  {
    name: "Astúcia do Gnomos.",
    description:
      "Você tem vantagem em todos os testes de resistência de Inteligência, Sabedoria e Carisma contra magia.",
  },
  {
    name: "Línguas.",
    description:
      "Você pode falar, ler e escrever em Comum e Gnômico. A língua gnômica, que usa a escrita anã, é conhecida por seus tratados técnicos e seus catálogos de conhecimento sobre o mundo natural.",
  },
]

const rockGnome: DnD5eSubrace = {
  name: "Gnomo das rochas",
  description:
    "Como um gnomo das rochas, você tem uma inventividade natural e resistência além de outros gnomos.",
  boost: {
    constitution: 1,
  },
  traits: [
    {
      name: "Aumento no valor de habilidade.",
      description: "Seu valor de Constituição aumenta em 1.",
    },
    {
      name: "Conhecimento do Artífice.",
      description:
        "Sempre que você fizer um teste de Inteligência (História) relacionado a itens mágicos, objetos alquímicos ou dispositivos tecnológicos, você pode adicionar o dobro de seu bônus de proficiência, em vez de qualquer bônus de proficiência que você normalmente aplica.",
    },
    {
      name: "Funileiro.",
      description: `Você tem proficiência com ferramentas de artesão (ferramentas de funileiro). Usando essas ferramentas, você pode gastar 1 hora e 10 po de materiais para construir um dispositivo mecânico minúsculo (CA 5, 1 hp). O dispositivo deixa de funcionar após 24 horas (a menos que você gaste 1 hora consertando-o para manter o dispositivo funcionando) ou quando você usa sua ação para desmontá-lo; nesse momento, você pode recuperar os materiais usados para criá-lo. Você pode ter até três desses dispositivos ativos ao mesmo tempo. Ao criar um dispositivo, escolha uma das seguintes opções:
      
      Brinquedo Mecânico. Este brinquedo é um animal mecânico, monstro ou pessoa, como um sapo, rato, pássaro, dragão ou soldado. Quando colocado no chão, o brinquedo se move 1 espaço (1,5m / 5ft) no chão em cada um de seus turnos em uma direção aleatória. Ele faz barulhos apropriados para a criatura que representa.
      
      Iniciador de fogo. O dispositivo produz uma chama em miniatura, que você pode usar para acender uma vela, tocha ou fogueira. Usar o dispositivo requer sua ação.
      
      Caixa de música. Quando aberta, esta caixa de música reproduz uma única música em um volume moderado. A caixa para de tocar quando chega ao final da música ou quando é fechada.
      `,
    },
  ],
}

const gnome: DnD5eRace = {
  name: "Gnomo",
  description: "+2 Int, +1 Con",
  traits,
  subraces: [rockGnome],
  boost: {
    intelligence: 2,
    constitution: 1,
    speed: 5,
    darkvision: 12,
  },
}

export default gnome

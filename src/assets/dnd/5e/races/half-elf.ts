import type { DnD5eRace, DnD5eTrait } from "./interfaces"

const traits: DnD5eTrait[] = [
  {
    name: "Aumento no valor de habilidade.",
    description:
      "Seu valor de Carisma aumenta em 2, e duas outras habilidades a sua escolha aumentam em 1",
  },
  {
    name: "Idade.",
    description:
      "Os meio-elfos amadurecem na mesma proporção que os humanos e atingem a idade adulta por volta dos 20 anos. Eles vivem muito mais que os humanos, no entanto, geralmente excedendo 180 anos.",
  },
  {
    name: "Alinhamento.",
    description:
      "Meio-elfos compartilham a tendência caótica de sua herança élfica. Eles valorizam tanto a liberdade pessoal quanto a expressão criativa, não demonstrando nem amor pelos líderes nem desejo por seguidores. Eles se irritam com as regras, se ressentem das exigências dos outros e, às vezes, não são confiáveis ou, pelo menos, imprevisíveis.",
  },
  {
    name: "Tamanho.",
    description:
      "Os meio-elfos têm aproximadamente o mesmo tamanho que os humanos, variando de 1,5 a 1,80 metro (5 e 6ft) de altura. Seu tamanho é Médio.",
  },
  {
    name: "Velocidade.",
    description:
      "Seu deslocamento base de caminhada é de 6 espaços (9m / 30ft).",
  },
  {
    name: "Visão no escuro.",
    description:
      "Graças ao seu sangue élfico, você tem uma visão superior em condições de escuridão e penumbra. Você pode enxergar na penumbra a até 12 espaços (18m / 60ft) de você como se fosse luz plena e na escuridão como se fosse penumbra. Você não pode discernir cores no escuro, apenas tons de cinza.",
  },
  {
    name: "Ancestralidade Feérica.",
    description:
      "Você tem vantagem em testes de resistência contra ser enfeitiçado e a magia não pode fazer você dormir",
  },
  {
    name: "Versatilidade de Habilidade.",
    description: "Você ganha proficiência em duas perícias à sua escolha.",
  },
  {
    name: "Línguas.",
    description:
      "Você pode falar, ler e escrever comum, élfico e um idioma extra de sua escolha.",
  },
]

const halfElf: DnD5eRace = {
  name: "Meio-Elfo",
  description: "+2 Cha, +1 em duas",
  traits,
  subraces: [],
  boost: {
    charisma: 2,
    anyAttr: {
      amount: 2,
      value: 1,
    },
    speed: 6,
    darkvision: 12,
  },
}

export default halfElf

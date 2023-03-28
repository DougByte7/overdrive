import type { DnD5eRace, DnD5eTrait } from "./interfaces"

const traits: DnD5eTrait[] = [
  {
    name: "Aumento no valor de habilidade.",
    description: "Seus valores de habilidade aumentam em 1.",
  },
  {
    name: "Idade.",
    description:
      "Os seres humanos atingem a idade adulta no final da adolescência e vivem menos de um século.",
  },
  {
    name: "Alinhamento.",
    description:
      "Os humanos não tendem a nenhum alinhamento em particular. O melhor e o pior estão entre eles.",
  },
  {
    name: "Tamanho.",
    description:
      "Os seres humanos variam amplamente em altura e construção, de apenas 1,5 metro a mais de 1,80 metro de altura (5 e 6ft). Independentemente de sua posição nesse intervalo, seu tamanho é Médio.",
  },
  {
    name: "Velocidade.",
    description:
      "Seu deslocamento base de caminhada é de 6 espaços (9m / 30ft).",
  },
  {
    name: "Línguas.",
    description:
      "Você pode falar, ler e escrever Comum e um idioma extra de sua escolha. Os humanos normalmente aprendem as línguas de outros povos com os quais lidam, incluindo dialetos obscuros. Eles gostam de polvilhar sua fala com palavras emprestadas de outras línguas: maldições orcs, expressões musicais élficas, frases militares anãs e assim por diante.",
  },
]

const human: DnD5eRace = {
  name: "Humano",
  description: "+1 em todos os atributos",
  traits,
  subraces: [],
  boost: {
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 1,
    speed: 6,
  },
}

export default human

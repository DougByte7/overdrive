import type { DnD5eRace, DnD5eSubrace, DnD5eTrait } from "./interfaces"

const traits: DnD5eTrait[] = [
  {
    name: "Aumento no valor de habilidade.",
    description: "Seu valor de Constituição aumenta em 2.",
  },
  {
    name: "Idade.",
    description:
      "Os anões amadurecem na mesma proporção que os humanos, mas são considerados jovens até os 50 anos de idade. Em média, eles vivem cerca de 350 anos.",
  },
  {
    name: "Alinhamento.",
    description:
      "A maioria dos anões são ordeiros (lawful), acreditando fortemente nos benefícios de uma sociedade bem organizada. Eles também tendem para o bem, com um forte senso de justiça e a crença de que todos merecem compartilhar os benefícios de uma ordem justa.",
  },
  {
    name: "Tamanho.",
    description:
      "Os anões medem entre 1,20 e 1,50 metro (4 e 5ft) de altura e média de cerca de 70kg (150 libras). Seu tamanho é Médio.",
  },
  {
    name: "Velocidade.",
    description:
      "Seu deslocamento base de caminhada é de 5 espaços (7,5m / 25ft). Sua a velocidade não é reduzida pelo uso de armadura pesada.",
  },
  {
    name: "Visão no escuro.",
    description:
      "Acostumado à vida subterrânea, você tem uma visão superior em condições de escuridão e penumbra. Você pode enxergar na penumbra a até 12 espaços (18m / 60ft) de você como se fosse luz plena e na escuridão como se fosse penumbra. Você não pode discernir cores no escuro, apenas tons de cinza.",
  },
  {
    name: "Resiliência Anã.",
    description:
      "Você tem vantagem em testes de resistência contra veneno e tem resistência contra dano de veneno.",
  },
  {
    name: "Treinamento de Combate dos Anões.",
    description:
      "Você tem proficiência com o machado de batalha, machado de mão, martelo leve e martelo de guerra",
  },
  {
    name: "Proficiência com ferramentas.",
    description:
      "Você ganha proficiência com as ferramentas de artesão de sua escolha: ferramentas de ferreiro, suprimentos de cervejeiro ou ferramentas de pedreiro.",
  },
  {
    name: "Stonecunning.",
    description:
      "Sempre que você fizer um teste de Inteligência (História) relacionado à origem da cantaria, você é considerado proficiente na Habilidade de História e adicione o dobro de seu bônus de proficiência ao teste, em vez de seu bônus de proficiência normal.",
  },
  {
    name: "Línguas.",
    description:
      "Você pode falar, ler e escrever em Comum e Anão. Anão é cheio de consoantes duras e sons guturais, e essas características se espalham em qualquer outro idioma que um anão possa falar.",
  },
]

const hillDwarf: DnD5eSubrace = {
  name: "Anão das colinas",
  description:
    "Como um anão da colina, você tem sentidos aguçados, intuição profunda e uma resiliência notável.",
  boost: {
    wisdom: 1,
    hp: 1,
  },
  traits: [
    {
      name: "Aumento no valor de habilidade.",
      description: "Seu valor de Sabedoria aumenta em 1.",
    },
    {
      name: "Resistência Anã.",
      description:
        "Seu máximo de pontos de vida aumenta em 1 e aumenta em 1 toda vez que você sobe de nível.",
    },
  ],
}

const dwarf: DnD5eRace = {
  name: "Anão",
  description: "+2 Con, +1 Sab",
  traits,
  subraces: [hillDwarf],
  boost: {
    constitution: 2,
    speed: 5,
    darkvision: 12,
  },
}

export default dwarf

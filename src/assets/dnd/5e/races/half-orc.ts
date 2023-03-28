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
      "Os meio-orcs amadurecem um pouco mais rápido que os humanos, atingindo a idade adulta por volta dos 14 anos. Eles envelhecem visivelmente mais rápido e raramente vivem mais de 75 anos.",
  },
  {
    name: "Alinhamento.",
    description:
      "Meio-orcs herdam uma tendência ao caos de seus pais orcs e não são fortemente inclinados ao bem. Meio-orcs criados entre orcs e dispostos a viver suas vidas entre eles geralmente são maus.",
  },
  {
    name: "Tamanho.",
    description:
      "Os meio-orcs são um pouco maiores e mais volumosos que os humanos, e variam de 1,5 a mais de 1,80 metro (5 e 6ft) de altura. Seu tamanho é Médio.",
  },
  {
    name: "Velocidade.",
    description:
      "Seu deslocamento base de caminhada é de 6 espaços (9m / 30ft).",
  },
  {
    name: "Visão no escuro.",
    description:
      "Graças ao seu sangue orc, você tem uma visão superior em condições de escuridão e penumbra. Você pode enxergar na penumbra a até 12 espaços (18m / 60ft) de você como se fosse luz plena e na escuridão como se fosse penumbra. Você não pode discernir cores no escuro, apenas tons de cinza.",
  },
  {
    name: "Ameaçador.",
    description:
      "Você ganha proficiência na perícia Intimidação.",
  },
  {
    name: "Resistência Implacável.",
    description: "Quando você é reduzido a 0 pontos de vida, mas não é morto imediatamente, você pode cair para 1 ponto de vida. Você não pode usar esta característica novamente até terminar um descanso longo.",
  },
  {
    name: "Ataques Selvagens.",
    description:
      "Quando você obtém um acerto crítico com um ataque corpo a corpo com arma, você pode rolar um dos dados de dano da arma mais uma vez e adicioná-lo ao dano extra do acerto crítico.",
  },
  {
    name: "Línguas.",
    description:
      "Você pode falar, ler e escrever Comum e Orc. Orc é uma linguagem áspera e rouca com consoantes duras. Não tem escrita própria, mas é escrita na escrita anã.",
  },
]

const halfOrc: DnD5eRace = {
  name: "Meio-Orc",
  description: "+2 For, +1 Con",
  traits,
  subraces: [],
  boost: {
    strength: 2,
    constitution: 1,
    speed: 6,
    darkvision: 12,
  },
}

export default halfOrc

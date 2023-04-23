import type { DnD5eRace, DnD5eTrait } from "./interfaces"

const traits: DnD5eTrait[] = [
  {
    name: "Aumento no valor de habilidade.",
    description:
      "Seu valor de Inteligência aumenta em 1 e seu valor de Carisma aumenta em 2.",
  },
  {
    name: "Idade.",
    description:
      "Tieflings amadurecem na mesma proporção que os humanos, mas vivem alguns anos a mais.",
  },
  {
    name: "Alinhamento.",
    description:
      "Tieflings podem não ter uma tendência inata para o mal, mas muitos deles acabam lá. Maligno ou não, uma natureza independente leva muitos tieflings a um alinhamento caótico.",
  },
  {
    name: "Tamanho.",
    description:
      "Tieflings são aproximadamente do mesmo tamanho e constituição dos humanos. Seu tamanho é Médio.",
  },
  {
    name: "Velocidade.",
    description:
      "Seu deslocamento base de caminhada é de 6 espaços (9m / 30ft).",
  },
  {
    name: "Visão no escuro.",
    description:
      "Graças à sua herança infernal, você tem uma visão superior em condições de escuridão e penumbra. Você pode enxergar na penumbra a até 12 espaços (18m / 60ft) de você como se fosse luz plena e na escuridão como se fosse penumbra. Você não pode discernir cores no escuro, apenas tons de cinza.",
  },
  {
    name: "Resistência Infernal.",
    description: "Você tem resistência a dano de fogo.",
  },
  {
    name: "Legado Infernal.",
    description:
      "Você conhece o truque Taumaturgia. Quando você atinge o 3º nível, você pode lançar o feitiço de Repreensão Infernal (Hellish	Rebuke) como um feitiço de 2º nível uma vez com esta característica e recuperar a habilidade de fazê-lo quando terminar um descanso longo. Ao atingir o 5º nível, você pode lançar a magia Escuridão (Darkness) uma vez com esta característica e recuperar a habilidade de fazê-lo quando terminar um descanso longo. Carisma é sua habilidade de conjuração para essas magias.",
  },
  {
    name: "Línguas.",
    description: "Você pode falar, ler e escrever Comum e Infernal.",
  },
]

const tiefling: DnD5eRace = {
  name: "Tiefling",
  description: "+1 Int, +2 Car",
  traits,
  subraces: [],
  boost: {
    intelligence: 1,
    charisma: 2,
    speed: 6,
    darkvision: 12,
  },
}

export default tiefling

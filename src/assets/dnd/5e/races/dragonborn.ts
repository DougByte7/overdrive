import type { DnD5eRace, DnD5eTrait } from "./interfaces"

const traits: DnD5eTrait[] = [
  {
    name: "Aumento no valor de habilidade.",
    description:
      "Seu valor de Força aumenta em 2, e seu valor de Carisma aumenta em 1.",
  },
  {
    name: "Idade.",
    description:
      "O jovem draconato cresce rapidamente. Eles andam horas após a eclosão, atingem o tamanho e o desenvolvimento de uma criança humana de 10 anos aos 3 anos de idade e atingem a idade adulta aos 15. Eles vivem por volta dos 80.",
  },
  {
    name: "Alinhamento.",
    description:
      "Dragonborn tende a extremos, fazendo uma escolha consciente para um lado ou outro na guerra cósmica entre o bem e o mal. A maioria dos draconatos são bons, mas aqueles que estão do lado do mal podem ser vilões terríveis.",
  },
  {
    name: "Tamanho.",
    description:
      "Dragonborn são mais altos e mais pesados que os humanos, com mais de 1,80 metros (6ft) de altura e pesando em média quase 110 quilos (250 libras). Seu tamanho é Médio.",
  },
  {
    name: "Velocidade.",
    description:
      "Seu deslocamento base de caminhada é de 6 espaços (9m / 30ft).",
  },
  {
    name: "Ancestral Dracônico.",
    description: `Você tem ancestralidade dracônica. Escolha um tipo de dragão da tabela de Ancestrais Dracônicos. Sua Arma de Sopro e resistência a danos são determinados pelo tipo de dragão, conforme mostrado na tabela.
      | Dragão   | Tipo de dano | Arma de Sopro                        |
      | Preto    | Ácido        | Linha de 5 por 30 pés (TR. Destreza) |
      | Azul     | Relâmpago    | Linha de 5 por 30 pés (TR. Destreza) |
      | latão    | Fogo         | Linha de 5 por 30 pés (TR. Destreza) |
      | Bronze   | Relâmpago    | Linha de 5 por 30 pés (TR. Destreza) |
      | Cobre    | Ácido        | Linha de 5 por 30 pés (TR. Destreza) |
      | Ouro     | Fogo         | Cone de 15 pés (TR. Destreza)        |
      | Verde    | Veneno       | Cone de 15 pés (TR. Constituição)    |
      | Vermelho | Fogo         | Cone de 15 pés (TR. Destreza)        |
      | Prata    | Frio         | Cone de 15 pés (TR. Constituição)    |
      | Branco   | Frio         | Cone de 15 pés (TR. Constituição)    |
      `,
  },
  {
    name: "Arma de Sopro.",
    description:
      "Você pode usar sua ação para exalar energia destrutiva. Sua ancestralidade dracônica determina o tamanho, a forma e o tipo de dano da exalação. Quando você usa seu sopro, cada criatura na área da exalação deve fazer um teste de resistência, cujo tipo é determinado por sua ascendência dracônica. A CD para este teste de resistência é igual a 8 + seu modificador de Constituição + seu bônus de proficiência. Uma criatura sofre 2d6 de dano se falhar na resistência e metade desse dano se obtiver sucesso. O dano aumenta para 3d6 no 6º nível, 4d6 no 11º nível e 5d6 no 16º nível. Depois de usar seu sopro, você não pode usá-lo novamente até completar um descanso curto ou longo.",
  },
  {
    name: "Resistência a danos.",
    description:
      "Você tem resistência ao tipo de dano associado ao seu ancestral dracônico.",
  },
  {
    name: "Línguas.",
    description:
      "Você pode falar, ler e escrever Comum e Dracônico. Dracônico é considerado uma das línguas mais antigas e é freqüentemente usado no estudo da magia. A linguagem soa dura para a maioria das outras criaturas e inclui numerosas consoantes duras e sibilantes.",
  },
]

const dragonborn: DnD5eRace = {
  name: "Draconato",
  description: "+2 For, +1 Car",
  traits,
  subraces: [],
  boost: {
    strength: 2,
    charisma: 1,
    speed: 6,
  },
}

export default dragonborn

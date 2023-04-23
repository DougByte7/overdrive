import { Attribute } from "./classes/interfaces"

interface AbilityScore {
  attributeName: Attribute
  name: string
  description: string
}

type AbilityScoreName =
  | "strength"
  | "dexterity"
  | "constitution"
  | "intelligence"
  | "wisdom"
  | "charisma"

const abilityScores: Record<AbilityScoreName, AbilityScore> = {
  strength: {
    attributeName: "str",
    name: "Força",
    description: "Mede o poder físico",
  },
  dexterity: {
    attributeName: "dex",
    name: "Destreza",
    description: "Mede a agilidade",
  },
  constitution: {
    attributeName: "con",
    name: "Constituição",
    description: "Mede a resistência",
  },
  intelligence: {
    attributeName: "int",
    name: "Inteligência",
    description: "Mede o raciocínio e a memória",
  },
  wisdom: {
    attributeName: "wis",
    name: "Sabedoria",
    description: "Mede a percepção e a compreensão",
  },
  charisma: {
    attributeName: "cha",
    name: "Carisma",
    description: "Mede a força da personalidade",
  },
}
export default abilityScores

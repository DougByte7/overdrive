import { Attribute } from "./classes/interfaces"

interface AbilityScore {
  attributeName: Attribute
  name: string
  description: string
}

const abilityScores: Record<Attribute, AbilityScore> = {
  strength: {
    attributeName: "strength",
    name: "Força",
    description: "Mede o poder físico",
  },
  dexterity: {
    attributeName: "dexterity",
    name: "Destreza",
    description: "Mede a agilidade",
  },
  constitution: {
    attributeName: "constitution",
    name: "Constituição",
    description: "Mede a resistência",
  },
  intelligence: {
    attributeName: "intelligence",
    name: "Inteligência",
    description: "Mede o raciocínio e a memória",
  },
  wisdom: {
    attributeName: "wisdom",
    name: "Sabedoria",
    description: "Mede a percepção e a compreensão",
  },
  charisma: {
    attributeName: "charisma",
    name: "Carisma",
    description: "Mede a força da personalidade",
  },
}
export default abilityScores

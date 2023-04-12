interface DnD5eValues {
  hp: number
  speed: number
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
  darkvision: number
}

interface DnD5eSkills {
  perception: boolean
}

export interface DnD5eTrait {
  name: string
  description: string
}

export interface DnD5eSubrace {
  name: string
  description: string
  traits: DnD5eTrait[]
  boost?: Partial<DnD5eValues>
}

export interface DnD5eRace {
  name: string
  description: string
  traits: DnD5eTrait[]
  subraces: DnD5eSubrace[]
  boost?: Partial<DnD5eValues>
  proficiency?: Partial<DnD5eSkills>
}
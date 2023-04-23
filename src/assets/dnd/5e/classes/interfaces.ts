export interface DnD5eFeature {
  name: string
  level: number | number[]
  description: string
}

export interface DnD5eSubClass {
  name: string
  description: string
  features: DnD5eFeature[]
}

export type DiceFaces = 4 | 6 | 8 | 10 | 12 | 20
export type Dice = `d${DiceFaces}`
export type Armor = "light" | "medium" | "heavy" | "shield"
export type Weapon =
  | "simple"
  | "martial"
  | "lightCrossbow"
  | "handCrossbow"
  | "rapier"
  | "shortSword"
  | "longSword"
  | "dagger"
  | "dart"
  | "quarterstaff"
export type Attribute = "str" | "dex" | "con" | "int" | "wis" | "cha"
export type Skill =
  | "Arcana"
  | "Acrobacia (Acrobatics)"
  | "Atletismo (Athletics)"
  | "Enganação (Deception)"
  | "Furtividade (Stealth)"
  | "História (History)"
  | "Intimidação (Intimidation)"
  | "Intuição (Insight)"
  | "Investigação (Investigation)"
  | "Lidar com animais (Animal Handling)"
  | "Medicina (Medicine)"
  | "Natureza (Nature)"
  | "Percepção (Perception)"
  | "Persuasão (Persuasion)"
  | "Religião (Religion)"
  | "Sobrevivência (Survival)"

export type EquipmentTag =
  | "greataxe"
  | "mace"
  | "warhammer"
  | "martialWeapon"
  | "martialMeleeWeapon"
  | "simpleMeleeWeapon"
  | "handaxe"
  | "dart"
  | "lightCrossbow"
  | "simpleWeapon"
  | "javelin"
  | "rapier"
  | "shortbow"
  | "shortsword"
  | "longsword"
  | "longbow"
  | "dagger"
  | "quarterstaff"
  | "leatherArmor"
  | "scaleMail"
  | "chainMail"
  | "shield"
  | "quiver"
  | "componentPouch"
  | "arcaneFocus"
  | "spellbook"
  | "holySymbol"
  | "thievesTools"
  | "lute"
  | "musicalInstrument"
  | "dungeoneersPack"
  | "explorersPack"
  | "diplomatsPack"
  | "entertainersPack"
  | "priestsPack"
  | "burglarsPack"
  | "scholarsPack"

export type Tool = "musicalInstrument" | "artisansTools"

export interface DnD5eClass {
  name: string
  description: string
  features: DnD5eFeature[]
  subclasses: DnD5eSubClass[]
  hp: {
    dice: Dice
    average: number
  }
  proficiencies: {
    armor?: Armor[]
    weapon: Weapon[]
    tools?: Tool[]
    savingThrows: Attribute[]
    skills: {
      amount: number
      options: Skill[]
    }
    equipmentOptions: Array<
      Array<{
        name: EquipmentTag | EquipmentTag[]
        amount: number
        ammo?: number
      }>
    >
  }
}

import barbarian from "./barbarian"
import bard from "./bard"
import cleric from "./cleric"
import druid from "./druid"
import fighter from "./fighter"
import monk from "./monk"
import paladin from "./paladin"
import ranger from "./ranger"
import rogue from "./rogue"
import sorcerer from "./sorcerer"
import warlock from "./warlock"
import wizard from "./wizard"
import type { DnD5eClass } from "./interfaces"

const classes = {
  barbarian,
  bard,
  cleric,
  druid,
  fighter,
  monk,
  paladin,
  ranger,
  rogue,
  sorcerer,
  warlock,
  wizard,
}

export type DnD5eClassName = keyof typeof classes
export type {
  DnD5eFeature,
  DnD5eSubClass,
  DiceFaces,
  Dice,
  Armor,
  Weapon,
  Attribute as SavingThrow,
  Skill,
  Tool,
  DnD5eClass,
} from "./interfaces"
export default classes as Record<DnD5eClassName, DnD5eClass>

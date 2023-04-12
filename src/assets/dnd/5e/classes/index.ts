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
  sorcerer
}

export default classes
export type {
  DnD5eFeature,
  DnD5eSubClass,
  DiceFaces,
  Dice,
  Armor,
  Weapon,
  SavingThrow,
  Skill,
  EquipmentTag,
  Tool,
  DnD5eClass,
} from "./interfaces"

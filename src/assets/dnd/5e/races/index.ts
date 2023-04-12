import dragonborn from "./dragonborn"
import dwarf from "./dwarf"
import elf from "./elf"
import gnome from "./gnome"
import halfElf from "./half-elf"
import halfOrc from "./half-orc"
import halfling from "./halfling"
import human from "./human"
import tiefling from "./tiefling"

const races = {
  dwarf,
  elf,
  halfling,
  human,
  dragonborn,
  gnome,
  halfElf,
  halfOrc,
  tiefling
}

export default races
export type { DnD5eTrait, DnD5eSubrace, DnD5eRace } from "./interfaces"
import dragonborn from './dragonborn'
import dwarf from './dwarf'
import elf from './elf'
import gnome from './gnome'
import halfElf from './half-elf'
import halfOrc from './half-orc'
import halfling from './halfling'
import human from './human'
import type { DnD5eRace } from './interfaces'
import tiefling from './tiefling'

const races = {
    dwarf,
    elf,
    halfling,
    human,
    dragonborn,
    gnome,
    halfElf,
    halfOrc,
    tiefling,
}

export type DnD5eRaceName = keyof typeof races
export type { DnD5eTrait, DnD5eSubrace, DnD5eRace } from './interfaces'
export default races as Record<DnD5eRaceName, DnD5eRace>

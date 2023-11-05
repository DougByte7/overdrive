// @ts-nocheck
import {
  number,
  object,
  string,
  array,
  picklist,
  record,
  union,
  optional,
  boolean,
} from "valibot";
import type { DnD5eClassName, Skill } from "../classes";
import { DnD5eRaceName } from "../races";

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;
type LastOf<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R
  ? R
  : never;
type Push<T extends any[], V> = [...T, V];
type TuplifyUnion<
  T,
  L = LastOf<T>,
  N = [T] extends [never] ? true : false,
> = true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>;

const races: TuplifyUnion<DnD5eRaceName> = [
  "dwarf",
  "elf",
  "halfling",
  "human",
  "dragonborn",
  "gnome",
  "halfElf",
  "halfOrc",
  "tiefling",
];

const classes: TuplifyUnion<DnD5eClassName> = [
  "barbarian",
  "bard",
  "cleric",
  "druid",
  "fighter",
  "monk",
  "paladin",
  "ranger",
  "rogue",
  "sorcerer",
  "warlock",
  "wizard",
];

const skills: TuplifyUnion<Skill> = [
  "arcana",
  "acrobatics",
  "athletics",
  "deception",
  "stealth",
  "history",
  "intimidation",
  "insight",
  "investigation",
  "animal_handling",
  "medicine",
  "nature",
  "perception",
  "persuasion",
  "religion",
  "survival",
];

export const CharacterSheetSchema = object({
  id: string("No id"),
  hp: number("No hp"),
  currentHp: number("No current hp"),
  initiative: number("No initiative"),
  tempHp: number("No temp hp"),
  name: string("No name"),
  picture: string("No picture"),
  backstory: string("No backstory"),
  strength: number("No STR"),
  dexterity: number("No DEX"),
  constitution: number("No CON"),
  intelligence: number("No INT"),
  wisdom: number("No WIS"),
  charisma: number("No CHA"),
  race: picklist(races, "Invalid race"),
  classes: array(
    object(
      {
        name: picklist(classes, "Invalid class name"),
        level: number("No Level"),
      },
      "Invalid class",
    ),
    "No Class",
  ),
  traits: record(union([string(), array(string())]), "Invalid trait format"),
  features: record(
    union([string(), array(string())]),
    "Invalid feature format",
  ),
  proficiencies: array(picklist(skills), "Invalid proficiency name"),
  items: array(
    object(
      {
        index: string(),
        amount: number(),
        ammo: optional(number()),
        equipped: optional(boolean()),
      },
      "Invalid Item format",
    ),
  ),
  spells: array(string(), "No spells"),
  preparedSpells: array(string(), "No prepared spells"),
});

export default function getProficiencyBonus(level: number) {
  const proficiencyBonuses = [
    2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6,
  ]

  return proficiencyBonuses[level - 1]
}

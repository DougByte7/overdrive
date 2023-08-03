export default function getModifier(abilityScore: number) {
  return Math.floor((abilityScore - 10) / 2)
}

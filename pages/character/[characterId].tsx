import CharacterSheet from "@/components/character"
import { useRouter } from "next/router"

export default function PageCharacter() {
  const router = useRouter()

  return <CharacterSheet characterId={router.query.characterId as string} />
}

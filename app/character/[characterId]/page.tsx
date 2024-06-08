import { useRouter } from 'next/navigation'

import CharacterSheetPage from './character-sheet'

export default function NewCharacter({
    params,
}: {
    params: { characterId: string }
}) {
    const router = useRouter()

    if (!params.characterId) router.push('/home')

    return <CharacterSheetPage characterId={params.characterId} />
}

export const metadata = {
    title: 'Fixa de Personagem',
}

import router from 'next/navigation'

import CharacterSheetPage from './character-sheet'

export default function NewCharacter({
    params,
}: {
    params: { characterId: string }
}) {
    if (!params.characterId) router.redirect('/home')

    return <CharacterSheetPage characterId={params.characterId} />
}

export const metadata = {
    title: 'Fixa de Personagem',
}

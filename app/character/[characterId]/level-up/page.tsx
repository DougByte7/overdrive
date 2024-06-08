import router from 'next/navigation'

import LevelUp from './level-up'

export default function NewCharacter({
    params,
}: {
    params: { characterId: string }
}) {
    if (!params.characterId) router.redirect('/home')

    return <LevelUp characterId={params.characterId} />
}

export const metadata = {
    title: 'Novo Nível',
}

import { redirect } from 'next/navigation'

import LevelUp from './level-up'

export default function NewCharacter({
    params,
}: {
    params: { characterId: string }
}) {
    if (!params.characterId) redirect('/home')

    return <LevelUp characterId={params.characterId} />
}

export const metadata = {
    title: 'Novo Nível',
}

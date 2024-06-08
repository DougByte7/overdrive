import { useRouter } from 'next/navigation'

import LevelUp from './level-up'

export default function NewCharacter({
    params,
}: {
    params: { characterId: string }
}) {
    const router = useRouter()
    if (!params.characterId) router.push('/home')

    return <LevelUp characterId={params.characterId} />
}

export const metadata = {
    title: 'Novo Nível',
}

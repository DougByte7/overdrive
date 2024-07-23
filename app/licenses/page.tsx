import Link from 'next/link'

import TopBar from '@/components/top-bar'

export default function Licenses() {
    const licenses: Array<{ id: string; content: React.ReactNode }> = [
        {
            id: 'SRD 5.1',
            content: (
                <>
                    This work includes material taken from the System Reference
                    Document 5.1 (“SRD 5.1”) by Wizards of the Coast LLC and
                    available at{' '}
                    <a
                        href="https://dnd.wizards.com/resources/systems-reference-document"
                        target="_blank"
                    >
                        https://dnd.wizards.com/resources/systems-reference-document
                    </a>
                    . The SRD 5.1 is licensed under the Creative Commons
                    Attribution 4.0 International License available at{' '}
                    <a
                        href="https://creativecommons.org/licenses/by/4.0/legalcode"
                        target="_blank"
                    >
                        https://creativecommons.org/licenses/by/4.0/legalcode.
                    </a>
                </>
            ),
        },
        {
            id: 'Dice Set by JayDesigns3D',
            content: (
                <>
                    <a href="https://skfb.ly/6oFLq" target="_blank">
                        Dungeons And Dragons Dice Set
                    </a>{' '}
                    by <strong>JayDesigns3D</strong> is licensed under{' '}
                    <a
                        href="http://creativecommons.org/licenses/by/4.0/"
                        target="_blank"
                    >
                        Creative Commons Attribution
                    </a>
                    .
                </>
            ),
        },
    ]

    return (
        <>
            <TopBar title="Licenças" />
            <main className="mt-4 flex flex-wrap gap-x-12 gap-y-4 md:justify-center px-4">
                <aside className="md:sticky top-0 prose prose-invert md:h-screen overflow-auto scrollbar-none">
                    <nav className="flex flex-col">
                        {licenses.map((license) => (
                            <Link key={license.id} href={`#${license.id}`}>
                                {license.id}
                            </Link>
                        ))}
                    </nav>
                </aside>
                <ul className="prose prose-invert list-disc">
                    {licenses.map((license) => (
                        <li key={license.id} id={license.id}>
                            {license.content}
                        </li>
                    ))}
                </ul>
            </main>
        </>
    )
}

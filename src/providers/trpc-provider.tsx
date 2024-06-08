'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink, loggerLink } from '@trpc/client'
import { PropsWithChildren, useState } from 'react'
import superjson from 'superjson'

import { api } from '@/utils/api'

const getBaseUrl = () => {
    if (typeof window !== 'undefined') return '' // browser should use relative url
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
    return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export default function TRPCProvider({ children }: PropsWithChildren) {
    const [queryClient] = useState(() => new QueryClient({}))
    const [trpcClient] = useState(() =>
        api.createClient({
            /**
             * Transformer used for data de-serialization from the server.
             *
             * @see https://trpc.io/docs/data-transformers
             */
            transformer: superjson,

            /**
             * Links used to determine request flow from client to server.
             *
             * @see https://trpc.io/docs/links
             */
            links: [
                loggerLink({
                    enabled: (opts) =>
                        process.env.NODE_ENV === 'development' ||
                        (opts.direction === 'down' &&
                            opts.result instanceof Error),
                }),
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`,
                }),
            ],
        })
    )

    return (
        <api.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </api.Provider>
    )
}

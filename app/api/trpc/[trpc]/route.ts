import { getAuth } from '@clerk/nextjs/server'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import type { NextRequest } from 'next/server'

import { appRouter } from '@/server/api/root'
import { createTRPCContext } from '@/server/api/trpc'

const createContext = async (req: NextRequest) => {
    return createTRPCContext({
        headers: req.headers,
        auth: getAuth(req),
    })
}

// export API handler
async function handler(req: NextRequest) {
    return fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        createContext: () => createContext(req),
        router: appRouter,
        onError:
            process.env.NODE_ENV === 'development'
                ? ({ path, error }) => {
                      console.error(
                          `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
                      )
                  }
                : undefined,
    })
}

export { handler as GET, handler as POST }

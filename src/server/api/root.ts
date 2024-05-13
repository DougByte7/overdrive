import { charactersRouter } from './routers/characters'
import { srdCustomsRouter } from './routers/srd-custom'
import { createTRPCRouter } from './trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    characters: charactersRouter,
    srdCustoms: srdCustomsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

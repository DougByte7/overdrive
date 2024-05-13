import { TRPCError } from '@trpc/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { length, merge, object, parse, string } from 'valibot'
import z from 'zod'

import { CustomClassSchema } from '@/assets/dnd/5e/utils/schemas/classes'
import { CustomRaceSchema } from '@/assets/dnd/5e/utils/schemas/race'

import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc'

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, '1 m'),
    analytics: true,
})

const raceActions = {
    getRace: publicProcedure
        .input(z.string().length(21))
        .query(({ ctx, input }) => {
            return ctx.prisma.sRDCustomRace.findFirst({
                where: {
                    id: input,
                },
            })
        }),
    getAllRaces: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.sRDCustomRace.findMany({
            where: {
                public: true,
            },
        })
    }),
    getAllAuthorRaces: privateProcedure.query(({ ctx }) => {
        return ctx.prisma.sRDCustomRace.findMany({
            where: {
                authorId: ctx.userId,
            },
        })
    }),
    createRace: privateProcedure
        .input((input) => parse(CustomRaceSchema, input))
        .mutation(async ({ ctx, input }) => {
            const authorId = ctx.userId

            const { success } = await ratelimit.limit(authorId)
            if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

            const {
                speed: { burrow, climb, fly, land, swimming },
                ...rest
            } = input

            return ctx.prisma.sRDCustomRace.create({
                data: {
                    ...rest,
                    authorId,
                    speed_burrow: burrow,
                    speed_climb: climb,
                    speed_fly: fly,
                    speed_land: land,
                    speed_swimming: swimming,
                },
            })
        }),
    updateRace: privateProcedure
        .input((input) =>
            parse(
                merge([CustomRaceSchema, object({ id: string([length(21)]) })]),
                input
            )
        )
        .mutation(async ({ ctx, input }) => {
            const authorId = ctx.userId

            const { success } = await ratelimit.limit(authorId)
            if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

            const {
                speed: { burrow, climb, fly, land, swimming },
                ...rest
            } = input

            const updated = await ctx.prisma.sRDCustomRace.update({
                where: { authorId, id: input.id },
                data: {
                    ...rest,
                    speed_burrow: burrow,
                    speed_climb: climb,
                    speed_fly: fly,
                    speed_land: land,
                    speed_swimming: swimming,
                },
            })

            return updated
        }),
    deleteRace: privateProcedure
        .input(z.string().length(21))
        .mutation(async ({ ctx, input }) => {
            const authorId = ctx.userId

            const { success } = await ratelimit.limit(authorId)
            if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

            const deleted = await ctx.prisma.sRDCustomRace.delete({
                where: { authorId, id: input },
            })

            return deleted
        }),
}

const classActions = {
    getClass: publicProcedure
        .input(z.string().length(21))
        .query(({ ctx, input }) => {
            return ctx.prisma.sRDCustomClass.findFirst({
                where: {
                    id: input,
                },
            })
        }),
    getAllClasses: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.sRDCustomClass.findMany({
            where: {
                public: true,
            },
        })
    }),
    getAllAuthorClasses: privateProcedure.query(({ ctx }) => {
        return ctx.prisma.sRDCustomClass.findMany({
            where: {
                authorId: ctx.userId,
            },
        })
    }),
    createClass: privateProcedure
        .input((input) => parse(CustomClassSchema, input))
        .mutation(async ({ ctx, input }) => {
            const authorId = ctx.userId

            const { success } = await ratelimit.limit(authorId)
            if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

            const {
                proficiencies,
                spellsKnown, // @todo support for spells? maybe?
                spellsSlots,
                cantripKnown,
                ...rest
            } = input

            return ctx.prisma.sRDCustomClass.create({
                data: {
                    ...rest,
                    authorId,
                    proficiencies_armor: proficiencies.armor,
                    proficiencies_savingThrows: proficiencies.savingThrows,
                    proficiencies_skillAmount: proficiencies.skillAmount,
                    proficiencies_skills: proficiencies.skills,
                    proficiencies_weapon: proficiencies.weapon,
                },
            })
        }),
    updateClass: privateProcedure
        .input((input) =>
            parse(
                merge([
                    CustomClassSchema,
                    object({ id: string([length(21)]) }),
                ]),
                input
            )
        )
        .mutation(async ({ ctx, input }) => {
            const authorId = ctx.userId

            const { success } = await ratelimit.limit(authorId)
            if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

            const {
                proficiencies,
                spellsKnown, // @todo support for spells? maybe?
                spellsSlots,
                cantripKnown,
                ...rest
            } = input

            const updated = await ctx.prisma.sRDCustomClass.update({
                where: { authorId, id: input.id },
                data: {
                    ...rest,
                    proficiencies_armor: proficiencies.armor,
                    proficiencies_savingThrows: proficiencies.savingThrows,
                    proficiencies_skillAmount: proficiencies.skillAmount,
                    proficiencies_skills: proficiencies.skills,
                    proficiencies_weapon: proficiencies.weapon,
                },
            })

            return updated
        }),
    deleteClass: privateProcedure
        .input(z.string().length(21))
        .mutation(async ({ ctx, input }) => {
            const authorId = ctx.userId

            const { success } = await ratelimit.limit(authorId)
            if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

            const deleted = await ctx.prisma.sRDCustomClass.delete({
                where: { authorId, id: input },
            })

            return deleted
        }),
}

export const srdCustomsRouter = createTRPCRouter({
    ...raceActions,
    ...classActions,
})

import { TRPCError } from '@trpc/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { del, put } from '@vercel/blob'
import { resizeImage } from 'lib/resizeImage'
import { array, object, parse, picklist } from 'valibot'
import { string } from 'zod'

import { CharacterSheetSchema } from '@/assets/dnd/5e/schemas/charater'

import { createTRPCRouter, privateProcedure } from '../trpc'

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, '1 s'),
    analytics: true,
})

async function publishImage(
    picture: string,
    characterId: string,
    playerId: string
) {
    // If default picture return
    if (
        (picture.endsWith('.png') || picture.endsWith('.svg')) &&
        picture.length < 100
    )
        return picture

    const oneMega = 1024 ** 2

    const fileFormat = picture.substring(
        'data:image/'.length,
        picture.indexOf(';base64')
    )

    if (!['jpeg', 'png'].includes(fileFormat))
        throw new TRPCError({ code: 'BAD_REQUEST' })

    const pictureBuffer = Buffer.from(picture.split(',')[1], 'base64')
    if (pictureBuffer.byteLength > 10 * oneMega)
        throw new TRPCError({ code: 'PAYLOAD_TOO_LARGE' })

    const characterPicture = await resizeImage(pictureBuffer, 343, 431)
    if (characterPicture.byteLength > oneMega)
        throw new TRPCError({ code: 'PAYLOAD_TOO_LARGE' })

    const { url } = await put(
        `players/${playerId}/characters/${characterId}.jpeg`,
        characterPicture,
        {
            access: 'public',
            contentType: 'image/jpeg',
        }
    )

    return url
}

const supportedSystems = ['SRD5'] as const
export type SupportedSystems = (typeof supportedSystems)[number]

export const charactersRouter = createTRPCRouter({
    getAll: privateProcedure.query(({ ctx }) => {
        return ctx.prisma.character.findMany({
            where: {
                playerId: ctx.userId,
            },
        })
    }),
    create: privateProcedure
        .input((input) =>
            parse(
                object({
                    data: CharacterSheetSchema,
                    system: picklist(
                        supportedSystems,
                        'Role Play System not supported'
                    ),
                }),
                input
            )
        )
        .mutation(async ({ ctx, input }) => {
            const playerId = ctx.userId

            const { success } = await ratelimit.limit(playerId)
            if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

            const pictureUrl = await publishImage(
                input.data.picture,
                input.data.id,
                playerId
            )

            return ctx.prisma.character.create({
                data: {
                    ...input,
                    id: input.data.id,
                    playerId,
                    data: {
                        ...input.data,
                        picture: pictureUrl,
                    },
                },
            })
        }),
    createMany: privateProcedure
        .input((input) =>
            parse(
                array(
                    object({
                        data: CharacterSheetSchema,
                        system: picklist(
                            supportedSystems,
                            'Role Play System not supported'
                        ),
                    }),
                    'Invalid data'
                ),
                input
            )
        )
        .mutation(async ({ ctx, input }) => {
            const playerId = ctx.userId

            const { success } = await ratelimit.limit(playerId)
            if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

            const pictureUrls = (await Promise.allSettled(
                input.map(async (i) => {
                    const url = await publishImage(
                        i.data.picture,
                        i.data.id,
                        playerId
                    )
                    return url
                })
            )) as PromiseFulfilledResult<string>[]

            return ctx.prisma.character.createMany({
                data: input.map((c, i) => {
                    return {
                        id: c.data.id,
                        playerId,
                        system: c.system,
                        data: { ...c.data, picture: pictureUrls[i].value },
                    }
                }),
            })
        }),
    update: privateProcedure
        .input((input) => parse(CharacterSheetSchema, input))
        .mutation(async ({ ctx, input }) => {
            const playerId = ctx.userId

            const { success } = await ratelimit.limit(playerId)
            if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

            const updated = await ctx.prisma.character.update({
                where: { id: input.id, playerId },
                data: {
                    data: input,
                },
            })

            return updated
        }),
    delete: privateProcedure
        .input(string().length(21))
        .mutation(async ({ ctx, input }) => {
            const playerId = ctx.userId

            const { success } = await ratelimit.limit(playerId)
            if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

            const deleted = await ctx.prisma.character.delete({
                where: { id: input },
            })

            const { picture } = (deleted?.data as Record<string, any>) ?? {}

            if (
                picture &&
                !(picture.endsWith('.png') && picture.endsWith('.svg'))
            ) {
                await del(picture)
            }

            return deleted
        }),
})

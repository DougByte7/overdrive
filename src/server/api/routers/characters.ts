import { CharacterSheetSchema } from "@/assets/dnd/5e/utils/schema";
import { TRPCError } from "@trpc/server";
import { array, object, parse, picklist } from "valibot";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { string } from "zod";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
});

const supportedSystems = ["SRD5"] as const;
export type SupportedSystems = (typeof supportedSystems)[number];

export const charactersRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.character.findMany({
      where: {
        playerId: ctx.userId,
      },
    });
  }),
  create: privateProcedure
    .input((input) =>
      parse(
        object({
          data: CharacterSheetSchema,
          system: picklist(supportedSystems, "Role Play System not supported"),
        }),

        input,
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const playerId = ctx.userId;

      const { success } = await ratelimit.limit(playerId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      return ctx.prisma.character.create({
        data: {
          id: input.data.id,
          playerId,
          ...input,
        },
      });
    }),
  createMany: privateProcedure
    .input((input) =>
      parse(
        array(
          object({
            data: CharacterSheetSchema,
            system: picklist(
              supportedSystems,
              "Role Play System not supported",
            ),
          }),
          "Invalid data",
        ),
        input,
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const playerId = ctx.userId;

      const { success } = await ratelimit.limit(playerId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      return ctx.prisma.character.createMany({
        data: input.map((c) => {
          return {
            id: c.data.id,
            playerId,
            data: c.data,
            system: c.system,
          };
        }),
      });
    }),
  delete: privateProcedure
    .input(string().length(21))
    .mutation(async ({ ctx, input }) => {
      const playerId = ctx.userId;

      const { success } = await ratelimit.limit(playerId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      return ctx.prisma.character.delete({ where: { id: input } });
    }),
});

import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FontOrderByWithRelationInputObjectSchema as FontOrderByWithRelationInputObjectSchema } from './objects/FontOrderByWithRelationInput.schema';
import { FontWhereInputObjectSchema as FontWhereInputObjectSchema } from './objects/FontWhereInput.schema';
import { FontWhereUniqueInputObjectSchema as FontWhereUniqueInputObjectSchema } from './objects/FontWhereUniqueInput.schema';
import { FontCountAggregateInputObjectSchema as FontCountAggregateInputObjectSchema } from './objects/FontCountAggregateInput.schema';

export const FontCountSchema: z.ZodType<Prisma.FontCountArgs> = z.object({ orderBy: z.union([FontOrderByWithRelationInputObjectSchema, FontOrderByWithRelationInputObjectSchema.array()]).optional(), where: FontWhereInputObjectSchema.optional(), cursor: FontWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), FontCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.FontCountArgs>;

export const FontCountZodSchema = z.object({ orderBy: z.union([FontOrderByWithRelationInputObjectSchema, FontOrderByWithRelationInputObjectSchema.array()]).optional(), where: FontWhereInputObjectSchema.optional(), cursor: FontWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), FontCountAggregateInputObjectSchema ]).optional() }).strict();
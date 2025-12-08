import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FontOrderByWithRelationInputObjectSchema as FontOrderByWithRelationInputObjectSchema } from './objects/FontOrderByWithRelationInput.schema';
import { FontWhereInputObjectSchema as FontWhereInputObjectSchema } from './objects/FontWhereInput.schema';
import { FontWhereUniqueInputObjectSchema as FontWhereUniqueInputObjectSchema } from './objects/FontWhereUniqueInput.schema';
import { FontCountAggregateInputObjectSchema as FontCountAggregateInputObjectSchema } from './objects/FontCountAggregateInput.schema';
import { FontMinAggregateInputObjectSchema as FontMinAggregateInputObjectSchema } from './objects/FontMinAggregateInput.schema';
import { FontMaxAggregateInputObjectSchema as FontMaxAggregateInputObjectSchema } from './objects/FontMaxAggregateInput.schema';

export const FontAggregateSchema: z.ZodType<Prisma.FontAggregateArgs> = z.object({ orderBy: z.union([FontOrderByWithRelationInputObjectSchema, FontOrderByWithRelationInputObjectSchema.array()]).optional(), where: FontWhereInputObjectSchema.optional(), cursor: FontWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), FontCountAggregateInputObjectSchema ]).optional(), _min: FontMinAggregateInputObjectSchema.optional(), _max: FontMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FontAggregateArgs>;

export const FontAggregateZodSchema = z.object({ orderBy: z.union([FontOrderByWithRelationInputObjectSchema, FontOrderByWithRelationInputObjectSchema.array()]).optional(), where: FontWhereInputObjectSchema.optional(), cursor: FontWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), FontCountAggregateInputObjectSchema ]).optional(), _min: FontMinAggregateInputObjectSchema.optional(), _max: FontMaxAggregateInputObjectSchema.optional() }).strict();
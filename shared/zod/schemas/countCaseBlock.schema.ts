import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseBlockOrderByWithRelationInputObjectSchema as CaseBlockOrderByWithRelationInputObjectSchema } from './objects/CaseBlockOrderByWithRelationInput.schema';
import { CaseBlockWhereInputObjectSchema as CaseBlockWhereInputObjectSchema } from './objects/CaseBlockWhereInput.schema';
import { CaseBlockWhereUniqueInputObjectSchema as CaseBlockWhereUniqueInputObjectSchema } from './objects/CaseBlockWhereUniqueInput.schema';
import { CaseBlockCountAggregateInputObjectSchema as CaseBlockCountAggregateInputObjectSchema } from './objects/CaseBlockCountAggregateInput.schema';

export const CaseBlockCountSchema: z.ZodType<Prisma.CaseBlockCountArgs> = z.object({ orderBy: z.union([CaseBlockOrderByWithRelationInputObjectSchema, CaseBlockOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseBlockWhereInputObjectSchema.optional(), cursor: CaseBlockWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CaseBlockCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.CaseBlockCountArgs>;

export const CaseBlockCountZodSchema = z.object({ orderBy: z.union([CaseBlockOrderByWithRelationInputObjectSchema, CaseBlockOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseBlockWhereInputObjectSchema.optional(), cursor: CaseBlockWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CaseBlockCountAggregateInputObjectSchema ]).optional() }).strict();
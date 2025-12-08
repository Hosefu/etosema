import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseBlockOrderByWithRelationInputObjectSchema as CaseBlockOrderByWithRelationInputObjectSchema } from './objects/CaseBlockOrderByWithRelationInput.schema';
import { CaseBlockWhereInputObjectSchema as CaseBlockWhereInputObjectSchema } from './objects/CaseBlockWhereInput.schema';
import { CaseBlockWhereUniqueInputObjectSchema as CaseBlockWhereUniqueInputObjectSchema } from './objects/CaseBlockWhereUniqueInput.schema';
import { CaseBlockCountAggregateInputObjectSchema as CaseBlockCountAggregateInputObjectSchema } from './objects/CaseBlockCountAggregateInput.schema';
import { CaseBlockMinAggregateInputObjectSchema as CaseBlockMinAggregateInputObjectSchema } from './objects/CaseBlockMinAggregateInput.schema';
import { CaseBlockMaxAggregateInputObjectSchema as CaseBlockMaxAggregateInputObjectSchema } from './objects/CaseBlockMaxAggregateInput.schema';

export const CaseBlockAggregateSchema: z.ZodType<Prisma.CaseBlockAggregateArgs> = z.object({ orderBy: z.union([CaseBlockOrderByWithRelationInputObjectSchema, CaseBlockOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseBlockWhereInputObjectSchema.optional(), cursor: CaseBlockWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), CaseBlockCountAggregateInputObjectSchema ]).optional(), _min: CaseBlockMinAggregateInputObjectSchema.optional(), _max: CaseBlockMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseBlockAggregateArgs>;

export const CaseBlockAggregateZodSchema = z.object({ orderBy: z.union([CaseBlockOrderByWithRelationInputObjectSchema, CaseBlockOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseBlockWhereInputObjectSchema.optional(), cursor: CaseBlockWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), CaseBlockCountAggregateInputObjectSchema ]).optional(), _min: CaseBlockMinAggregateInputObjectSchema.optional(), _max: CaseBlockMaxAggregateInputObjectSchema.optional() }).strict();
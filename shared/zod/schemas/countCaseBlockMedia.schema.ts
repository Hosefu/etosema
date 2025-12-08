import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseBlockMediaOrderByWithRelationInputObjectSchema as CaseBlockMediaOrderByWithRelationInputObjectSchema } from './objects/CaseBlockMediaOrderByWithRelationInput.schema';
import { CaseBlockMediaWhereInputObjectSchema as CaseBlockMediaWhereInputObjectSchema } from './objects/CaseBlockMediaWhereInput.schema';
import { CaseBlockMediaWhereUniqueInputObjectSchema as CaseBlockMediaWhereUniqueInputObjectSchema } from './objects/CaseBlockMediaWhereUniqueInput.schema';
import { CaseBlockMediaCountAggregateInputObjectSchema as CaseBlockMediaCountAggregateInputObjectSchema } from './objects/CaseBlockMediaCountAggregateInput.schema';

export const CaseBlockMediaCountSchema: z.ZodType<Prisma.CaseBlockMediaCountArgs> = z.object({ orderBy: z.union([CaseBlockMediaOrderByWithRelationInputObjectSchema, CaseBlockMediaOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseBlockMediaWhereInputObjectSchema.optional(), cursor: CaseBlockMediaWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CaseBlockMediaCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.CaseBlockMediaCountArgs>;

export const CaseBlockMediaCountZodSchema = z.object({ orderBy: z.union([CaseBlockMediaOrderByWithRelationInputObjectSchema, CaseBlockMediaOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseBlockMediaWhereInputObjectSchema.optional(), cursor: CaseBlockMediaWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CaseBlockMediaCountAggregateInputObjectSchema ]).optional() }).strict();
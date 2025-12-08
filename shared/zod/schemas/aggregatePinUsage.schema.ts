import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinUsageOrderByWithRelationInputObjectSchema as PinUsageOrderByWithRelationInputObjectSchema } from './objects/PinUsageOrderByWithRelationInput.schema';
import { PinUsageWhereInputObjectSchema as PinUsageWhereInputObjectSchema } from './objects/PinUsageWhereInput.schema';
import { PinUsageWhereUniqueInputObjectSchema as PinUsageWhereUniqueInputObjectSchema } from './objects/PinUsageWhereUniqueInput.schema';
import { PinUsageCountAggregateInputObjectSchema as PinUsageCountAggregateInputObjectSchema } from './objects/PinUsageCountAggregateInput.schema';
import { PinUsageMinAggregateInputObjectSchema as PinUsageMinAggregateInputObjectSchema } from './objects/PinUsageMinAggregateInput.schema';
import { PinUsageMaxAggregateInputObjectSchema as PinUsageMaxAggregateInputObjectSchema } from './objects/PinUsageMaxAggregateInput.schema';

export const PinUsageAggregateSchema: z.ZodType<Prisma.PinUsageAggregateArgs> = z.object({ orderBy: z.union([PinUsageOrderByWithRelationInputObjectSchema, PinUsageOrderByWithRelationInputObjectSchema.array()]).optional(), where: PinUsageWhereInputObjectSchema.optional(), cursor: PinUsageWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), PinUsageCountAggregateInputObjectSchema ]).optional(), _min: PinUsageMinAggregateInputObjectSchema.optional(), _max: PinUsageMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PinUsageAggregateArgs>;

export const PinUsageAggregateZodSchema = z.object({ orderBy: z.union([PinUsageOrderByWithRelationInputObjectSchema, PinUsageOrderByWithRelationInputObjectSchema.array()]).optional(), where: PinUsageWhereInputObjectSchema.optional(), cursor: PinUsageWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), PinUsageCountAggregateInputObjectSchema ]).optional(), _min: PinUsageMinAggregateInputObjectSchema.optional(), _max: PinUsageMaxAggregateInputObjectSchema.optional() }).strict();
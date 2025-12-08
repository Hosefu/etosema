import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinUsageOrderByWithRelationInputObjectSchema as PinUsageOrderByWithRelationInputObjectSchema } from './objects/PinUsageOrderByWithRelationInput.schema';
import { PinUsageWhereInputObjectSchema as PinUsageWhereInputObjectSchema } from './objects/PinUsageWhereInput.schema';
import { PinUsageWhereUniqueInputObjectSchema as PinUsageWhereUniqueInputObjectSchema } from './objects/PinUsageWhereUniqueInput.schema';
import { PinUsageCountAggregateInputObjectSchema as PinUsageCountAggregateInputObjectSchema } from './objects/PinUsageCountAggregateInput.schema';

export const PinUsageCountSchema: z.ZodType<Prisma.PinUsageCountArgs> = z.object({ orderBy: z.union([PinUsageOrderByWithRelationInputObjectSchema, PinUsageOrderByWithRelationInputObjectSchema.array()]).optional(), where: PinUsageWhereInputObjectSchema.optional(), cursor: PinUsageWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PinUsageCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.PinUsageCountArgs>;

export const PinUsageCountZodSchema = z.object({ orderBy: z.union([PinUsageOrderByWithRelationInputObjectSchema, PinUsageOrderByWithRelationInputObjectSchema.array()]).optional(), where: PinUsageWhereInputObjectSchema.optional(), cursor: PinUsageWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PinUsageCountAggregateInputObjectSchema ]).optional() }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinUsageWhereInputObjectSchema as PinUsageWhereInputObjectSchema } from './objects/PinUsageWhereInput.schema';
import { PinUsageOrderByWithAggregationInputObjectSchema as PinUsageOrderByWithAggregationInputObjectSchema } from './objects/PinUsageOrderByWithAggregationInput.schema';
import { PinUsageScalarWhereWithAggregatesInputObjectSchema as PinUsageScalarWhereWithAggregatesInputObjectSchema } from './objects/PinUsageScalarWhereWithAggregatesInput.schema';
import { PinUsageScalarFieldEnumSchema } from './enums/PinUsageScalarFieldEnum.schema';
import { PinUsageCountAggregateInputObjectSchema as PinUsageCountAggregateInputObjectSchema } from './objects/PinUsageCountAggregateInput.schema';
import { PinUsageMinAggregateInputObjectSchema as PinUsageMinAggregateInputObjectSchema } from './objects/PinUsageMinAggregateInput.schema';
import { PinUsageMaxAggregateInputObjectSchema as PinUsageMaxAggregateInputObjectSchema } from './objects/PinUsageMaxAggregateInput.schema';

export const PinUsageGroupBySchema: z.ZodType<Prisma.PinUsageGroupByArgs> = z.object({ where: PinUsageWhereInputObjectSchema.optional(), orderBy: z.union([PinUsageOrderByWithAggregationInputObjectSchema, PinUsageOrderByWithAggregationInputObjectSchema.array()]).optional(), having: PinUsageScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(PinUsageScalarFieldEnumSchema), _count: z.union([ z.literal(true), PinUsageCountAggregateInputObjectSchema ]).optional(), _min: PinUsageMinAggregateInputObjectSchema.optional(), _max: PinUsageMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PinUsageGroupByArgs>;

export const PinUsageGroupByZodSchema = z.object({ where: PinUsageWhereInputObjectSchema.optional(), orderBy: z.union([PinUsageOrderByWithAggregationInputObjectSchema, PinUsageOrderByWithAggregationInputObjectSchema.array()]).optional(), having: PinUsageScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(PinUsageScalarFieldEnumSchema), _count: z.union([ z.literal(true), PinUsageCountAggregateInputObjectSchema ]).optional(), _min: PinUsageMinAggregateInputObjectSchema.optional(), _max: PinUsageMaxAggregateInputObjectSchema.optional() }).strict();
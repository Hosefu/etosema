import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinCodeOrderByWithRelationInputObjectSchema as PinCodeOrderByWithRelationInputObjectSchema } from './objects/PinCodeOrderByWithRelationInput.schema';
import { PinCodeWhereInputObjectSchema as PinCodeWhereInputObjectSchema } from './objects/PinCodeWhereInput.schema';
import { PinCodeWhereUniqueInputObjectSchema as PinCodeWhereUniqueInputObjectSchema } from './objects/PinCodeWhereUniqueInput.schema';
import { PinCodeCountAggregateInputObjectSchema as PinCodeCountAggregateInputObjectSchema } from './objects/PinCodeCountAggregateInput.schema';
import { PinCodeMinAggregateInputObjectSchema as PinCodeMinAggregateInputObjectSchema } from './objects/PinCodeMinAggregateInput.schema';
import { PinCodeMaxAggregateInputObjectSchema as PinCodeMaxAggregateInputObjectSchema } from './objects/PinCodeMaxAggregateInput.schema';

export const PinCodeAggregateSchema: z.ZodType<Prisma.PinCodeAggregateArgs> = z.object({ orderBy: z.union([PinCodeOrderByWithRelationInputObjectSchema, PinCodeOrderByWithRelationInputObjectSchema.array()]).optional(), where: PinCodeWhereInputObjectSchema.optional(), cursor: PinCodeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), PinCodeCountAggregateInputObjectSchema ]).optional(), _min: PinCodeMinAggregateInputObjectSchema.optional(), _max: PinCodeMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PinCodeAggregateArgs>;

export const PinCodeAggregateZodSchema = z.object({ orderBy: z.union([PinCodeOrderByWithRelationInputObjectSchema, PinCodeOrderByWithRelationInputObjectSchema.array()]).optional(), where: PinCodeWhereInputObjectSchema.optional(), cursor: PinCodeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), PinCodeCountAggregateInputObjectSchema ]).optional(), _min: PinCodeMinAggregateInputObjectSchema.optional(), _max: PinCodeMaxAggregateInputObjectSchema.optional() }).strict();
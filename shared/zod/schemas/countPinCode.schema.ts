import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinCodeOrderByWithRelationInputObjectSchema as PinCodeOrderByWithRelationInputObjectSchema } from './objects/PinCodeOrderByWithRelationInput.schema';
import { PinCodeWhereInputObjectSchema as PinCodeWhereInputObjectSchema } from './objects/PinCodeWhereInput.schema';
import { PinCodeWhereUniqueInputObjectSchema as PinCodeWhereUniqueInputObjectSchema } from './objects/PinCodeWhereUniqueInput.schema';
import { PinCodeCountAggregateInputObjectSchema as PinCodeCountAggregateInputObjectSchema } from './objects/PinCodeCountAggregateInput.schema';

export const PinCodeCountSchema: z.ZodType<Prisma.PinCodeCountArgs> = z.object({ orderBy: z.union([PinCodeOrderByWithRelationInputObjectSchema, PinCodeOrderByWithRelationInputObjectSchema.array()]).optional(), where: PinCodeWhereInputObjectSchema.optional(), cursor: PinCodeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PinCodeCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.PinCodeCountArgs>;

export const PinCodeCountZodSchema = z.object({ orderBy: z.union([PinCodeOrderByWithRelationInputObjectSchema, PinCodeOrderByWithRelationInputObjectSchema.array()]).optional(), where: PinCodeWhereInputObjectSchema.optional(), cursor: PinCodeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PinCodeCountAggregateInputObjectSchema ]).optional() }).strict();
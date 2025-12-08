import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinCodeCaseOrderByWithRelationInputObjectSchema as PinCodeCaseOrderByWithRelationInputObjectSchema } from './objects/PinCodeCaseOrderByWithRelationInput.schema';
import { PinCodeCaseWhereInputObjectSchema as PinCodeCaseWhereInputObjectSchema } from './objects/PinCodeCaseWhereInput.schema';
import { PinCodeCaseWhereUniqueInputObjectSchema as PinCodeCaseWhereUniqueInputObjectSchema } from './objects/PinCodeCaseWhereUniqueInput.schema';
import { PinCodeCaseCountAggregateInputObjectSchema as PinCodeCaseCountAggregateInputObjectSchema } from './objects/PinCodeCaseCountAggregateInput.schema';

export const PinCodeCaseCountSchema: z.ZodType<Prisma.PinCodeCaseCountArgs> = z.object({ orderBy: z.union([PinCodeCaseOrderByWithRelationInputObjectSchema, PinCodeCaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: PinCodeCaseWhereInputObjectSchema.optional(), cursor: PinCodeCaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PinCodeCaseCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.PinCodeCaseCountArgs>;

export const PinCodeCaseCountZodSchema = z.object({ orderBy: z.union([PinCodeCaseOrderByWithRelationInputObjectSchema, PinCodeCaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: PinCodeCaseWhereInputObjectSchema.optional(), cursor: PinCodeCaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PinCodeCaseCountAggregateInputObjectSchema ]).optional() }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinCodeWhereInputObjectSchema as PinCodeWhereInputObjectSchema } from './objects/PinCodeWhereInput.schema';
import { PinCodeOrderByWithAggregationInputObjectSchema as PinCodeOrderByWithAggregationInputObjectSchema } from './objects/PinCodeOrderByWithAggregationInput.schema';
import { PinCodeScalarWhereWithAggregatesInputObjectSchema as PinCodeScalarWhereWithAggregatesInputObjectSchema } from './objects/PinCodeScalarWhereWithAggregatesInput.schema';
import { PinCodeScalarFieldEnumSchema } from './enums/PinCodeScalarFieldEnum.schema';
import { PinCodeCountAggregateInputObjectSchema as PinCodeCountAggregateInputObjectSchema } from './objects/PinCodeCountAggregateInput.schema';
import { PinCodeMinAggregateInputObjectSchema as PinCodeMinAggregateInputObjectSchema } from './objects/PinCodeMinAggregateInput.schema';
import { PinCodeMaxAggregateInputObjectSchema as PinCodeMaxAggregateInputObjectSchema } from './objects/PinCodeMaxAggregateInput.schema';

export const PinCodeGroupBySchema: z.ZodType<Prisma.PinCodeGroupByArgs> = z.object({ where: PinCodeWhereInputObjectSchema.optional(), orderBy: z.union([PinCodeOrderByWithAggregationInputObjectSchema, PinCodeOrderByWithAggregationInputObjectSchema.array()]).optional(), having: PinCodeScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(PinCodeScalarFieldEnumSchema), _count: z.union([ z.literal(true), PinCodeCountAggregateInputObjectSchema ]).optional(), _min: PinCodeMinAggregateInputObjectSchema.optional(), _max: PinCodeMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PinCodeGroupByArgs>;

export const PinCodeGroupByZodSchema = z.object({ where: PinCodeWhereInputObjectSchema.optional(), orderBy: z.union([PinCodeOrderByWithAggregationInputObjectSchema, PinCodeOrderByWithAggregationInputObjectSchema.array()]).optional(), having: PinCodeScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(PinCodeScalarFieldEnumSchema), _count: z.union([ z.literal(true), PinCodeCountAggregateInputObjectSchema ]).optional(), _min: PinCodeMinAggregateInputObjectSchema.optional(), _max: PinCodeMaxAggregateInputObjectSchema.optional() }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FontWhereInputObjectSchema as FontWhereInputObjectSchema } from './objects/FontWhereInput.schema';
import { FontOrderByWithAggregationInputObjectSchema as FontOrderByWithAggregationInputObjectSchema } from './objects/FontOrderByWithAggregationInput.schema';
import { FontScalarWhereWithAggregatesInputObjectSchema as FontScalarWhereWithAggregatesInputObjectSchema } from './objects/FontScalarWhereWithAggregatesInput.schema';
import { FontScalarFieldEnumSchema } from './enums/FontScalarFieldEnum.schema';
import { FontCountAggregateInputObjectSchema as FontCountAggregateInputObjectSchema } from './objects/FontCountAggregateInput.schema';
import { FontMinAggregateInputObjectSchema as FontMinAggregateInputObjectSchema } from './objects/FontMinAggregateInput.schema';
import { FontMaxAggregateInputObjectSchema as FontMaxAggregateInputObjectSchema } from './objects/FontMaxAggregateInput.schema';

export const FontGroupBySchema: z.ZodType<Prisma.FontGroupByArgs> = z.object({ where: FontWhereInputObjectSchema.optional(), orderBy: z.union([FontOrderByWithAggregationInputObjectSchema, FontOrderByWithAggregationInputObjectSchema.array()]).optional(), having: FontScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(FontScalarFieldEnumSchema), _count: z.union([ z.literal(true), FontCountAggregateInputObjectSchema ]).optional(), _min: FontMinAggregateInputObjectSchema.optional(), _max: FontMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FontGroupByArgs>;

export const FontGroupByZodSchema = z.object({ where: FontWhereInputObjectSchema.optional(), orderBy: z.union([FontOrderByWithAggregationInputObjectSchema, FontOrderByWithAggregationInputObjectSchema.array()]).optional(), having: FontScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(FontScalarFieldEnumSchema), _count: z.union([ z.literal(true), FontCountAggregateInputObjectSchema ]).optional(), _min: FontMinAggregateInputObjectSchema.optional(), _max: FontMaxAggregateInputObjectSchema.optional() }).strict();
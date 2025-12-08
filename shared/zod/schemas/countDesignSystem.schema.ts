import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DesignSystemOrderByWithRelationInputObjectSchema as DesignSystemOrderByWithRelationInputObjectSchema } from './objects/DesignSystemOrderByWithRelationInput.schema';
import { DesignSystemWhereInputObjectSchema as DesignSystemWhereInputObjectSchema } from './objects/DesignSystemWhereInput.schema';
import { DesignSystemWhereUniqueInputObjectSchema as DesignSystemWhereUniqueInputObjectSchema } from './objects/DesignSystemWhereUniqueInput.schema';
import { DesignSystemCountAggregateInputObjectSchema as DesignSystemCountAggregateInputObjectSchema } from './objects/DesignSystemCountAggregateInput.schema';

export const DesignSystemCountSchema: z.ZodType<Prisma.DesignSystemCountArgs> = z.object({ orderBy: z.union([DesignSystemOrderByWithRelationInputObjectSchema, DesignSystemOrderByWithRelationInputObjectSchema.array()]).optional(), where: DesignSystemWhereInputObjectSchema.optional(), cursor: DesignSystemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), DesignSystemCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.DesignSystemCountArgs>;

export const DesignSystemCountZodSchema = z.object({ orderBy: z.union([DesignSystemOrderByWithRelationInputObjectSchema, DesignSystemOrderByWithRelationInputObjectSchema.array()]).optional(), where: DesignSystemWhereInputObjectSchema.optional(), cursor: DesignSystemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), DesignSystemCountAggregateInputObjectSchema ]).optional() }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DesignSystemOrderByWithRelationInputObjectSchema as DesignSystemOrderByWithRelationInputObjectSchema } from './objects/DesignSystemOrderByWithRelationInput.schema';
import { DesignSystemWhereInputObjectSchema as DesignSystemWhereInputObjectSchema } from './objects/DesignSystemWhereInput.schema';
import { DesignSystemWhereUniqueInputObjectSchema as DesignSystemWhereUniqueInputObjectSchema } from './objects/DesignSystemWhereUniqueInput.schema';
import { DesignSystemScalarFieldEnumSchema } from './enums/DesignSystemScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const DesignSystemFindManySelectSchema: z.ZodType<Prisma.DesignSystemSelect> = z.object({
    id: z.boolean().optional(),
    typography: z.boolean().optional(),
    colors: z.boolean().optional(),
    links: z.boolean().optional(),
    cards: z.boolean().optional(),
    grid: z.boolean().optional(),
    spacing: z.boolean().optional(),
    faviconUrl: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.DesignSystemSelect>;

export const DesignSystemFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    typography: z.boolean().optional(),
    colors: z.boolean().optional(),
    links: z.boolean().optional(),
    cards: z.boolean().optional(),
    grid: z.boolean().optional(),
    spacing: z.boolean().optional(),
    faviconUrl: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const DesignSystemFindManySchema: z.ZodType<Prisma.DesignSystemFindManyArgs> = z.object({ select: DesignSystemFindManySelectSchema.optional(),  orderBy: z.union([DesignSystemOrderByWithRelationInputObjectSchema, DesignSystemOrderByWithRelationInputObjectSchema.array()]).optional(), where: DesignSystemWhereInputObjectSchema.optional(), cursor: DesignSystemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([DesignSystemScalarFieldEnumSchema, DesignSystemScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.DesignSystemFindManyArgs>;

export const DesignSystemFindManyZodSchema = z.object({ select: DesignSystemFindManySelectSchema.optional(),  orderBy: z.union([DesignSystemOrderByWithRelationInputObjectSchema, DesignSystemOrderByWithRelationInputObjectSchema.array()]).optional(), where: DesignSystemWhereInputObjectSchema.optional(), cursor: DesignSystemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([DesignSystemScalarFieldEnumSchema, DesignSystemScalarFieldEnumSchema.array()]).optional() }).strict();
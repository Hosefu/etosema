import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseIncludeObjectSchema as CaseIncludeObjectSchema } from './objects/CaseInclude.schema';
import { CaseOrderByWithRelationInputObjectSchema as CaseOrderByWithRelationInputObjectSchema } from './objects/CaseOrderByWithRelationInput.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './objects/CaseWhereInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './objects/CaseWhereUniqueInput.schema';
import { CaseScalarFieldEnumSchema } from './enums/CaseScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CaseFindFirstSelectSchema: z.ZodType<Prisma.CaseSelect> = z.object({
    id: z.boolean().optional(),
    slug: z.boolean().optional(),
    title: z.boolean().optional(),
    shortTitle: z.boolean().optional(),
    year: z.boolean().optional(),
    summary: z.boolean().optional(),
    isNda: z.boolean().optional(),
    orderRank: z.boolean().optional(),
    useCustomDesign: z.boolean().optional(),
    backgroundColor: z.boolean().optional(),
    textColor: z.boolean().optional(),
    fontFamily: z.boolean().optional(),
    settings: z.boolean().optional(),
    blocks: z.boolean().optional(),
    pinAccess: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CaseSelect>;

export const CaseFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    slug: z.boolean().optional(),
    title: z.boolean().optional(),
    shortTitle: z.boolean().optional(),
    year: z.boolean().optional(),
    summary: z.boolean().optional(),
    isNda: z.boolean().optional(),
    orderRank: z.boolean().optional(),
    useCustomDesign: z.boolean().optional(),
    backgroundColor: z.boolean().optional(),
    textColor: z.boolean().optional(),
    fontFamily: z.boolean().optional(),
    settings: z.boolean().optional(),
    blocks: z.boolean().optional(),
    pinAccess: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const CaseFindFirstSchema: z.ZodType<Prisma.CaseFindFirstArgs> = z.object({ select: CaseFindFirstSelectSchema.optional(), include: z.lazy(() => CaseIncludeObjectSchema.optional()), orderBy: z.union([CaseOrderByWithRelationInputObjectSchema, CaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseWhereInputObjectSchema.optional(), cursor: CaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseScalarFieldEnumSchema, CaseScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CaseFindFirstArgs>;

export const CaseFindFirstZodSchema = z.object({ select: CaseFindFirstSelectSchema.optional(), include: z.lazy(() => CaseIncludeObjectSchema.optional()), orderBy: z.union([CaseOrderByWithRelationInputObjectSchema, CaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseWhereInputObjectSchema.optional(), cursor: CaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseScalarFieldEnumSchema, CaseScalarFieldEnumSchema.array()]).optional() }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseBlockIncludeObjectSchema as CaseBlockIncludeObjectSchema } from './objects/CaseBlockInclude.schema';
import { CaseBlockOrderByWithRelationInputObjectSchema as CaseBlockOrderByWithRelationInputObjectSchema } from './objects/CaseBlockOrderByWithRelationInput.schema';
import { CaseBlockWhereInputObjectSchema as CaseBlockWhereInputObjectSchema } from './objects/CaseBlockWhereInput.schema';
import { CaseBlockWhereUniqueInputObjectSchema as CaseBlockWhereUniqueInputObjectSchema } from './objects/CaseBlockWhereUniqueInput.schema';
import { CaseBlockScalarFieldEnumSchema } from './enums/CaseBlockScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CaseBlockFindFirstSelectSchema: z.ZodType<Prisma.CaseBlockSelect> = z.object({
    id: z.boolean().optional(),
    caseId: z.boolean().optional(),
    case: z.boolean().optional(),
    type: z.boolean().optional(),
    content: z.boolean().optional(),
    settings: z.boolean().optional(),
    layout: z.boolean().optional(),
    orderRank: z.boolean().optional(),
    medias: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CaseBlockSelect>;

export const CaseBlockFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    caseId: z.boolean().optional(),
    case: z.boolean().optional(),
    type: z.boolean().optional(),
    content: z.boolean().optional(),
    settings: z.boolean().optional(),
    layout: z.boolean().optional(),
    orderRank: z.boolean().optional(),
    medias: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const CaseBlockFindFirstSchema: z.ZodType<Prisma.CaseBlockFindFirstArgs> = z.object({ select: CaseBlockFindFirstSelectSchema.optional(), include: z.lazy(() => CaseBlockIncludeObjectSchema.optional()), orderBy: z.union([CaseBlockOrderByWithRelationInputObjectSchema, CaseBlockOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseBlockWhereInputObjectSchema.optional(), cursor: CaseBlockWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseBlockScalarFieldEnumSchema, CaseBlockScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CaseBlockFindFirstArgs>;

export const CaseBlockFindFirstZodSchema = z.object({ select: CaseBlockFindFirstSelectSchema.optional(), include: z.lazy(() => CaseBlockIncludeObjectSchema.optional()), orderBy: z.union([CaseBlockOrderByWithRelationInputObjectSchema, CaseBlockOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseBlockWhereInputObjectSchema.optional(), cursor: CaseBlockWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseBlockScalarFieldEnumSchema, CaseBlockScalarFieldEnumSchema.array()]).optional() }).strict();
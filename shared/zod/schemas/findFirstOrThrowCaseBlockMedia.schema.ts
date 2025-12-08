import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseBlockMediaIncludeObjectSchema as CaseBlockMediaIncludeObjectSchema } from './objects/CaseBlockMediaInclude.schema';
import { CaseBlockMediaOrderByWithRelationInputObjectSchema as CaseBlockMediaOrderByWithRelationInputObjectSchema } from './objects/CaseBlockMediaOrderByWithRelationInput.schema';
import { CaseBlockMediaWhereInputObjectSchema as CaseBlockMediaWhereInputObjectSchema } from './objects/CaseBlockMediaWhereInput.schema';
import { CaseBlockMediaWhereUniqueInputObjectSchema as CaseBlockMediaWhereUniqueInputObjectSchema } from './objects/CaseBlockMediaWhereUniqueInput.schema';
import { CaseBlockMediaScalarFieldEnumSchema } from './enums/CaseBlockMediaScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CaseBlockMediaFindFirstOrThrowSelectSchema: z.ZodType<Prisma.CaseBlockMediaSelect> = z.object({
    id: z.boolean().optional(),
    blockId: z.boolean().optional(),
    block: z.boolean().optional(),
    position: z.boolean().optional(),
    type: z.boolean().optional(),
    url: z.boolean().optional(),
    alt: z.boolean().optional(),
    aspectRatio: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CaseBlockMediaSelect>;

export const CaseBlockMediaFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    blockId: z.boolean().optional(),
    block: z.boolean().optional(),
    position: z.boolean().optional(),
    type: z.boolean().optional(),
    url: z.boolean().optional(),
    alt: z.boolean().optional(),
    aspectRatio: z.boolean().optional()
  }).strict();

export const CaseBlockMediaFindFirstOrThrowSchema: z.ZodType<Prisma.CaseBlockMediaFindFirstOrThrowArgs> = z.object({ select: CaseBlockMediaFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => CaseBlockMediaIncludeObjectSchema.optional()), orderBy: z.union([CaseBlockMediaOrderByWithRelationInputObjectSchema, CaseBlockMediaOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseBlockMediaWhereInputObjectSchema.optional(), cursor: CaseBlockMediaWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseBlockMediaScalarFieldEnumSchema, CaseBlockMediaScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CaseBlockMediaFindFirstOrThrowArgs>;

export const CaseBlockMediaFindFirstOrThrowZodSchema = z.object({ select: CaseBlockMediaFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => CaseBlockMediaIncludeObjectSchema.optional()), orderBy: z.union([CaseBlockMediaOrderByWithRelationInputObjectSchema, CaseBlockMediaOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseBlockMediaWhereInputObjectSchema.optional(), cursor: CaseBlockMediaWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseBlockMediaScalarFieldEnumSchema, CaseBlockMediaScalarFieldEnumSchema.array()]).optional() }).strict();
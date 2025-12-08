import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinCodeIncludeObjectSchema as PinCodeIncludeObjectSchema } from './objects/PinCodeInclude.schema';
import { PinCodeOrderByWithRelationInputObjectSchema as PinCodeOrderByWithRelationInputObjectSchema } from './objects/PinCodeOrderByWithRelationInput.schema';
import { PinCodeWhereInputObjectSchema as PinCodeWhereInputObjectSchema } from './objects/PinCodeWhereInput.schema';
import { PinCodeWhereUniqueInputObjectSchema as PinCodeWhereUniqueInputObjectSchema } from './objects/PinCodeWhereUniqueInput.schema';
import { PinCodeScalarFieldEnumSchema } from './enums/PinCodeScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PinCodeFindFirstSelectSchema: z.ZodType<Prisma.PinCodeSelect> = z.object({
    id: z.boolean().optional(),
    label: z.boolean().optional(),
    codeHash: z.boolean().optional(),
    code: z.boolean().optional(),
    shortCode: z.boolean().optional(),
    accessAll: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    cases: z.boolean().optional(),
    usages: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PinCodeSelect>;

export const PinCodeFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    label: z.boolean().optional(),
    codeHash: z.boolean().optional(),
    code: z.boolean().optional(),
    shortCode: z.boolean().optional(),
    accessAll: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    cases: z.boolean().optional(),
    usages: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const PinCodeFindFirstSchema: z.ZodType<Prisma.PinCodeFindFirstArgs> = z.object({ select: PinCodeFindFirstSelectSchema.optional(), include: z.lazy(() => PinCodeIncludeObjectSchema.optional()), orderBy: z.union([PinCodeOrderByWithRelationInputObjectSchema, PinCodeOrderByWithRelationInputObjectSchema.array()]).optional(), where: PinCodeWhereInputObjectSchema.optional(), cursor: PinCodeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PinCodeScalarFieldEnumSchema, PinCodeScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PinCodeFindFirstArgs>;

export const PinCodeFindFirstZodSchema = z.object({ select: PinCodeFindFirstSelectSchema.optional(), include: z.lazy(() => PinCodeIncludeObjectSchema.optional()), orderBy: z.union([PinCodeOrderByWithRelationInputObjectSchema, PinCodeOrderByWithRelationInputObjectSchema.array()]).optional(), where: PinCodeWhereInputObjectSchema.optional(), cursor: PinCodeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PinCodeScalarFieldEnumSchema, PinCodeScalarFieldEnumSchema.array()]).optional() }).strict();
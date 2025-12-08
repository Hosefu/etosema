import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinCodeCaseIncludeObjectSchema as PinCodeCaseIncludeObjectSchema } from './objects/PinCodeCaseInclude.schema';
import { PinCodeCaseOrderByWithRelationInputObjectSchema as PinCodeCaseOrderByWithRelationInputObjectSchema } from './objects/PinCodeCaseOrderByWithRelationInput.schema';
import { PinCodeCaseWhereInputObjectSchema as PinCodeCaseWhereInputObjectSchema } from './objects/PinCodeCaseWhereInput.schema';
import { PinCodeCaseWhereUniqueInputObjectSchema as PinCodeCaseWhereUniqueInputObjectSchema } from './objects/PinCodeCaseWhereUniqueInput.schema';
import { PinCodeCaseScalarFieldEnumSchema } from './enums/PinCodeCaseScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PinCodeCaseFindManySelectSchema: z.ZodType<Prisma.PinCodeCaseSelect> = z.object({
    pinCodeId: z.boolean().optional(),
    caseId: z.boolean().optional(),
    pinCode: z.boolean().optional(),
    case: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PinCodeCaseSelect>;

export const PinCodeCaseFindManySelectZodSchema = z.object({
    pinCodeId: z.boolean().optional(),
    caseId: z.boolean().optional(),
    pinCode: z.boolean().optional(),
    case: z.boolean().optional()
  }).strict();

export const PinCodeCaseFindManySchema: z.ZodType<Prisma.PinCodeCaseFindManyArgs> = z.object({ select: PinCodeCaseFindManySelectSchema.optional(), include: z.lazy(() => PinCodeCaseIncludeObjectSchema.optional()), orderBy: z.union([PinCodeCaseOrderByWithRelationInputObjectSchema, PinCodeCaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: PinCodeCaseWhereInputObjectSchema.optional(), cursor: PinCodeCaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PinCodeCaseScalarFieldEnumSchema, PinCodeCaseScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PinCodeCaseFindManyArgs>;

export const PinCodeCaseFindManyZodSchema = z.object({ select: PinCodeCaseFindManySelectSchema.optional(), include: z.lazy(() => PinCodeCaseIncludeObjectSchema.optional()), orderBy: z.union([PinCodeCaseOrderByWithRelationInputObjectSchema, PinCodeCaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: PinCodeCaseWhereInputObjectSchema.optional(), cursor: PinCodeCaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PinCodeCaseScalarFieldEnumSchema, PinCodeCaseScalarFieldEnumSchema.array()]).optional() }).strict();
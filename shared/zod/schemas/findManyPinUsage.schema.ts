import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinUsageIncludeObjectSchema as PinUsageIncludeObjectSchema } from './objects/PinUsageInclude.schema';
import { PinUsageOrderByWithRelationInputObjectSchema as PinUsageOrderByWithRelationInputObjectSchema } from './objects/PinUsageOrderByWithRelationInput.schema';
import { PinUsageWhereInputObjectSchema as PinUsageWhereInputObjectSchema } from './objects/PinUsageWhereInput.schema';
import { PinUsageWhereUniqueInputObjectSchema as PinUsageWhereUniqueInputObjectSchema } from './objects/PinUsageWhereUniqueInput.schema';
import { PinUsageScalarFieldEnumSchema } from './enums/PinUsageScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PinUsageFindManySelectSchema: z.ZodType<Prisma.PinUsageSelect> = z.object({
    id: z.boolean().optional(),
    pinCodeId: z.boolean().optional(),
    pinCode: z.boolean().optional(),
    ip: z.boolean().optional(),
    userAgent: z.boolean().optional(),
    success: z.boolean().optional(),
    path: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PinUsageSelect>;

export const PinUsageFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    pinCodeId: z.boolean().optional(),
    pinCode: z.boolean().optional(),
    ip: z.boolean().optional(),
    userAgent: z.boolean().optional(),
    success: z.boolean().optional(),
    path: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const PinUsageFindManySchema: z.ZodType<Prisma.PinUsageFindManyArgs> = z.object({ select: PinUsageFindManySelectSchema.optional(), include: z.lazy(() => PinUsageIncludeObjectSchema.optional()), orderBy: z.union([PinUsageOrderByWithRelationInputObjectSchema, PinUsageOrderByWithRelationInputObjectSchema.array()]).optional(), where: PinUsageWhereInputObjectSchema.optional(), cursor: PinUsageWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PinUsageScalarFieldEnumSchema, PinUsageScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PinUsageFindManyArgs>;

export const PinUsageFindManyZodSchema = z.object({ select: PinUsageFindManySelectSchema.optional(), include: z.lazy(() => PinUsageIncludeObjectSchema.optional()), orderBy: z.union([PinUsageOrderByWithRelationInputObjectSchema, PinUsageOrderByWithRelationInputObjectSchema.array()]).optional(), where: PinUsageWhereInputObjectSchema.optional(), cursor: PinUsageWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PinUsageScalarFieldEnumSchema, PinUsageScalarFieldEnumSchema.array()]).optional() }).strict();
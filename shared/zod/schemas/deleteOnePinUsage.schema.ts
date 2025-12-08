import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinUsageSelectObjectSchema as PinUsageSelectObjectSchema } from './objects/PinUsageSelect.schema';
import { PinUsageIncludeObjectSchema as PinUsageIncludeObjectSchema } from './objects/PinUsageInclude.schema';
import { PinUsageWhereUniqueInputObjectSchema as PinUsageWhereUniqueInputObjectSchema } from './objects/PinUsageWhereUniqueInput.schema';

export const PinUsageDeleteOneSchema: z.ZodType<Prisma.PinUsageDeleteArgs> = z.object({ select: PinUsageSelectObjectSchema.optional(), include: PinUsageIncludeObjectSchema.optional(), where: PinUsageWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PinUsageDeleteArgs>;

export const PinUsageDeleteOneZodSchema = z.object({ select: PinUsageSelectObjectSchema.optional(), include: PinUsageIncludeObjectSchema.optional(), where: PinUsageWhereUniqueInputObjectSchema }).strict();
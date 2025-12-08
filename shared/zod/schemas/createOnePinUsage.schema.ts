import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinUsageSelectObjectSchema as PinUsageSelectObjectSchema } from './objects/PinUsageSelect.schema';
import { PinUsageIncludeObjectSchema as PinUsageIncludeObjectSchema } from './objects/PinUsageInclude.schema';
import { PinUsageCreateInputObjectSchema as PinUsageCreateInputObjectSchema } from './objects/PinUsageCreateInput.schema';
import { PinUsageUncheckedCreateInputObjectSchema as PinUsageUncheckedCreateInputObjectSchema } from './objects/PinUsageUncheckedCreateInput.schema';

export const PinUsageCreateOneSchema: z.ZodType<Prisma.PinUsageCreateArgs> = z.object({ select: PinUsageSelectObjectSchema.optional(), include: PinUsageIncludeObjectSchema.optional(), data: z.union([PinUsageCreateInputObjectSchema, PinUsageUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.PinUsageCreateArgs>;

export const PinUsageCreateOneZodSchema = z.object({ select: PinUsageSelectObjectSchema.optional(), include: PinUsageIncludeObjectSchema.optional(), data: z.union([PinUsageCreateInputObjectSchema, PinUsageUncheckedCreateInputObjectSchema]) }).strict();
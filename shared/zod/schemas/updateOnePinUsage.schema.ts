import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinUsageSelectObjectSchema as PinUsageSelectObjectSchema } from './objects/PinUsageSelect.schema';
import { PinUsageIncludeObjectSchema as PinUsageIncludeObjectSchema } from './objects/PinUsageInclude.schema';
import { PinUsageUpdateInputObjectSchema as PinUsageUpdateInputObjectSchema } from './objects/PinUsageUpdateInput.schema';
import { PinUsageUncheckedUpdateInputObjectSchema as PinUsageUncheckedUpdateInputObjectSchema } from './objects/PinUsageUncheckedUpdateInput.schema';
import { PinUsageWhereUniqueInputObjectSchema as PinUsageWhereUniqueInputObjectSchema } from './objects/PinUsageWhereUniqueInput.schema';

export const PinUsageUpdateOneSchema: z.ZodType<Prisma.PinUsageUpdateArgs> = z.object({ select: PinUsageSelectObjectSchema.optional(), include: PinUsageIncludeObjectSchema.optional(), data: z.union([PinUsageUpdateInputObjectSchema, PinUsageUncheckedUpdateInputObjectSchema]), where: PinUsageWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PinUsageUpdateArgs>;

export const PinUsageUpdateOneZodSchema = z.object({ select: PinUsageSelectObjectSchema.optional(), include: PinUsageIncludeObjectSchema.optional(), data: z.union([PinUsageUpdateInputObjectSchema, PinUsageUncheckedUpdateInputObjectSchema]), where: PinUsageWhereUniqueInputObjectSchema }).strict();
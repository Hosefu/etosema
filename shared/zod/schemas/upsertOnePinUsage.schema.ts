import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinUsageSelectObjectSchema as PinUsageSelectObjectSchema } from './objects/PinUsageSelect.schema';
import { PinUsageIncludeObjectSchema as PinUsageIncludeObjectSchema } from './objects/PinUsageInclude.schema';
import { PinUsageWhereUniqueInputObjectSchema as PinUsageWhereUniqueInputObjectSchema } from './objects/PinUsageWhereUniqueInput.schema';
import { PinUsageCreateInputObjectSchema as PinUsageCreateInputObjectSchema } from './objects/PinUsageCreateInput.schema';
import { PinUsageUncheckedCreateInputObjectSchema as PinUsageUncheckedCreateInputObjectSchema } from './objects/PinUsageUncheckedCreateInput.schema';
import { PinUsageUpdateInputObjectSchema as PinUsageUpdateInputObjectSchema } from './objects/PinUsageUpdateInput.schema';
import { PinUsageUncheckedUpdateInputObjectSchema as PinUsageUncheckedUpdateInputObjectSchema } from './objects/PinUsageUncheckedUpdateInput.schema';

export const PinUsageUpsertOneSchema: z.ZodType<Prisma.PinUsageUpsertArgs> = z.object({ select: PinUsageSelectObjectSchema.optional(), include: PinUsageIncludeObjectSchema.optional(), where: PinUsageWhereUniqueInputObjectSchema, create: z.union([ PinUsageCreateInputObjectSchema, PinUsageUncheckedCreateInputObjectSchema ]), update: z.union([ PinUsageUpdateInputObjectSchema, PinUsageUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.PinUsageUpsertArgs>;

export const PinUsageUpsertOneZodSchema = z.object({ select: PinUsageSelectObjectSchema.optional(), include: PinUsageIncludeObjectSchema.optional(), where: PinUsageWhereUniqueInputObjectSchema, create: z.union([ PinUsageCreateInputObjectSchema, PinUsageUncheckedCreateInputObjectSchema ]), update: z.union([ PinUsageUpdateInputObjectSchema, PinUsageUncheckedUpdateInputObjectSchema ]) }).strict();
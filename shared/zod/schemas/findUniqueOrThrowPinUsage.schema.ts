import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinUsageSelectObjectSchema as PinUsageSelectObjectSchema } from './objects/PinUsageSelect.schema';
import { PinUsageIncludeObjectSchema as PinUsageIncludeObjectSchema } from './objects/PinUsageInclude.schema';
import { PinUsageWhereUniqueInputObjectSchema as PinUsageWhereUniqueInputObjectSchema } from './objects/PinUsageWhereUniqueInput.schema';

export const PinUsageFindUniqueOrThrowSchema: z.ZodType<Prisma.PinUsageFindUniqueOrThrowArgs> = z.object({ select: PinUsageSelectObjectSchema.optional(), include: PinUsageIncludeObjectSchema.optional(), where: PinUsageWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PinUsageFindUniqueOrThrowArgs>;

export const PinUsageFindUniqueOrThrowZodSchema = z.object({ select: PinUsageSelectObjectSchema.optional(), include: PinUsageIncludeObjectSchema.optional(), where: PinUsageWhereUniqueInputObjectSchema }).strict();
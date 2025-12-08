import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinCodeSelectObjectSchema as PinCodeSelectObjectSchema } from './objects/PinCodeSelect.schema';
import { PinCodeIncludeObjectSchema as PinCodeIncludeObjectSchema } from './objects/PinCodeInclude.schema';
import { PinCodeCreateInputObjectSchema as PinCodeCreateInputObjectSchema } from './objects/PinCodeCreateInput.schema';
import { PinCodeUncheckedCreateInputObjectSchema as PinCodeUncheckedCreateInputObjectSchema } from './objects/PinCodeUncheckedCreateInput.schema';

export const PinCodeCreateOneSchema: z.ZodType<Prisma.PinCodeCreateArgs> = z.object({ select: PinCodeSelectObjectSchema.optional(), include: PinCodeIncludeObjectSchema.optional(), data: z.union([PinCodeCreateInputObjectSchema, PinCodeUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.PinCodeCreateArgs>;

export const PinCodeCreateOneZodSchema = z.object({ select: PinCodeSelectObjectSchema.optional(), include: PinCodeIncludeObjectSchema.optional(), data: z.union([PinCodeCreateInputObjectSchema, PinCodeUncheckedCreateInputObjectSchema]) }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinCodeCaseSelectObjectSchema as PinCodeCaseSelectObjectSchema } from './objects/PinCodeCaseSelect.schema';
import { PinCodeCaseIncludeObjectSchema as PinCodeCaseIncludeObjectSchema } from './objects/PinCodeCaseInclude.schema';
import { PinCodeCaseCreateInputObjectSchema as PinCodeCaseCreateInputObjectSchema } from './objects/PinCodeCaseCreateInput.schema';
import { PinCodeCaseUncheckedCreateInputObjectSchema as PinCodeCaseUncheckedCreateInputObjectSchema } from './objects/PinCodeCaseUncheckedCreateInput.schema';

export const PinCodeCaseCreateOneSchema: z.ZodType<Prisma.PinCodeCaseCreateArgs> = z.object({ select: PinCodeCaseSelectObjectSchema.optional(), include: PinCodeCaseIncludeObjectSchema.optional(), data: z.union([PinCodeCaseCreateInputObjectSchema, PinCodeCaseUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.PinCodeCaseCreateArgs>;

export const PinCodeCaseCreateOneZodSchema = z.object({ select: PinCodeCaseSelectObjectSchema.optional(), include: PinCodeCaseIncludeObjectSchema.optional(), data: z.union([PinCodeCaseCreateInputObjectSchema, PinCodeCaseUncheckedCreateInputObjectSchema]) }).strict();
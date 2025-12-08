import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinCodeCaseSelectObjectSchema as PinCodeCaseSelectObjectSchema } from './objects/PinCodeCaseSelect.schema';
import { PinCodeCaseIncludeObjectSchema as PinCodeCaseIncludeObjectSchema } from './objects/PinCodeCaseInclude.schema';
import { PinCodeCaseWhereUniqueInputObjectSchema as PinCodeCaseWhereUniqueInputObjectSchema } from './objects/PinCodeCaseWhereUniqueInput.schema';

export const PinCodeCaseFindUniqueSchema: z.ZodType<Prisma.PinCodeCaseFindUniqueArgs> = z.object({ select: PinCodeCaseSelectObjectSchema.optional(), include: PinCodeCaseIncludeObjectSchema.optional(), where: PinCodeCaseWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PinCodeCaseFindUniqueArgs>;

export const PinCodeCaseFindUniqueZodSchema = z.object({ select: PinCodeCaseSelectObjectSchema.optional(), include: PinCodeCaseIncludeObjectSchema.optional(), where: PinCodeCaseWhereUniqueInputObjectSchema }).strict();
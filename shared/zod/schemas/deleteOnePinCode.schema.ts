import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinCodeSelectObjectSchema as PinCodeSelectObjectSchema } from './objects/PinCodeSelect.schema';
import { PinCodeIncludeObjectSchema as PinCodeIncludeObjectSchema } from './objects/PinCodeInclude.schema';
import { PinCodeWhereUniqueInputObjectSchema as PinCodeWhereUniqueInputObjectSchema } from './objects/PinCodeWhereUniqueInput.schema';

export const PinCodeDeleteOneSchema: z.ZodType<Prisma.PinCodeDeleteArgs> = z.object({ select: PinCodeSelectObjectSchema.optional(), include: PinCodeIncludeObjectSchema.optional(), where: PinCodeWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PinCodeDeleteArgs>;

export const PinCodeDeleteOneZodSchema = z.object({ select: PinCodeSelectObjectSchema.optional(), include: PinCodeIncludeObjectSchema.optional(), where: PinCodeWhereUniqueInputObjectSchema }).strict();
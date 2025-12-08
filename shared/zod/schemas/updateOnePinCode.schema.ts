import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinCodeSelectObjectSchema as PinCodeSelectObjectSchema } from './objects/PinCodeSelect.schema';
import { PinCodeIncludeObjectSchema as PinCodeIncludeObjectSchema } from './objects/PinCodeInclude.schema';
import { PinCodeUpdateInputObjectSchema as PinCodeUpdateInputObjectSchema } from './objects/PinCodeUpdateInput.schema';
import { PinCodeUncheckedUpdateInputObjectSchema as PinCodeUncheckedUpdateInputObjectSchema } from './objects/PinCodeUncheckedUpdateInput.schema';
import { PinCodeWhereUniqueInputObjectSchema as PinCodeWhereUniqueInputObjectSchema } from './objects/PinCodeWhereUniqueInput.schema';

export const PinCodeUpdateOneSchema: z.ZodType<Prisma.PinCodeUpdateArgs> = z.object({ select: PinCodeSelectObjectSchema.optional(), include: PinCodeIncludeObjectSchema.optional(), data: z.union([PinCodeUpdateInputObjectSchema, PinCodeUncheckedUpdateInputObjectSchema]), where: PinCodeWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PinCodeUpdateArgs>;

export const PinCodeUpdateOneZodSchema = z.object({ select: PinCodeSelectObjectSchema.optional(), include: PinCodeIncludeObjectSchema.optional(), data: z.union([PinCodeUpdateInputObjectSchema, PinCodeUncheckedUpdateInputObjectSchema]), where: PinCodeWhereUniqueInputObjectSchema }).strict();
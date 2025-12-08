import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinCodeCaseSelectObjectSchema as PinCodeCaseSelectObjectSchema } from './objects/PinCodeCaseSelect.schema';
import { PinCodeCaseIncludeObjectSchema as PinCodeCaseIncludeObjectSchema } from './objects/PinCodeCaseInclude.schema';
import { PinCodeCaseUpdateInputObjectSchema as PinCodeCaseUpdateInputObjectSchema } from './objects/PinCodeCaseUpdateInput.schema';
import { PinCodeCaseUncheckedUpdateInputObjectSchema as PinCodeCaseUncheckedUpdateInputObjectSchema } from './objects/PinCodeCaseUncheckedUpdateInput.schema';
import { PinCodeCaseWhereUniqueInputObjectSchema as PinCodeCaseWhereUniqueInputObjectSchema } from './objects/PinCodeCaseWhereUniqueInput.schema';

export const PinCodeCaseUpdateOneSchema: z.ZodType<Prisma.PinCodeCaseUpdateArgs> = z.object({ select: PinCodeCaseSelectObjectSchema.optional(), include: PinCodeCaseIncludeObjectSchema.optional(), data: z.union([PinCodeCaseUpdateInputObjectSchema, PinCodeCaseUncheckedUpdateInputObjectSchema]), where: PinCodeCaseWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PinCodeCaseUpdateArgs>;

export const PinCodeCaseUpdateOneZodSchema = z.object({ select: PinCodeCaseSelectObjectSchema.optional(), include: PinCodeCaseIncludeObjectSchema.optional(), data: z.union([PinCodeCaseUpdateInputObjectSchema, PinCodeCaseUncheckedUpdateInputObjectSchema]), where: PinCodeCaseWhereUniqueInputObjectSchema }).strict();
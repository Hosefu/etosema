import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinCodeCaseSelectObjectSchema as PinCodeCaseSelectObjectSchema } from './objects/PinCodeCaseSelect.schema';
import { PinCodeCaseIncludeObjectSchema as PinCodeCaseIncludeObjectSchema } from './objects/PinCodeCaseInclude.schema';
import { PinCodeCaseWhereUniqueInputObjectSchema as PinCodeCaseWhereUniqueInputObjectSchema } from './objects/PinCodeCaseWhereUniqueInput.schema';
import { PinCodeCaseCreateInputObjectSchema as PinCodeCaseCreateInputObjectSchema } from './objects/PinCodeCaseCreateInput.schema';
import { PinCodeCaseUncheckedCreateInputObjectSchema as PinCodeCaseUncheckedCreateInputObjectSchema } from './objects/PinCodeCaseUncheckedCreateInput.schema';
import { PinCodeCaseUpdateInputObjectSchema as PinCodeCaseUpdateInputObjectSchema } from './objects/PinCodeCaseUpdateInput.schema';
import { PinCodeCaseUncheckedUpdateInputObjectSchema as PinCodeCaseUncheckedUpdateInputObjectSchema } from './objects/PinCodeCaseUncheckedUpdateInput.schema';

export const PinCodeCaseUpsertOneSchema: z.ZodType<Prisma.PinCodeCaseUpsertArgs> = z.object({ select: PinCodeCaseSelectObjectSchema.optional(), include: PinCodeCaseIncludeObjectSchema.optional(), where: PinCodeCaseWhereUniqueInputObjectSchema, create: z.union([ PinCodeCaseCreateInputObjectSchema, PinCodeCaseUncheckedCreateInputObjectSchema ]), update: z.union([ PinCodeCaseUpdateInputObjectSchema, PinCodeCaseUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.PinCodeCaseUpsertArgs>;

export const PinCodeCaseUpsertOneZodSchema = z.object({ select: PinCodeCaseSelectObjectSchema.optional(), include: PinCodeCaseIncludeObjectSchema.optional(), where: PinCodeCaseWhereUniqueInputObjectSchema, create: z.union([ PinCodeCaseCreateInputObjectSchema, PinCodeCaseUncheckedCreateInputObjectSchema ]), update: z.union([ PinCodeCaseUpdateInputObjectSchema, PinCodeCaseUncheckedUpdateInputObjectSchema ]) }).strict();
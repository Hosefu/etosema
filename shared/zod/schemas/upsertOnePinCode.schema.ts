import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinCodeSelectObjectSchema as PinCodeSelectObjectSchema } from './objects/PinCodeSelect.schema';
import { PinCodeIncludeObjectSchema as PinCodeIncludeObjectSchema } from './objects/PinCodeInclude.schema';
import { PinCodeWhereUniqueInputObjectSchema as PinCodeWhereUniqueInputObjectSchema } from './objects/PinCodeWhereUniqueInput.schema';
import { PinCodeCreateInputObjectSchema as PinCodeCreateInputObjectSchema } from './objects/PinCodeCreateInput.schema';
import { PinCodeUncheckedCreateInputObjectSchema as PinCodeUncheckedCreateInputObjectSchema } from './objects/PinCodeUncheckedCreateInput.schema';
import { PinCodeUpdateInputObjectSchema as PinCodeUpdateInputObjectSchema } from './objects/PinCodeUpdateInput.schema';
import { PinCodeUncheckedUpdateInputObjectSchema as PinCodeUncheckedUpdateInputObjectSchema } from './objects/PinCodeUncheckedUpdateInput.schema';

export const PinCodeUpsertOneSchema: z.ZodType<Prisma.PinCodeUpsertArgs> = z.object({ select: PinCodeSelectObjectSchema.optional(), include: PinCodeIncludeObjectSchema.optional(), where: PinCodeWhereUniqueInputObjectSchema, create: z.union([ PinCodeCreateInputObjectSchema, PinCodeUncheckedCreateInputObjectSchema ]), update: z.union([ PinCodeUpdateInputObjectSchema, PinCodeUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.PinCodeUpsertArgs>;

export const PinCodeUpsertOneZodSchema = z.object({ select: PinCodeSelectObjectSchema.optional(), include: PinCodeIncludeObjectSchema.optional(), where: PinCodeWhereUniqueInputObjectSchema, create: z.union([ PinCodeCreateInputObjectSchema, PinCodeUncheckedCreateInputObjectSchema ]), update: z.union([ PinCodeUpdateInputObjectSchema, PinCodeUncheckedUpdateInputObjectSchema ]) }).strict();
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeUpdateWithoutCasesInputObjectSchema as PinCodeUpdateWithoutCasesInputObjectSchema } from './PinCodeUpdateWithoutCasesInput.schema';
import { PinCodeUncheckedUpdateWithoutCasesInputObjectSchema as PinCodeUncheckedUpdateWithoutCasesInputObjectSchema } from './PinCodeUncheckedUpdateWithoutCasesInput.schema';
import { PinCodeCreateWithoutCasesInputObjectSchema as PinCodeCreateWithoutCasesInputObjectSchema } from './PinCodeCreateWithoutCasesInput.schema';
import { PinCodeUncheckedCreateWithoutCasesInputObjectSchema as PinCodeUncheckedCreateWithoutCasesInputObjectSchema } from './PinCodeUncheckedCreateWithoutCasesInput.schema';
import { PinCodeWhereInputObjectSchema as PinCodeWhereInputObjectSchema } from './PinCodeWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => PinCodeUpdateWithoutCasesInputObjectSchema), z.lazy(() => PinCodeUncheckedUpdateWithoutCasesInputObjectSchema)]),
  create: z.union([z.lazy(() => PinCodeCreateWithoutCasesInputObjectSchema), z.lazy(() => PinCodeUncheckedCreateWithoutCasesInputObjectSchema)]),
  where: z.lazy(() => PinCodeWhereInputObjectSchema).optional()
}).strict();
export const PinCodeUpsertWithoutCasesInputObjectSchema: z.ZodType<Prisma.PinCodeUpsertWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeUpsertWithoutCasesInput>;
export const PinCodeUpsertWithoutCasesInputObjectZodSchema = makeSchema();

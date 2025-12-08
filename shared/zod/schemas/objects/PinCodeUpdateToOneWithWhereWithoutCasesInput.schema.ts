import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeWhereInputObjectSchema as PinCodeWhereInputObjectSchema } from './PinCodeWhereInput.schema';
import { PinCodeUpdateWithoutCasesInputObjectSchema as PinCodeUpdateWithoutCasesInputObjectSchema } from './PinCodeUpdateWithoutCasesInput.schema';
import { PinCodeUncheckedUpdateWithoutCasesInputObjectSchema as PinCodeUncheckedUpdateWithoutCasesInputObjectSchema } from './PinCodeUncheckedUpdateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PinCodeWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => PinCodeUpdateWithoutCasesInputObjectSchema), z.lazy(() => PinCodeUncheckedUpdateWithoutCasesInputObjectSchema)])
}).strict();
export const PinCodeUpdateToOneWithWhereWithoutCasesInputObjectSchema: z.ZodType<Prisma.PinCodeUpdateToOneWithWhereWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeUpdateToOneWithWhereWithoutCasesInput>;
export const PinCodeUpdateToOneWithWhereWithoutCasesInputObjectZodSchema = makeSchema();

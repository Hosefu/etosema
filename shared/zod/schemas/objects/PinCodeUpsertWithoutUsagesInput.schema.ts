import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeUpdateWithoutUsagesInputObjectSchema as PinCodeUpdateWithoutUsagesInputObjectSchema } from './PinCodeUpdateWithoutUsagesInput.schema';
import { PinCodeUncheckedUpdateWithoutUsagesInputObjectSchema as PinCodeUncheckedUpdateWithoutUsagesInputObjectSchema } from './PinCodeUncheckedUpdateWithoutUsagesInput.schema';
import { PinCodeCreateWithoutUsagesInputObjectSchema as PinCodeCreateWithoutUsagesInputObjectSchema } from './PinCodeCreateWithoutUsagesInput.schema';
import { PinCodeUncheckedCreateWithoutUsagesInputObjectSchema as PinCodeUncheckedCreateWithoutUsagesInputObjectSchema } from './PinCodeUncheckedCreateWithoutUsagesInput.schema';
import { PinCodeWhereInputObjectSchema as PinCodeWhereInputObjectSchema } from './PinCodeWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => PinCodeUpdateWithoutUsagesInputObjectSchema), z.lazy(() => PinCodeUncheckedUpdateWithoutUsagesInputObjectSchema)]),
  create: z.union([z.lazy(() => PinCodeCreateWithoutUsagesInputObjectSchema), z.lazy(() => PinCodeUncheckedCreateWithoutUsagesInputObjectSchema)]),
  where: z.lazy(() => PinCodeWhereInputObjectSchema).optional()
}).strict();
export const PinCodeUpsertWithoutUsagesInputObjectSchema: z.ZodType<Prisma.PinCodeUpsertWithoutUsagesInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeUpsertWithoutUsagesInput>;
export const PinCodeUpsertWithoutUsagesInputObjectZodSchema = makeSchema();

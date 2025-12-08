import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeWhereInputObjectSchema as PinCodeWhereInputObjectSchema } from './PinCodeWhereInput.schema';
import { PinCodeUpdateWithoutUsagesInputObjectSchema as PinCodeUpdateWithoutUsagesInputObjectSchema } from './PinCodeUpdateWithoutUsagesInput.schema';
import { PinCodeUncheckedUpdateWithoutUsagesInputObjectSchema as PinCodeUncheckedUpdateWithoutUsagesInputObjectSchema } from './PinCodeUncheckedUpdateWithoutUsagesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PinCodeWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => PinCodeUpdateWithoutUsagesInputObjectSchema), z.lazy(() => PinCodeUncheckedUpdateWithoutUsagesInputObjectSchema)])
}).strict();
export const PinCodeUpdateToOneWithWhereWithoutUsagesInputObjectSchema: z.ZodType<Prisma.PinCodeUpdateToOneWithWhereWithoutUsagesInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeUpdateToOneWithWhereWithoutUsagesInput>;
export const PinCodeUpdateToOneWithWhereWithoutUsagesInputObjectZodSchema = makeSchema();

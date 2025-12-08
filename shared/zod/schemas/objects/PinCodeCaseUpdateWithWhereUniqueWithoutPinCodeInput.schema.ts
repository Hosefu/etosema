import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseWhereUniqueInputObjectSchema as PinCodeCaseWhereUniqueInputObjectSchema } from './PinCodeCaseWhereUniqueInput.schema';
import { PinCodeCaseUpdateWithoutPinCodeInputObjectSchema as PinCodeCaseUpdateWithoutPinCodeInputObjectSchema } from './PinCodeCaseUpdateWithoutPinCodeInput.schema';
import { PinCodeCaseUncheckedUpdateWithoutPinCodeInputObjectSchema as PinCodeCaseUncheckedUpdateWithoutPinCodeInputObjectSchema } from './PinCodeCaseUncheckedUpdateWithoutPinCodeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PinCodeCaseUpdateWithoutPinCodeInputObjectSchema), z.lazy(() => PinCodeCaseUncheckedUpdateWithoutPinCodeInputObjectSchema)])
}).strict();
export const PinCodeCaseUpdateWithWhereUniqueWithoutPinCodeInputObjectSchema: z.ZodType<Prisma.PinCodeCaseUpdateWithWhereUniqueWithoutPinCodeInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseUpdateWithWhereUniqueWithoutPinCodeInput>;
export const PinCodeCaseUpdateWithWhereUniqueWithoutPinCodeInputObjectZodSchema = makeSchema();

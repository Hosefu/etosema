import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseWhereUniqueInputObjectSchema as PinCodeCaseWhereUniqueInputObjectSchema } from './PinCodeCaseWhereUniqueInput.schema';
import { PinCodeCaseUpdateWithoutPinCodeInputObjectSchema as PinCodeCaseUpdateWithoutPinCodeInputObjectSchema } from './PinCodeCaseUpdateWithoutPinCodeInput.schema';
import { PinCodeCaseUncheckedUpdateWithoutPinCodeInputObjectSchema as PinCodeCaseUncheckedUpdateWithoutPinCodeInputObjectSchema } from './PinCodeCaseUncheckedUpdateWithoutPinCodeInput.schema';
import { PinCodeCaseCreateWithoutPinCodeInputObjectSchema as PinCodeCaseCreateWithoutPinCodeInputObjectSchema } from './PinCodeCaseCreateWithoutPinCodeInput.schema';
import { PinCodeCaseUncheckedCreateWithoutPinCodeInputObjectSchema as PinCodeCaseUncheckedCreateWithoutPinCodeInputObjectSchema } from './PinCodeCaseUncheckedCreateWithoutPinCodeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PinCodeCaseUpdateWithoutPinCodeInputObjectSchema), z.lazy(() => PinCodeCaseUncheckedUpdateWithoutPinCodeInputObjectSchema)]),
  create: z.union([z.lazy(() => PinCodeCaseCreateWithoutPinCodeInputObjectSchema), z.lazy(() => PinCodeCaseUncheckedCreateWithoutPinCodeInputObjectSchema)])
}).strict();
export const PinCodeCaseUpsertWithWhereUniqueWithoutPinCodeInputObjectSchema: z.ZodType<Prisma.PinCodeCaseUpsertWithWhereUniqueWithoutPinCodeInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseUpsertWithWhereUniqueWithoutPinCodeInput>;
export const PinCodeCaseUpsertWithWhereUniqueWithoutPinCodeInputObjectZodSchema = makeSchema();

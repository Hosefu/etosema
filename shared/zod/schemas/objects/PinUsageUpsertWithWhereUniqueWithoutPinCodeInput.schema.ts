import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinUsageWhereUniqueInputObjectSchema as PinUsageWhereUniqueInputObjectSchema } from './PinUsageWhereUniqueInput.schema';
import { PinUsageUpdateWithoutPinCodeInputObjectSchema as PinUsageUpdateWithoutPinCodeInputObjectSchema } from './PinUsageUpdateWithoutPinCodeInput.schema';
import { PinUsageUncheckedUpdateWithoutPinCodeInputObjectSchema as PinUsageUncheckedUpdateWithoutPinCodeInputObjectSchema } from './PinUsageUncheckedUpdateWithoutPinCodeInput.schema';
import { PinUsageCreateWithoutPinCodeInputObjectSchema as PinUsageCreateWithoutPinCodeInputObjectSchema } from './PinUsageCreateWithoutPinCodeInput.schema';
import { PinUsageUncheckedCreateWithoutPinCodeInputObjectSchema as PinUsageUncheckedCreateWithoutPinCodeInputObjectSchema } from './PinUsageUncheckedCreateWithoutPinCodeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PinUsageWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PinUsageUpdateWithoutPinCodeInputObjectSchema), z.lazy(() => PinUsageUncheckedUpdateWithoutPinCodeInputObjectSchema)]),
  create: z.union([z.lazy(() => PinUsageCreateWithoutPinCodeInputObjectSchema), z.lazy(() => PinUsageUncheckedCreateWithoutPinCodeInputObjectSchema)])
}).strict();
export const PinUsageUpsertWithWhereUniqueWithoutPinCodeInputObjectSchema: z.ZodType<Prisma.PinUsageUpsertWithWhereUniqueWithoutPinCodeInput> = makeSchema() as unknown as z.ZodType<Prisma.PinUsageUpsertWithWhereUniqueWithoutPinCodeInput>;
export const PinUsageUpsertWithWhereUniqueWithoutPinCodeInputObjectZodSchema = makeSchema();

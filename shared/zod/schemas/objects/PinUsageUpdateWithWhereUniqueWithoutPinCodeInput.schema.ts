import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinUsageWhereUniqueInputObjectSchema as PinUsageWhereUniqueInputObjectSchema } from './PinUsageWhereUniqueInput.schema';
import { PinUsageUpdateWithoutPinCodeInputObjectSchema as PinUsageUpdateWithoutPinCodeInputObjectSchema } from './PinUsageUpdateWithoutPinCodeInput.schema';
import { PinUsageUncheckedUpdateWithoutPinCodeInputObjectSchema as PinUsageUncheckedUpdateWithoutPinCodeInputObjectSchema } from './PinUsageUncheckedUpdateWithoutPinCodeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PinUsageWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PinUsageUpdateWithoutPinCodeInputObjectSchema), z.lazy(() => PinUsageUncheckedUpdateWithoutPinCodeInputObjectSchema)])
}).strict();
export const PinUsageUpdateWithWhereUniqueWithoutPinCodeInputObjectSchema: z.ZodType<Prisma.PinUsageUpdateWithWhereUniqueWithoutPinCodeInput> = makeSchema() as unknown as z.ZodType<Prisma.PinUsageUpdateWithWhereUniqueWithoutPinCodeInput>;
export const PinUsageUpdateWithWhereUniqueWithoutPinCodeInputObjectZodSchema = makeSchema();

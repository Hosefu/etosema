import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinUsageWhereUniqueInputObjectSchema as PinUsageWhereUniqueInputObjectSchema } from './PinUsageWhereUniqueInput.schema';
import { PinUsageCreateWithoutPinCodeInputObjectSchema as PinUsageCreateWithoutPinCodeInputObjectSchema } from './PinUsageCreateWithoutPinCodeInput.schema';
import { PinUsageUncheckedCreateWithoutPinCodeInputObjectSchema as PinUsageUncheckedCreateWithoutPinCodeInputObjectSchema } from './PinUsageUncheckedCreateWithoutPinCodeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PinUsageWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PinUsageCreateWithoutPinCodeInputObjectSchema), z.lazy(() => PinUsageUncheckedCreateWithoutPinCodeInputObjectSchema)])
}).strict();
export const PinUsageCreateOrConnectWithoutPinCodeInputObjectSchema: z.ZodType<Prisma.PinUsageCreateOrConnectWithoutPinCodeInput> = makeSchema() as unknown as z.ZodType<Prisma.PinUsageCreateOrConnectWithoutPinCodeInput>;
export const PinUsageCreateOrConnectWithoutPinCodeInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinUsageCreateWithoutPinCodeInputObjectSchema as PinUsageCreateWithoutPinCodeInputObjectSchema } from './PinUsageCreateWithoutPinCodeInput.schema';
import { PinUsageUncheckedCreateWithoutPinCodeInputObjectSchema as PinUsageUncheckedCreateWithoutPinCodeInputObjectSchema } from './PinUsageUncheckedCreateWithoutPinCodeInput.schema';
import { PinUsageCreateOrConnectWithoutPinCodeInputObjectSchema as PinUsageCreateOrConnectWithoutPinCodeInputObjectSchema } from './PinUsageCreateOrConnectWithoutPinCodeInput.schema';
import { PinUsageCreateManyPinCodeInputEnvelopeObjectSchema as PinUsageCreateManyPinCodeInputEnvelopeObjectSchema } from './PinUsageCreateManyPinCodeInputEnvelope.schema';
import { PinUsageWhereUniqueInputObjectSchema as PinUsageWhereUniqueInputObjectSchema } from './PinUsageWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PinUsageCreateWithoutPinCodeInputObjectSchema), z.lazy(() => PinUsageCreateWithoutPinCodeInputObjectSchema).array(), z.lazy(() => PinUsageUncheckedCreateWithoutPinCodeInputObjectSchema), z.lazy(() => PinUsageUncheckedCreateWithoutPinCodeInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PinUsageCreateOrConnectWithoutPinCodeInputObjectSchema), z.lazy(() => PinUsageCreateOrConnectWithoutPinCodeInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PinUsageCreateManyPinCodeInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PinUsageWhereUniqueInputObjectSchema), z.lazy(() => PinUsageWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PinUsageUncheckedCreateNestedManyWithoutPinCodeInputObjectSchema: z.ZodType<Prisma.PinUsageUncheckedCreateNestedManyWithoutPinCodeInput> = makeSchema() as unknown as z.ZodType<Prisma.PinUsageUncheckedCreateNestedManyWithoutPinCodeInput>;
export const PinUsageUncheckedCreateNestedManyWithoutPinCodeInputObjectZodSchema = makeSchema();

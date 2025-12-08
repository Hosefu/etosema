import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseCreateWithoutPinCodeInputObjectSchema as PinCodeCaseCreateWithoutPinCodeInputObjectSchema } from './PinCodeCaseCreateWithoutPinCodeInput.schema';
import { PinCodeCaseUncheckedCreateWithoutPinCodeInputObjectSchema as PinCodeCaseUncheckedCreateWithoutPinCodeInputObjectSchema } from './PinCodeCaseUncheckedCreateWithoutPinCodeInput.schema';
import { PinCodeCaseCreateOrConnectWithoutPinCodeInputObjectSchema as PinCodeCaseCreateOrConnectWithoutPinCodeInputObjectSchema } from './PinCodeCaseCreateOrConnectWithoutPinCodeInput.schema';
import { PinCodeCaseCreateManyPinCodeInputEnvelopeObjectSchema as PinCodeCaseCreateManyPinCodeInputEnvelopeObjectSchema } from './PinCodeCaseCreateManyPinCodeInputEnvelope.schema';
import { PinCodeCaseWhereUniqueInputObjectSchema as PinCodeCaseWhereUniqueInputObjectSchema } from './PinCodeCaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PinCodeCaseCreateWithoutPinCodeInputObjectSchema), z.lazy(() => PinCodeCaseCreateWithoutPinCodeInputObjectSchema).array(), z.lazy(() => PinCodeCaseUncheckedCreateWithoutPinCodeInputObjectSchema), z.lazy(() => PinCodeCaseUncheckedCreateWithoutPinCodeInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PinCodeCaseCreateOrConnectWithoutPinCodeInputObjectSchema), z.lazy(() => PinCodeCaseCreateOrConnectWithoutPinCodeInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PinCodeCaseCreateManyPinCodeInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema), z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PinCodeCaseUncheckedCreateNestedManyWithoutPinCodeInputObjectSchema: z.ZodType<Prisma.PinCodeCaseUncheckedCreateNestedManyWithoutPinCodeInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseUncheckedCreateNestedManyWithoutPinCodeInput>;
export const PinCodeCaseUncheckedCreateNestedManyWithoutPinCodeInputObjectZodSchema = makeSchema();

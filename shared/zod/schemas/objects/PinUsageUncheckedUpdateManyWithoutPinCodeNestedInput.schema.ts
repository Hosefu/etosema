import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinUsageCreateWithoutPinCodeInputObjectSchema as PinUsageCreateWithoutPinCodeInputObjectSchema } from './PinUsageCreateWithoutPinCodeInput.schema';
import { PinUsageUncheckedCreateWithoutPinCodeInputObjectSchema as PinUsageUncheckedCreateWithoutPinCodeInputObjectSchema } from './PinUsageUncheckedCreateWithoutPinCodeInput.schema';
import { PinUsageCreateOrConnectWithoutPinCodeInputObjectSchema as PinUsageCreateOrConnectWithoutPinCodeInputObjectSchema } from './PinUsageCreateOrConnectWithoutPinCodeInput.schema';
import { PinUsageUpsertWithWhereUniqueWithoutPinCodeInputObjectSchema as PinUsageUpsertWithWhereUniqueWithoutPinCodeInputObjectSchema } from './PinUsageUpsertWithWhereUniqueWithoutPinCodeInput.schema';
import { PinUsageCreateManyPinCodeInputEnvelopeObjectSchema as PinUsageCreateManyPinCodeInputEnvelopeObjectSchema } from './PinUsageCreateManyPinCodeInputEnvelope.schema';
import { PinUsageWhereUniqueInputObjectSchema as PinUsageWhereUniqueInputObjectSchema } from './PinUsageWhereUniqueInput.schema';
import { PinUsageUpdateWithWhereUniqueWithoutPinCodeInputObjectSchema as PinUsageUpdateWithWhereUniqueWithoutPinCodeInputObjectSchema } from './PinUsageUpdateWithWhereUniqueWithoutPinCodeInput.schema';
import { PinUsageUpdateManyWithWhereWithoutPinCodeInputObjectSchema as PinUsageUpdateManyWithWhereWithoutPinCodeInputObjectSchema } from './PinUsageUpdateManyWithWhereWithoutPinCodeInput.schema';
import { PinUsageScalarWhereInputObjectSchema as PinUsageScalarWhereInputObjectSchema } from './PinUsageScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PinUsageCreateWithoutPinCodeInputObjectSchema), z.lazy(() => PinUsageCreateWithoutPinCodeInputObjectSchema).array(), z.lazy(() => PinUsageUncheckedCreateWithoutPinCodeInputObjectSchema), z.lazy(() => PinUsageUncheckedCreateWithoutPinCodeInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PinUsageCreateOrConnectWithoutPinCodeInputObjectSchema), z.lazy(() => PinUsageCreateOrConnectWithoutPinCodeInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PinUsageUpsertWithWhereUniqueWithoutPinCodeInputObjectSchema), z.lazy(() => PinUsageUpsertWithWhereUniqueWithoutPinCodeInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PinUsageCreateManyPinCodeInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PinUsageWhereUniqueInputObjectSchema), z.lazy(() => PinUsageWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PinUsageWhereUniqueInputObjectSchema), z.lazy(() => PinUsageWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PinUsageWhereUniqueInputObjectSchema), z.lazy(() => PinUsageWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PinUsageWhereUniqueInputObjectSchema), z.lazy(() => PinUsageWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PinUsageUpdateWithWhereUniqueWithoutPinCodeInputObjectSchema), z.lazy(() => PinUsageUpdateWithWhereUniqueWithoutPinCodeInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PinUsageUpdateManyWithWhereWithoutPinCodeInputObjectSchema), z.lazy(() => PinUsageUpdateManyWithWhereWithoutPinCodeInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PinUsageScalarWhereInputObjectSchema), z.lazy(() => PinUsageScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PinUsageUncheckedUpdateManyWithoutPinCodeNestedInputObjectSchema: z.ZodType<Prisma.PinUsageUncheckedUpdateManyWithoutPinCodeNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PinUsageUncheckedUpdateManyWithoutPinCodeNestedInput>;
export const PinUsageUncheckedUpdateManyWithoutPinCodeNestedInputObjectZodSchema = makeSchema();

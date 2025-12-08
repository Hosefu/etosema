import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseCreateWithoutPinCodeInputObjectSchema as PinCodeCaseCreateWithoutPinCodeInputObjectSchema } from './PinCodeCaseCreateWithoutPinCodeInput.schema';
import { PinCodeCaseUncheckedCreateWithoutPinCodeInputObjectSchema as PinCodeCaseUncheckedCreateWithoutPinCodeInputObjectSchema } from './PinCodeCaseUncheckedCreateWithoutPinCodeInput.schema';
import { PinCodeCaseCreateOrConnectWithoutPinCodeInputObjectSchema as PinCodeCaseCreateOrConnectWithoutPinCodeInputObjectSchema } from './PinCodeCaseCreateOrConnectWithoutPinCodeInput.schema';
import { PinCodeCaseUpsertWithWhereUniqueWithoutPinCodeInputObjectSchema as PinCodeCaseUpsertWithWhereUniqueWithoutPinCodeInputObjectSchema } from './PinCodeCaseUpsertWithWhereUniqueWithoutPinCodeInput.schema';
import { PinCodeCaseCreateManyPinCodeInputEnvelopeObjectSchema as PinCodeCaseCreateManyPinCodeInputEnvelopeObjectSchema } from './PinCodeCaseCreateManyPinCodeInputEnvelope.schema';
import { PinCodeCaseWhereUniqueInputObjectSchema as PinCodeCaseWhereUniqueInputObjectSchema } from './PinCodeCaseWhereUniqueInput.schema';
import { PinCodeCaseUpdateWithWhereUniqueWithoutPinCodeInputObjectSchema as PinCodeCaseUpdateWithWhereUniqueWithoutPinCodeInputObjectSchema } from './PinCodeCaseUpdateWithWhereUniqueWithoutPinCodeInput.schema';
import { PinCodeCaseUpdateManyWithWhereWithoutPinCodeInputObjectSchema as PinCodeCaseUpdateManyWithWhereWithoutPinCodeInputObjectSchema } from './PinCodeCaseUpdateManyWithWhereWithoutPinCodeInput.schema';
import { PinCodeCaseScalarWhereInputObjectSchema as PinCodeCaseScalarWhereInputObjectSchema } from './PinCodeCaseScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PinCodeCaseCreateWithoutPinCodeInputObjectSchema), z.lazy(() => PinCodeCaseCreateWithoutPinCodeInputObjectSchema).array(), z.lazy(() => PinCodeCaseUncheckedCreateWithoutPinCodeInputObjectSchema), z.lazy(() => PinCodeCaseUncheckedCreateWithoutPinCodeInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PinCodeCaseCreateOrConnectWithoutPinCodeInputObjectSchema), z.lazy(() => PinCodeCaseCreateOrConnectWithoutPinCodeInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PinCodeCaseUpsertWithWhereUniqueWithoutPinCodeInputObjectSchema), z.lazy(() => PinCodeCaseUpsertWithWhereUniqueWithoutPinCodeInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PinCodeCaseCreateManyPinCodeInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema), z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema), z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema), z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema), z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PinCodeCaseUpdateWithWhereUniqueWithoutPinCodeInputObjectSchema), z.lazy(() => PinCodeCaseUpdateWithWhereUniqueWithoutPinCodeInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PinCodeCaseUpdateManyWithWhereWithoutPinCodeInputObjectSchema), z.lazy(() => PinCodeCaseUpdateManyWithWhereWithoutPinCodeInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PinCodeCaseScalarWhereInputObjectSchema), z.lazy(() => PinCodeCaseScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PinCodeCaseUncheckedUpdateManyWithoutPinCodeNestedInputObjectSchema: z.ZodType<Prisma.PinCodeCaseUncheckedUpdateManyWithoutPinCodeNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseUncheckedUpdateManyWithoutPinCodeNestedInput>;
export const PinCodeCaseUncheckedUpdateManyWithoutPinCodeNestedInputObjectZodSchema = makeSchema();

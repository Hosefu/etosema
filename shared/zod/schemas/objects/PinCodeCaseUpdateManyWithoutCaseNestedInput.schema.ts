import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseCreateWithoutCaseInputObjectSchema as PinCodeCaseCreateWithoutCaseInputObjectSchema } from './PinCodeCaseCreateWithoutCaseInput.schema';
import { PinCodeCaseUncheckedCreateWithoutCaseInputObjectSchema as PinCodeCaseUncheckedCreateWithoutCaseInputObjectSchema } from './PinCodeCaseUncheckedCreateWithoutCaseInput.schema';
import { PinCodeCaseCreateOrConnectWithoutCaseInputObjectSchema as PinCodeCaseCreateOrConnectWithoutCaseInputObjectSchema } from './PinCodeCaseCreateOrConnectWithoutCaseInput.schema';
import { PinCodeCaseUpsertWithWhereUniqueWithoutCaseInputObjectSchema as PinCodeCaseUpsertWithWhereUniqueWithoutCaseInputObjectSchema } from './PinCodeCaseUpsertWithWhereUniqueWithoutCaseInput.schema';
import { PinCodeCaseCreateManyCaseInputEnvelopeObjectSchema as PinCodeCaseCreateManyCaseInputEnvelopeObjectSchema } from './PinCodeCaseCreateManyCaseInputEnvelope.schema';
import { PinCodeCaseWhereUniqueInputObjectSchema as PinCodeCaseWhereUniqueInputObjectSchema } from './PinCodeCaseWhereUniqueInput.schema';
import { PinCodeCaseUpdateWithWhereUniqueWithoutCaseInputObjectSchema as PinCodeCaseUpdateWithWhereUniqueWithoutCaseInputObjectSchema } from './PinCodeCaseUpdateWithWhereUniqueWithoutCaseInput.schema';
import { PinCodeCaseUpdateManyWithWhereWithoutCaseInputObjectSchema as PinCodeCaseUpdateManyWithWhereWithoutCaseInputObjectSchema } from './PinCodeCaseUpdateManyWithWhereWithoutCaseInput.schema';
import { PinCodeCaseScalarWhereInputObjectSchema as PinCodeCaseScalarWhereInputObjectSchema } from './PinCodeCaseScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PinCodeCaseCreateWithoutCaseInputObjectSchema), z.lazy(() => PinCodeCaseCreateWithoutCaseInputObjectSchema).array(), z.lazy(() => PinCodeCaseUncheckedCreateWithoutCaseInputObjectSchema), z.lazy(() => PinCodeCaseUncheckedCreateWithoutCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PinCodeCaseCreateOrConnectWithoutCaseInputObjectSchema), z.lazy(() => PinCodeCaseCreateOrConnectWithoutCaseInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PinCodeCaseUpsertWithWhereUniqueWithoutCaseInputObjectSchema), z.lazy(() => PinCodeCaseUpsertWithWhereUniqueWithoutCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PinCodeCaseCreateManyCaseInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema), z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema), z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema), z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema), z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PinCodeCaseUpdateWithWhereUniqueWithoutCaseInputObjectSchema), z.lazy(() => PinCodeCaseUpdateWithWhereUniqueWithoutCaseInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PinCodeCaseUpdateManyWithWhereWithoutCaseInputObjectSchema), z.lazy(() => PinCodeCaseUpdateManyWithWhereWithoutCaseInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PinCodeCaseScalarWhereInputObjectSchema), z.lazy(() => PinCodeCaseScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PinCodeCaseUpdateManyWithoutCaseNestedInputObjectSchema: z.ZodType<Prisma.PinCodeCaseUpdateManyWithoutCaseNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseUpdateManyWithoutCaseNestedInput>;
export const PinCodeCaseUpdateManyWithoutCaseNestedInputObjectZodSchema = makeSchema();

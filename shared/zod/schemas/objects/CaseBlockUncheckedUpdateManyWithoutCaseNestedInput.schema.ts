import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockCreateWithoutCaseInputObjectSchema as CaseBlockCreateWithoutCaseInputObjectSchema } from './CaseBlockCreateWithoutCaseInput.schema';
import { CaseBlockUncheckedCreateWithoutCaseInputObjectSchema as CaseBlockUncheckedCreateWithoutCaseInputObjectSchema } from './CaseBlockUncheckedCreateWithoutCaseInput.schema';
import { CaseBlockCreateOrConnectWithoutCaseInputObjectSchema as CaseBlockCreateOrConnectWithoutCaseInputObjectSchema } from './CaseBlockCreateOrConnectWithoutCaseInput.schema';
import { CaseBlockUpsertWithWhereUniqueWithoutCaseInputObjectSchema as CaseBlockUpsertWithWhereUniqueWithoutCaseInputObjectSchema } from './CaseBlockUpsertWithWhereUniqueWithoutCaseInput.schema';
import { CaseBlockCreateManyCaseInputEnvelopeObjectSchema as CaseBlockCreateManyCaseInputEnvelopeObjectSchema } from './CaseBlockCreateManyCaseInputEnvelope.schema';
import { CaseBlockWhereUniqueInputObjectSchema as CaseBlockWhereUniqueInputObjectSchema } from './CaseBlockWhereUniqueInput.schema';
import { CaseBlockUpdateWithWhereUniqueWithoutCaseInputObjectSchema as CaseBlockUpdateWithWhereUniqueWithoutCaseInputObjectSchema } from './CaseBlockUpdateWithWhereUniqueWithoutCaseInput.schema';
import { CaseBlockUpdateManyWithWhereWithoutCaseInputObjectSchema as CaseBlockUpdateManyWithWhereWithoutCaseInputObjectSchema } from './CaseBlockUpdateManyWithWhereWithoutCaseInput.schema';
import { CaseBlockScalarWhereInputObjectSchema as CaseBlockScalarWhereInputObjectSchema } from './CaseBlockScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseBlockCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseBlockCreateWithoutCaseInputObjectSchema).array(), z.lazy(() => CaseBlockUncheckedCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseBlockUncheckedCreateWithoutCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseBlockCreateOrConnectWithoutCaseInputObjectSchema), z.lazy(() => CaseBlockCreateOrConnectWithoutCaseInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseBlockUpsertWithWhereUniqueWithoutCaseInputObjectSchema), z.lazy(() => CaseBlockUpsertWithWhereUniqueWithoutCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseBlockCreateManyCaseInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseBlockWhereUniqueInputObjectSchema), z.lazy(() => CaseBlockWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseBlockWhereUniqueInputObjectSchema), z.lazy(() => CaseBlockWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseBlockWhereUniqueInputObjectSchema), z.lazy(() => CaseBlockWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseBlockWhereUniqueInputObjectSchema), z.lazy(() => CaseBlockWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseBlockUpdateWithWhereUniqueWithoutCaseInputObjectSchema), z.lazy(() => CaseBlockUpdateWithWhereUniqueWithoutCaseInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseBlockUpdateManyWithWhereWithoutCaseInputObjectSchema), z.lazy(() => CaseBlockUpdateManyWithWhereWithoutCaseInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseBlockScalarWhereInputObjectSchema), z.lazy(() => CaseBlockScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseBlockUncheckedUpdateManyWithoutCaseNestedInputObjectSchema: z.ZodType<Prisma.CaseBlockUncheckedUpdateManyWithoutCaseNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockUncheckedUpdateManyWithoutCaseNestedInput>;
export const CaseBlockUncheckedUpdateManyWithoutCaseNestedInputObjectZodSchema = makeSchema();

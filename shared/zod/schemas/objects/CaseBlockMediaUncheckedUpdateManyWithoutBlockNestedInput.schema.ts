import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockMediaCreateWithoutBlockInputObjectSchema as CaseBlockMediaCreateWithoutBlockInputObjectSchema } from './CaseBlockMediaCreateWithoutBlockInput.schema';
import { CaseBlockMediaUncheckedCreateWithoutBlockInputObjectSchema as CaseBlockMediaUncheckedCreateWithoutBlockInputObjectSchema } from './CaseBlockMediaUncheckedCreateWithoutBlockInput.schema';
import { CaseBlockMediaCreateOrConnectWithoutBlockInputObjectSchema as CaseBlockMediaCreateOrConnectWithoutBlockInputObjectSchema } from './CaseBlockMediaCreateOrConnectWithoutBlockInput.schema';
import { CaseBlockMediaUpsertWithWhereUniqueWithoutBlockInputObjectSchema as CaseBlockMediaUpsertWithWhereUniqueWithoutBlockInputObjectSchema } from './CaseBlockMediaUpsertWithWhereUniqueWithoutBlockInput.schema';
import { CaseBlockMediaCreateManyBlockInputEnvelopeObjectSchema as CaseBlockMediaCreateManyBlockInputEnvelopeObjectSchema } from './CaseBlockMediaCreateManyBlockInputEnvelope.schema';
import { CaseBlockMediaWhereUniqueInputObjectSchema as CaseBlockMediaWhereUniqueInputObjectSchema } from './CaseBlockMediaWhereUniqueInput.schema';
import { CaseBlockMediaUpdateWithWhereUniqueWithoutBlockInputObjectSchema as CaseBlockMediaUpdateWithWhereUniqueWithoutBlockInputObjectSchema } from './CaseBlockMediaUpdateWithWhereUniqueWithoutBlockInput.schema';
import { CaseBlockMediaUpdateManyWithWhereWithoutBlockInputObjectSchema as CaseBlockMediaUpdateManyWithWhereWithoutBlockInputObjectSchema } from './CaseBlockMediaUpdateManyWithWhereWithoutBlockInput.schema';
import { CaseBlockMediaScalarWhereInputObjectSchema as CaseBlockMediaScalarWhereInputObjectSchema } from './CaseBlockMediaScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseBlockMediaCreateWithoutBlockInputObjectSchema), z.lazy(() => CaseBlockMediaCreateWithoutBlockInputObjectSchema).array(), z.lazy(() => CaseBlockMediaUncheckedCreateWithoutBlockInputObjectSchema), z.lazy(() => CaseBlockMediaUncheckedCreateWithoutBlockInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseBlockMediaCreateOrConnectWithoutBlockInputObjectSchema), z.lazy(() => CaseBlockMediaCreateOrConnectWithoutBlockInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseBlockMediaUpsertWithWhereUniqueWithoutBlockInputObjectSchema), z.lazy(() => CaseBlockMediaUpsertWithWhereUniqueWithoutBlockInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseBlockMediaCreateManyBlockInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseBlockMediaWhereUniqueInputObjectSchema), z.lazy(() => CaseBlockMediaWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseBlockMediaWhereUniqueInputObjectSchema), z.lazy(() => CaseBlockMediaWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseBlockMediaWhereUniqueInputObjectSchema), z.lazy(() => CaseBlockMediaWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseBlockMediaWhereUniqueInputObjectSchema), z.lazy(() => CaseBlockMediaWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseBlockMediaUpdateWithWhereUniqueWithoutBlockInputObjectSchema), z.lazy(() => CaseBlockMediaUpdateWithWhereUniqueWithoutBlockInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseBlockMediaUpdateManyWithWhereWithoutBlockInputObjectSchema), z.lazy(() => CaseBlockMediaUpdateManyWithWhereWithoutBlockInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseBlockMediaScalarWhereInputObjectSchema), z.lazy(() => CaseBlockMediaScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseBlockMediaUncheckedUpdateManyWithoutBlockNestedInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaUncheckedUpdateManyWithoutBlockNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaUncheckedUpdateManyWithoutBlockNestedInput>;
export const CaseBlockMediaUncheckedUpdateManyWithoutBlockNestedInputObjectZodSchema = makeSchema();

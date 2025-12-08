import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockCreateWithoutCaseInputObjectSchema as CaseBlockCreateWithoutCaseInputObjectSchema } from './CaseBlockCreateWithoutCaseInput.schema';
import { CaseBlockUncheckedCreateWithoutCaseInputObjectSchema as CaseBlockUncheckedCreateWithoutCaseInputObjectSchema } from './CaseBlockUncheckedCreateWithoutCaseInput.schema';
import { CaseBlockCreateOrConnectWithoutCaseInputObjectSchema as CaseBlockCreateOrConnectWithoutCaseInputObjectSchema } from './CaseBlockCreateOrConnectWithoutCaseInput.schema';
import { CaseBlockCreateManyCaseInputEnvelopeObjectSchema as CaseBlockCreateManyCaseInputEnvelopeObjectSchema } from './CaseBlockCreateManyCaseInputEnvelope.schema';
import { CaseBlockWhereUniqueInputObjectSchema as CaseBlockWhereUniqueInputObjectSchema } from './CaseBlockWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseBlockCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseBlockCreateWithoutCaseInputObjectSchema).array(), z.lazy(() => CaseBlockUncheckedCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseBlockUncheckedCreateWithoutCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseBlockCreateOrConnectWithoutCaseInputObjectSchema), z.lazy(() => CaseBlockCreateOrConnectWithoutCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseBlockCreateManyCaseInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseBlockWhereUniqueInputObjectSchema), z.lazy(() => CaseBlockWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseBlockCreateNestedManyWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseBlockCreateNestedManyWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockCreateNestedManyWithoutCaseInput>;
export const CaseBlockCreateNestedManyWithoutCaseInputObjectZodSchema = makeSchema();

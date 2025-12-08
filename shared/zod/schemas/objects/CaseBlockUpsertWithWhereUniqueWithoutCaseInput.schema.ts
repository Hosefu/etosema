import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockWhereUniqueInputObjectSchema as CaseBlockWhereUniqueInputObjectSchema } from './CaseBlockWhereUniqueInput.schema';
import { CaseBlockUpdateWithoutCaseInputObjectSchema as CaseBlockUpdateWithoutCaseInputObjectSchema } from './CaseBlockUpdateWithoutCaseInput.schema';
import { CaseBlockUncheckedUpdateWithoutCaseInputObjectSchema as CaseBlockUncheckedUpdateWithoutCaseInputObjectSchema } from './CaseBlockUncheckedUpdateWithoutCaseInput.schema';
import { CaseBlockCreateWithoutCaseInputObjectSchema as CaseBlockCreateWithoutCaseInputObjectSchema } from './CaseBlockCreateWithoutCaseInput.schema';
import { CaseBlockUncheckedCreateWithoutCaseInputObjectSchema as CaseBlockUncheckedCreateWithoutCaseInputObjectSchema } from './CaseBlockUncheckedCreateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseBlockWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseBlockUpdateWithoutCaseInputObjectSchema), z.lazy(() => CaseBlockUncheckedUpdateWithoutCaseInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseBlockCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseBlockUncheckedCreateWithoutCaseInputObjectSchema)])
}).strict();
export const CaseBlockUpsertWithWhereUniqueWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseBlockUpsertWithWhereUniqueWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockUpsertWithWhereUniqueWithoutCaseInput>;
export const CaseBlockUpsertWithWhereUniqueWithoutCaseInputObjectZodSchema = makeSchema();

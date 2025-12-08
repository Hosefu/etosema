import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockWhereUniqueInputObjectSchema as CaseBlockWhereUniqueInputObjectSchema } from './CaseBlockWhereUniqueInput.schema';
import { CaseBlockUpdateWithoutCaseInputObjectSchema as CaseBlockUpdateWithoutCaseInputObjectSchema } from './CaseBlockUpdateWithoutCaseInput.schema';
import { CaseBlockUncheckedUpdateWithoutCaseInputObjectSchema as CaseBlockUncheckedUpdateWithoutCaseInputObjectSchema } from './CaseBlockUncheckedUpdateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseBlockWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseBlockUpdateWithoutCaseInputObjectSchema), z.lazy(() => CaseBlockUncheckedUpdateWithoutCaseInputObjectSchema)])
}).strict();
export const CaseBlockUpdateWithWhereUniqueWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseBlockUpdateWithWhereUniqueWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockUpdateWithWhereUniqueWithoutCaseInput>;
export const CaseBlockUpdateWithWhereUniqueWithoutCaseInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockScalarWhereInputObjectSchema as CaseBlockScalarWhereInputObjectSchema } from './CaseBlockScalarWhereInput.schema';
import { CaseBlockUpdateManyMutationInputObjectSchema as CaseBlockUpdateManyMutationInputObjectSchema } from './CaseBlockUpdateManyMutationInput.schema';
import { CaseBlockUncheckedUpdateManyWithoutCaseInputObjectSchema as CaseBlockUncheckedUpdateManyWithoutCaseInputObjectSchema } from './CaseBlockUncheckedUpdateManyWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseBlockScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseBlockUpdateManyMutationInputObjectSchema), z.lazy(() => CaseBlockUncheckedUpdateManyWithoutCaseInputObjectSchema)])
}).strict();
export const CaseBlockUpdateManyWithWhereWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseBlockUpdateManyWithWhereWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockUpdateManyWithWhereWithoutCaseInput>;
export const CaseBlockUpdateManyWithWhereWithoutCaseInputObjectZodSchema = makeSchema();

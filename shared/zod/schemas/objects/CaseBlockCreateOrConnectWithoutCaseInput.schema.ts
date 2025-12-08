import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockWhereUniqueInputObjectSchema as CaseBlockWhereUniqueInputObjectSchema } from './CaseBlockWhereUniqueInput.schema';
import { CaseBlockCreateWithoutCaseInputObjectSchema as CaseBlockCreateWithoutCaseInputObjectSchema } from './CaseBlockCreateWithoutCaseInput.schema';
import { CaseBlockUncheckedCreateWithoutCaseInputObjectSchema as CaseBlockUncheckedCreateWithoutCaseInputObjectSchema } from './CaseBlockUncheckedCreateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseBlockWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseBlockCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseBlockUncheckedCreateWithoutCaseInputObjectSchema)])
}).strict();
export const CaseBlockCreateOrConnectWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseBlockCreateOrConnectWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockCreateOrConnectWithoutCaseInput>;
export const CaseBlockCreateOrConnectWithoutCaseInputObjectZodSchema = makeSchema();

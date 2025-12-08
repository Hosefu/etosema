import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockUpdateWithoutMediasInputObjectSchema as CaseBlockUpdateWithoutMediasInputObjectSchema } from './CaseBlockUpdateWithoutMediasInput.schema';
import { CaseBlockUncheckedUpdateWithoutMediasInputObjectSchema as CaseBlockUncheckedUpdateWithoutMediasInputObjectSchema } from './CaseBlockUncheckedUpdateWithoutMediasInput.schema';
import { CaseBlockCreateWithoutMediasInputObjectSchema as CaseBlockCreateWithoutMediasInputObjectSchema } from './CaseBlockCreateWithoutMediasInput.schema';
import { CaseBlockUncheckedCreateWithoutMediasInputObjectSchema as CaseBlockUncheckedCreateWithoutMediasInputObjectSchema } from './CaseBlockUncheckedCreateWithoutMediasInput.schema';
import { CaseBlockWhereInputObjectSchema as CaseBlockWhereInputObjectSchema } from './CaseBlockWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CaseBlockUpdateWithoutMediasInputObjectSchema), z.lazy(() => CaseBlockUncheckedUpdateWithoutMediasInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseBlockCreateWithoutMediasInputObjectSchema), z.lazy(() => CaseBlockUncheckedCreateWithoutMediasInputObjectSchema)]),
  where: z.lazy(() => CaseBlockWhereInputObjectSchema).optional()
}).strict();
export const CaseBlockUpsertWithoutMediasInputObjectSchema: z.ZodType<Prisma.CaseBlockUpsertWithoutMediasInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockUpsertWithoutMediasInput>;
export const CaseBlockUpsertWithoutMediasInputObjectZodSchema = makeSchema();

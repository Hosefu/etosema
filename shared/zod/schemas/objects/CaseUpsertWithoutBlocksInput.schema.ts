import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseUpdateWithoutBlocksInputObjectSchema as CaseUpdateWithoutBlocksInputObjectSchema } from './CaseUpdateWithoutBlocksInput.schema';
import { CaseUncheckedUpdateWithoutBlocksInputObjectSchema as CaseUncheckedUpdateWithoutBlocksInputObjectSchema } from './CaseUncheckedUpdateWithoutBlocksInput.schema';
import { CaseCreateWithoutBlocksInputObjectSchema as CaseCreateWithoutBlocksInputObjectSchema } from './CaseCreateWithoutBlocksInput.schema';
import { CaseUncheckedCreateWithoutBlocksInputObjectSchema as CaseUncheckedCreateWithoutBlocksInputObjectSchema } from './CaseUncheckedCreateWithoutBlocksInput.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CaseUpdateWithoutBlocksInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutBlocksInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseCreateWithoutBlocksInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutBlocksInputObjectSchema)]),
  where: z.lazy(() => CaseWhereInputObjectSchema).optional()
}).strict();
export const CaseUpsertWithoutBlocksInputObjectSchema: z.ZodType<Prisma.CaseUpsertWithoutBlocksInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpsertWithoutBlocksInput>;
export const CaseUpsertWithoutBlocksInputObjectZodSchema = makeSchema();

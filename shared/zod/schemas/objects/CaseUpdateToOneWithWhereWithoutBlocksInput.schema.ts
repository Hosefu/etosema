import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema';
import { CaseUpdateWithoutBlocksInputObjectSchema as CaseUpdateWithoutBlocksInputObjectSchema } from './CaseUpdateWithoutBlocksInput.schema';
import { CaseUncheckedUpdateWithoutBlocksInputObjectSchema as CaseUncheckedUpdateWithoutBlocksInputObjectSchema } from './CaseUncheckedUpdateWithoutBlocksInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CaseUpdateWithoutBlocksInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutBlocksInputObjectSchema)])
}).strict();
export const CaseUpdateToOneWithWhereWithoutBlocksInputObjectSchema: z.ZodType<Prisma.CaseUpdateToOneWithWhereWithoutBlocksInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateToOneWithWhereWithoutBlocksInput>;
export const CaseUpdateToOneWithWhereWithoutBlocksInputObjectZodSchema = makeSchema();

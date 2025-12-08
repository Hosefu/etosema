import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockWhereInputObjectSchema as CaseBlockWhereInputObjectSchema } from './CaseBlockWhereInput.schema';
import { CaseBlockUpdateWithoutMediasInputObjectSchema as CaseBlockUpdateWithoutMediasInputObjectSchema } from './CaseBlockUpdateWithoutMediasInput.schema';
import { CaseBlockUncheckedUpdateWithoutMediasInputObjectSchema as CaseBlockUncheckedUpdateWithoutMediasInputObjectSchema } from './CaseBlockUncheckedUpdateWithoutMediasInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseBlockWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CaseBlockUpdateWithoutMediasInputObjectSchema), z.lazy(() => CaseBlockUncheckedUpdateWithoutMediasInputObjectSchema)])
}).strict();
export const CaseBlockUpdateToOneWithWhereWithoutMediasInputObjectSchema: z.ZodType<Prisma.CaseBlockUpdateToOneWithWhereWithoutMediasInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockUpdateToOneWithWhereWithoutMediasInput>;
export const CaseBlockUpdateToOneWithWhereWithoutMediasInputObjectZodSchema = makeSchema();

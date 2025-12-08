import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema';
import { CaseUpdateWithoutPinAccessInputObjectSchema as CaseUpdateWithoutPinAccessInputObjectSchema } from './CaseUpdateWithoutPinAccessInput.schema';
import { CaseUncheckedUpdateWithoutPinAccessInputObjectSchema as CaseUncheckedUpdateWithoutPinAccessInputObjectSchema } from './CaseUncheckedUpdateWithoutPinAccessInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CaseUpdateWithoutPinAccessInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutPinAccessInputObjectSchema)])
}).strict();
export const CaseUpdateToOneWithWhereWithoutPinAccessInputObjectSchema: z.ZodType<Prisma.CaseUpdateToOneWithWhereWithoutPinAccessInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateToOneWithWhereWithoutPinAccessInput>;
export const CaseUpdateToOneWithWhereWithoutPinAccessInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseUpdateWithoutPinAccessInputObjectSchema as CaseUpdateWithoutPinAccessInputObjectSchema } from './CaseUpdateWithoutPinAccessInput.schema';
import { CaseUncheckedUpdateWithoutPinAccessInputObjectSchema as CaseUncheckedUpdateWithoutPinAccessInputObjectSchema } from './CaseUncheckedUpdateWithoutPinAccessInput.schema';
import { CaseCreateWithoutPinAccessInputObjectSchema as CaseCreateWithoutPinAccessInputObjectSchema } from './CaseCreateWithoutPinAccessInput.schema';
import { CaseUncheckedCreateWithoutPinAccessInputObjectSchema as CaseUncheckedCreateWithoutPinAccessInputObjectSchema } from './CaseUncheckedCreateWithoutPinAccessInput.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CaseUpdateWithoutPinAccessInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutPinAccessInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseCreateWithoutPinAccessInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutPinAccessInputObjectSchema)]),
  where: z.lazy(() => CaseWhereInputObjectSchema).optional()
}).strict();
export const CaseUpsertWithoutPinAccessInputObjectSchema: z.ZodType<Prisma.CaseUpsertWithoutPinAccessInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpsertWithoutPinAccessInput>;
export const CaseUpsertWithoutPinAccessInputObjectZodSchema = makeSchema();

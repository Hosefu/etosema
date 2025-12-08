import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseCreateWithoutPinAccessInputObjectSchema as CaseCreateWithoutPinAccessInputObjectSchema } from './CaseCreateWithoutPinAccessInput.schema';
import { CaseUncheckedCreateWithoutPinAccessInputObjectSchema as CaseUncheckedCreateWithoutPinAccessInputObjectSchema } from './CaseUncheckedCreateWithoutPinAccessInput.schema';
import { CaseCreateOrConnectWithoutPinAccessInputObjectSchema as CaseCreateOrConnectWithoutPinAccessInputObjectSchema } from './CaseCreateOrConnectWithoutPinAccessInput.schema';
import { CaseUpsertWithoutPinAccessInputObjectSchema as CaseUpsertWithoutPinAccessInputObjectSchema } from './CaseUpsertWithoutPinAccessInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateToOneWithWhereWithoutPinAccessInputObjectSchema as CaseUpdateToOneWithWhereWithoutPinAccessInputObjectSchema } from './CaseUpdateToOneWithWhereWithoutPinAccessInput.schema';
import { CaseUpdateWithoutPinAccessInputObjectSchema as CaseUpdateWithoutPinAccessInputObjectSchema } from './CaseUpdateWithoutPinAccessInput.schema';
import { CaseUncheckedUpdateWithoutPinAccessInputObjectSchema as CaseUncheckedUpdateWithoutPinAccessInputObjectSchema } from './CaseUncheckedUpdateWithoutPinAccessInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutPinAccessInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutPinAccessInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCreateOrConnectWithoutPinAccessInputObjectSchema).optional(),
  upsert: z.lazy(() => CaseUpsertWithoutPinAccessInputObjectSchema).optional(),
  connect: z.lazy(() => CaseWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CaseUpdateToOneWithWhereWithoutPinAccessInputObjectSchema), z.lazy(() => CaseUpdateWithoutPinAccessInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutPinAccessInputObjectSchema)]).optional()
}).strict();
export const CaseUpdateOneRequiredWithoutPinAccessNestedInputObjectSchema: z.ZodType<Prisma.CaseUpdateOneRequiredWithoutPinAccessNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateOneRequiredWithoutPinAccessNestedInput>;
export const CaseUpdateOneRequiredWithoutPinAccessNestedInputObjectZodSchema = makeSchema();

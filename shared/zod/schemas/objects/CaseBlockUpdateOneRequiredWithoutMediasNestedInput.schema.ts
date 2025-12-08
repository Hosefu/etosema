import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockCreateWithoutMediasInputObjectSchema as CaseBlockCreateWithoutMediasInputObjectSchema } from './CaseBlockCreateWithoutMediasInput.schema';
import { CaseBlockUncheckedCreateWithoutMediasInputObjectSchema as CaseBlockUncheckedCreateWithoutMediasInputObjectSchema } from './CaseBlockUncheckedCreateWithoutMediasInput.schema';
import { CaseBlockCreateOrConnectWithoutMediasInputObjectSchema as CaseBlockCreateOrConnectWithoutMediasInputObjectSchema } from './CaseBlockCreateOrConnectWithoutMediasInput.schema';
import { CaseBlockUpsertWithoutMediasInputObjectSchema as CaseBlockUpsertWithoutMediasInputObjectSchema } from './CaseBlockUpsertWithoutMediasInput.schema';
import { CaseBlockWhereUniqueInputObjectSchema as CaseBlockWhereUniqueInputObjectSchema } from './CaseBlockWhereUniqueInput.schema';
import { CaseBlockUpdateToOneWithWhereWithoutMediasInputObjectSchema as CaseBlockUpdateToOneWithWhereWithoutMediasInputObjectSchema } from './CaseBlockUpdateToOneWithWhereWithoutMediasInput.schema';
import { CaseBlockUpdateWithoutMediasInputObjectSchema as CaseBlockUpdateWithoutMediasInputObjectSchema } from './CaseBlockUpdateWithoutMediasInput.schema';
import { CaseBlockUncheckedUpdateWithoutMediasInputObjectSchema as CaseBlockUncheckedUpdateWithoutMediasInputObjectSchema } from './CaseBlockUncheckedUpdateWithoutMediasInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseBlockCreateWithoutMediasInputObjectSchema), z.lazy(() => CaseBlockUncheckedCreateWithoutMediasInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseBlockCreateOrConnectWithoutMediasInputObjectSchema).optional(),
  upsert: z.lazy(() => CaseBlockUpsertWithoutMediasInputObjectSchema).optional(),
  connect: z.lazy(() => CaseBlockWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CaseBlockUpdateToOneWithWhereWithoutMediasInputObjectSchema), z.lazy(() => CaseBlockUpdateWithoutMediasInputObjectSchema), z.lazy(() => CaseBlockUncheckedUpdateWithoutMediasInputObjectSchema)]).optional()
}).strict();
export const CaseBlockUpdateOneRequiredWithoutMediasNestedInputObjectSchema: z.ZodType<Prisma.CaseBlockUpdateOneRequiredWithoutMediasNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockUpdateOneRequiredWithoutMediasNestedInput>;
export const CaseBlockUpdateOneRequiredWithoutMediasNestedInputObjectZodSchema = makeSchema();

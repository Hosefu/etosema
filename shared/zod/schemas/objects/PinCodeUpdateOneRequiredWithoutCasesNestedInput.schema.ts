import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCreateWithoutCasesInputObjectSchema as PinCodeCreateWithoutCasesInputObjectSchema } from './PinCodeCreateWithoutCasesInput.schema';
import { PinCodeUncheckedCreateWithoutCasesInputObjectSchema as PinCodeUncheckedCreateWithoutCasesInputObjectSchema } from './PinCodeUncheckedCreateWithoutCasesInput.schema';
import { PinCodeCreateOrConnectWithoutCasesInputObjectSchema as PinCodeCreateOrConnectWithoutCasesInputObjectSchema } from './PinCodeCreateOrConnectWithoutCasesInput.schema';
import { PinCodeUpsertWithoutCasesInputObjectSchema as PinCodeUpsertWithoutCasesInputObjectSchema } from './PinCodeUpsertWithoutCasesInput.schema';
import { PinCodeWhereUniqueInputObjectSchema as PinCodeWhereUniqueInputObjectSchema } from './PinCodeWhereUniqueInput.schema';
import { PinCodeUpdateToOneWithWhereWithoutCasesInputObjectSchema as PinCodeUpdateToOneWithWhereWithoutCasesInputObjectSchema } from './PinCodeUpdateToOneWithWhereWithoutCasesInput.schema';
import { PinCodeUpdateWithoutCasesInputObjectSchema as PinCodeUpdateWithoutCasesInputObjectSchema } from './PinCodeUpdateWithoutCasesInput.schema';
import { PinCodeUncheckedUpdateWithoutCasesInputObjectSchema as PinCodeUncheckedUpdateWithoutCasesInputObjectSchema } from './PinCodeUncheckedUpdateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PinCodeCreateWithoutCasesInputObjectSchema), z.lazy(() => PinCodeUncheckedCreateWithoutCasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PinCodeCreateOrConnectWithoutCasesInputObjectSchema).optional(),
  upsert: z.lazy(() => PinCodeUpsertWithoutCasesInputObjectSchema).optional(),
  connect: z.lazy(() => PinCodeWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => PinCodeUpdateToOneWithWhereWithoutCasesInputObjectSchema), z.lazy(() => PinCodeUpdateWithoutCasesInputObjectSchema), z.lazy(() => PinCodeUncheckedUpdateWithoutCasesInputObjectSchema)]).optional()
}).strict();
export const PinCodeUpdateOneRequiredWithoutCasesNestedInputObjectSchema: z.ZodType<Prisma.PinCodeUpdateOneRequiredWithoutCasesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeUpdateOneRequiredWithoutCasesNestedInput>;
export const PinCodeUpdateOneRequiredWithoutCasesNestedInputObjectZodSchema = makeSchema();

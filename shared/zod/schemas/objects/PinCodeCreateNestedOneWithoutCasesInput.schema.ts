import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCreateWithoutCasesInputObjectSchema as PinCodeCreateWithoutCasesInputObjectSchema } from './PinCodeCreateWithoutCasesInput.schema';
import { PinCodeUncheckedCreateWithoutCasesInputObjectSchema as PinCodeUncheckedCreateWithoutCasesInputObjectSchema } from './PinCodeUncheckedCreateWithoutCasesInput.schema';
import { PinCodeCreateOrConnectWithoutCasesInputObjectSchema as PinCodeCreateOrConnectWithoutCasesInputObjectSchema } from './PinCodeCreateOrConnectWithoutCasesInput.schema';
import { PinCodeWhereUniqueInputObjectSchema as PinCodeWhereUniqueInputObjectSchema } from './PinCodeWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PinCodeCreateWithoutCasesInputObjectSchema), z.lazy(() => PinCodeUncheckedCreateWithoutCasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PinCodeCreateOrConnectWithoutCasesInputObjectSchema).optional(),
  connect: z.lazy(() => PinCodeWhereUniqueInputObjectSchema).optional()
}).strict();
export const PinCodeCreateNestedOneWithoutCasesInputObjectSchema: z.ZodType<Prisma.PinCodeCreateNestedOneWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCreateNestedOneWithoutCasesInput>;
export const PinCodeCreateNestedOneWithoutCasesInputObjectZodSchema = makeSchema();

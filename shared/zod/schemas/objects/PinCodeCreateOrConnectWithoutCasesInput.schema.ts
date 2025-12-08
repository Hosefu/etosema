import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeWhereUniqueInputObjectSchema as PinCodeWhereUniqueInputObjectSchema } from './PinCodeWhereUniqueInput.schema';
import { PinCodeCreateWithoutCasesInputObjectSchema as PinCodeCreateWithoutCasesInputObjectSchema } from './PinCodeCreateWithoutCasesInput.schema';
import { PinCodeUncheckedCreateWithoutCasesInputObjectSchema as PinCodeUncheckedCreateWithoutCasesInputObjectSchema } from './PinCodeUncheckedCreateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PinCodeWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PinCodeCreateWithoutCasesInputObjectSchema), z.lazy(() => PinCodeUncheckedCreateWithoutCasesInputObjectSchema)])
}).strict();
export const PinCodeCreateOrConnectWithoutCasesInputObjectSchema: z.ZodType<Prisma.PinCodeCreateOrConnectWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCreateOrConnectWithoutCasesInput>;
export const PinCodeCreateOrConnectWithoutCasesInputObjectZodSchema = makeSchema();

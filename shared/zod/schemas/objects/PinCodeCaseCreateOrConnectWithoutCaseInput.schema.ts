import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseWhereUniqueInputObjectSchema as PinCodeCaseWhereUniqueInputObjectSchema } from './PinCodeCaseWhereUniqueInput.schema';
import { PinCodeCaseCreateWithoutCaseInputObjectSchema as PinCodeCaseCreateWithoutCaseInputObjectSchema } from './PinCodeCaseCreateWithoutCaseInput.schema';
import { PinCodeCaseUncheckedCreateWithoutCaseInputObjectSchema as PinCodeCaseUncheckedCreateWithoutCaseInputObjectSchema } from './PinCodeCaseUncheckedCreateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PinCodeCaseCreateWithoutCaseInputObjectSchema), z.lazy(() => PinCodeCaseUncheckedCreateWithoutCaseInputObjectSchema)])
}).strict();
export const PinCodeCaseCreateOrConnectWithoutCaseInputObjectSchema: z.ZodType<Prisma.PinCodeCaseCreateOrConnectWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseCreateOrConnectWithoutCaseInput>;
export const PinCodeCaseCreateOrConnectWithoutCaseInputObjectZodSchema = makeSchema();

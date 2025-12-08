import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseWhereUniqueInputObjectSchema as PinCodeCaseWhereUniqueInputObjectSchema } from './PinCodeCaseWhereUniqueInput.schema';
import { PinCodeCaseCreateWithoutPinCodeInputObjectSchema as PinCodeCaseCreateWithoutPinCodeInputObjectSchema } from './PinCodeCaseCreateWithoutPinCodeInput.schema';
import { PinCodeCaseUncheckedCreateWithoutPinCodeInputObjectSchema as PinCodeCaseUncheckedCreateWithoutPinCodeInputObjectSchema } from './PinCodeCaseUncheckedCreateWithoutPinCodeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PinCodeCaseCreateWithoutPinCodeInputObjectSchema), z.lazy(() => PinCodeCaseUncheckedCreateWithoutPinCodeInputObjectSchema)])
}).strict();
export const PinCodeCaseCreateOrConnectWithoutPinCodeInputObjectSchema: z.ZodType<Prisma.PinCodeCaseCreateOrConnectWithoutPinCodeInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseCreateOrConnectWithoutPinCodeInput>;
export const PinCodeCaseCreateOrConnectWithoutPinCodeInputObjectZodSchema = makeSchema();

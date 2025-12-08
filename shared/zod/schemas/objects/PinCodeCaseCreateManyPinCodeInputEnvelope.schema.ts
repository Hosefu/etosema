import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseCreateManyPinCodeInputObjectSchema as PinCodeCaseCreateManyPinCodeInputObjectSchema } from './PinCodeCaseCreateManyPinCodeInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PinCodeCaseCreateManyPinCodeInputObjectSchema), z.lazy(() => PinCodeCaseCreateManyPinCodeInputObjectSchema).array()])
}).strict();
export const PinCodeCaseCreateManyPinCodeInputEnvelopeObjectSchema: z.ZodType<Prisma.PinCodeCaseCreateManyPinCodeInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseCreateManyPinCodeInputEnvelope>;
export const PinCodeCaseCreateManyPinCodeInputEnvelopeObjectZodSchema = makeSchema();

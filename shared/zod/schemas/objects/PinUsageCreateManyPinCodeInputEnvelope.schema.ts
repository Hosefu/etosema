import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinUsageCreateManyPinCodeInputObjectSchema as PinUsageCreateManyPinCodeInputObjectSchema } from './PinUsageCreateManyPinCodeInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PinUsageCreateManyPinCodeInputObjectSchema), z.lazy(() => PinUsageCreateManyPinCodeInputObjectSchema).array()])
}).strict();
export const PinUsageCreateManyPinCodeInputEnvelopeObjectSchema: z.ZodType<Prisma.PinUsageCreateManyPinCodeInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PinUsageCreateManyPinCodeInputEnvelope>;
export const PinUsageCreateManyPinCodeInputEnvelopeObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseCreateManyCaseInputObjectSchema as PinCodeCaseCreateManyCaseInputObjectSchema } from './PinCodeCaseCreateManyCaseInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PinCodeCaseCreateManyCaseInputObjectSchema), z.lazy(() => PinCodeCaseCreateManyCaseInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const PinCodeCaseCreateManyCaseInputEnvelopeObjectSchema: z.ZodType<Prisma.PinCodeCaseCreateManyCaseInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseCreateManyCaseInputEnvelope>;
export const PinCodeCaseCreateManyCaseInputEnvelopeObjectZodSchema = makeSchema();

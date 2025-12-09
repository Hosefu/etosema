import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockCreateManyCaseInputObjectSchema as CaseBlockCreateManyCaseInputObjectSchema } from './CaseBlockCreateManyCaseInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseBlockCreateManyCaseInputObjectSchema), z.lazy(() => CaseBlockCreateManyCaseInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseBlockCreateManyCaseInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseBlockCreateManyCaseInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockCreateManyCaseInputEnvelope>;
export const CaseBlockCreateManyCaseInputEnvelopeObjectZodSchema = makeSchema();

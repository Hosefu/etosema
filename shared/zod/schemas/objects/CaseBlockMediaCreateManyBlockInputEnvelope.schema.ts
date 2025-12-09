import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockMediaCreateManyBlockInputObjectSchema as CaseBlockMediaCreateManyBlockInputObjectSchema } from './CaseBlockMediaCreateManyBlockInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseBlockMediaCreateManyBlockInputObjectSchema), z.lazy(() => CaseBlockMediaCreateManyBlockInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseBlockMediaCreateManyBlockInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseBlockMediaCreateManyBlockInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaCreateManyBlockInputEnvelope>;
export const CaseBlockMediaCreateManyBlockInputEnvelopeObjectZodSchema = makeSchema();

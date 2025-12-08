import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  pinCodeId: z.literal(true).optional(),
  caseId: z.literal(true).optional()
}).strict();
export const PinCodeCaseMaxAggregateInputObjectSchema: z.ZodType<Prisma.PinCodeCaseMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseMaxAggregateInputType>;
export const PinCodeCaseMaxAggregateInputObjectZodSchema = makeSchema();

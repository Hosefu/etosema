import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  pinCodeId: z.literal(true).optional(),
  caseId: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const PinCodeCaseCountAggregateInputObjectSchema: z.ZodType<Prisma.PinCodeCaseCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseCountAggregateInputType>;
export const PinCodeCaseCountAggregateInputObjectZodSchema = makeSchema();

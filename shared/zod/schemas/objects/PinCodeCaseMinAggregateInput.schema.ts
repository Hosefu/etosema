import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  pinCodeId: z.literal(true).optional(),
  caseId: z.literal(true).optional()
}).strict();
export const PinCodeCaseMinAggregateInputObjectSchema: z.ZodType<Prisma.PinCodeCaseMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseMinAggregateInputType>;
export const PinCodeCaseMinAggregateInputObjectZodSchema = makeSchema();

import * as z from 'zod';
export const PinCodeCaseAggregateResultSchema = z.object({  _count: z.object({
    pinCodeId: z.number(),
    caseId: z.number(),
    pinCode: z.number(),
    case: z.number()
  }).optional(),
  _min: z.object({
    pinCodeId: z.string().nullable(),
    caseId: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    pinCodeId: z.string().nullable(),
    caseId: z.string().nullable()
  }).nullable().optional()});
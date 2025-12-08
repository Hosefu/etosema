import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  pinCodeId: SortOrderSchema.optional(),
  caseId: SortOrderSchema.optional()
}).strict();
export const PinCodeCaseMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PinCodeCaseMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseMaxOrderByAggregateInput>;
export const PinCodeCaseMaxOrderByAggregateInputObjectZodSchema = makeSchema();

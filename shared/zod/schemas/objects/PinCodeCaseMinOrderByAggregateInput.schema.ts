import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  pinCodeId: SortOrderSchema.optional(),
  caseId: SortOrderSchema.optional()
}).strict();
export const PinCodeCaseMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PinCodeCaseMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseMinOrderByAggregateInput>;
export const PinCodeCaseMinOrderByAggregateInputObjectZodSchema = makeSchema();

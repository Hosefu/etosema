import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  pinCodeId: SortOrderSchema.optional(),
  caseId: SortOrderSchema.optional()
}).strict();
export const PinCodeCaseCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PinCodeCaseCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseCountOrderByAggregateInput>;
export const PinCodeCaseCountOrderByAggregateInputObjectZodSchema = makeSchema();

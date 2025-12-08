import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { PinCodeCaseCountOrderByAggregateInputObjectSchema as PinCodeCaseCountOrderByAggregateInputObjectSchema } from './PinCodeCaseCountOrderByAggregateInput.schema';
import { PinCodeCaseMaxOrderByAggregateInputObjectSchema as PinCodeCaseMaxOrderByAggregateInputObjectSchema } from './PinCodeCaseMaxOrderByAggregateInput.schema';
import { PinCodeCaseMinOrderByAggregateInputObjectSchema as PinCodeCaseMinOrderByAggregateInputObjectSchema } from './PinCodeCaseMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  pinCodeId: SortOrderSchema.optional(),
  caseId: SortOrderSchema.optional(),
  _count: z.lazy(() => PinCodeCaseCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => PinCodeCaseMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => PinCodeCaseMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const PinCodeCaseOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.PinCodeCaseOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseOrderByWithAggregationInput>;
export const PinCodeCaseOrderByWithAggregationInputObjectZodSchema = makeSchema();

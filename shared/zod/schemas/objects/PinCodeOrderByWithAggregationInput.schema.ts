import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PinCodeCountOrderByAggregateInputObjectSchema as PinCodeCountOrderByAggregateInputObjectSchema } from './PinCodeCountOrderByAggregateInput.schema';
import { PinCodeMaxOrderByAggregateInputObjectSchema as PinCodeMaxOrderByAggregateInputObjectSchema } from './PinCodeMaxOrderByAggregateInput.schema';
import { PinCodeMinOrderByAggregateInputObjectSchema as PinCodeMinOrderByAggregateInputObjectSchema } from './PinCodeMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  label: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  codeHash: SortOrderSchema.optional(),
  code: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  shortCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  accessAll: SortOrderSchema.optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => PinCodeCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => PinCodeMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => PinCodeMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const PinCodeOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.PinCodeOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeOrderByWithAggregationInput>;
export const PinCodeOrderByWithAggregationInputObjectZodSchema = makeSchema();

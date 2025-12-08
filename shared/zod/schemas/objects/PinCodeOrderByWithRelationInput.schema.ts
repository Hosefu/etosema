import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PinCodeCaseOrderByRelationAggregateInputObjectSchema as PinCodeCaseOrderByRelationAggregateInputObjectSchema } from './PinCodeCaseOrderByRelationAggregateInput.schema';
import { PinUsageOrderByRelationAggregateInputObjectSchema as PinUsageOrderByRelationAggregateInputObjectSchema } from './PinUsageOrderByRelationAggregateInput.schema'

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
  cases: z.lazy(() => PinCodeCaseOrderByRelationAggregateInputObjectSchema).optional(),
  usages: z.lazy(() => PinUsageOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const PinCodeOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.PinCodeOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeOrderByWithRelationInput>;
export const PinCodeOrderByWithRelationInputObjectZodSchema = makeSchema();

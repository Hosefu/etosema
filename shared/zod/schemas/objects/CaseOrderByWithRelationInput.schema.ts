import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CaseBlockOrderByRelationAggregateInputObjectSchema as CaseBlockOrderByRelationAggregateInputObjectSchema } from './CaseBlockOrderByRelationAggregateInput.schema';
import { PinCodeCaseOrderByRelationAggregateInputObjectSchema as PinCodeCaseOrderByRelationAggregateInputObjectSchema } from './PinCodeCaseOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  slug: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  shortTitle: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  year: SortOrderSchema.optional(),
  summary: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  isNda: SortOrderSchema.optional(),
  orderRank: SortOrderSchema.optional(),
  useCustomDesign: SortOrderSchema.optional(),
  backgroundColor: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  textColor: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  fontFamily: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  settings: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  blocks: z.lazy(() => CaseBlockOrderByRelationAggregateInputObjectSchema).optional(),
  pinAccess: z.lazy(() => PinCodeCaseOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const CaseOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CaseOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseOrderByWithRelationInput>;
export const CaseOrderByWithRelationInputObjectZodSchema = makeSchema();

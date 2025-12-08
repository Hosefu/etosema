import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CaseOrderByWithRelationInputObjectSchema as CaseOrderByWithRelationInputObjectSchema } from './CaseOrderByWithRelationInput.schema';
import { CaseBlockMediaOrderByRelationAggregateInputObjectSchema as CaseBlockMediaOrderByRelationAggregateInputObjectSchema } from './CaseBlockMediaOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  caseId: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  content: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  settings: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  layout: SortOrderSchema.optional(),
  orderRank: SortOrderSchema.optional(),
  case: z.lazy(() => CaseOrderByWithRelationInputObjectSchema).optional(),
  medias: z.lazy(() => CaseBlockMediaOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const CaseBlockOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CaseBlockOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockOrderByWithRelationInput>;
export const CaseBlockOrderByWithRelationInputObjectZodSchema = makeSchema();

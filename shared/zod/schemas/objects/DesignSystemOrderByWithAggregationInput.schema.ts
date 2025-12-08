import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { DesignSystemCountOrderByAggregateInputObjectSchema as DesignSystemCountOrderByAggregateInputObjectSchema } from './DesignSystemCountOrderByAggregateInput.schema';
import { DesignSystemAvgOrderByAggregateInputObjectSchema as DesignSystemAvgOrderByAggregateInputObjectSchema } from './DesignSystemAvgOrderByAggregateInput.schema';
import { DesignSystemMaxOrderByAggregateInputObjectSchema as DesignSystemMaxOrderByAggregateInputObjectSchema } from './DesignSystemMaxOrderByAggregateInput.schema';
import { DesignSystemMinOrderByAggregateInputObjectSchema as DesignSystemMinOrderByAggregateInputObjectSchema } from './DesignSystemMinOrderByAggregateInput.schema';
import { DesignSystemSumOrderByAggregateInputObjectSchema as DesignSystemSumOrderByAggregateInputObjectSchema } from './DesignSystemSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  typography: SortOrderSchema.optional(),
  colors: SortOrderSchema.optional(),
  links: SortOrderSchema.optional(),
  cards: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  grid: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  spacing: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  faviconUrl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => DesignSystemCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => DesignSystemAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => DesignSystemMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => DesignSystemMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => DesignSystemSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const DesignSystemOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.DesignSystemOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.DesignSystemOrderByWithAggregationInput>;
export const DesignSystemOrderByWithAggregationInputObjectZodSchema = makeSchema();

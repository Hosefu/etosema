import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  typography: SortOrderSchema.optional(),
  colors: SortOrderSchema.optional(),
  links: SortOrderSchema.optional(),
  cards: SortOrderSchema.optional(),
  grid: SortOrderSchema.optional(),
  spacing: SortOrderSchema.optional(),
  faviconUrl: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const DesignSystemMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DesignSystemMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.DesignSystemMinOrderByAggregateInput>;
export const DesignSystemMinOrderByAggregateInputObjectZodSchema = makeSchema();

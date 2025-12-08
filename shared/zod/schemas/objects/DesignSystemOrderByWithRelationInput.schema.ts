import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  typography: SortOrderSchema.optional(),
  colors: SortOrderSchema.optional(),
  links: SortOrderSchema.optional(),
  cards: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  grid: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  spacing: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  faviconUrl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const DesignSystemOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.DesignSystemOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.DesignSystemOrderByWithRelationInput>;
export const DesignSystemOrderByWithRelationInputObjectZodSchema = makeSchema();

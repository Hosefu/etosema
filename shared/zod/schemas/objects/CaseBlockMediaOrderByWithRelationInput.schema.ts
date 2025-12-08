import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CaseBlockOrderByWithRelationInputObjectSchema as CaseBlockOrderByWithRelationInputObjectSchema } from './CaseBlockOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  blockId: SortOrderSchema.optional(),
  position: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  url: SortOrderSchema.optional(),
  alt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  aspectRatio: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  block: z.lazy(() => CaseBlockOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const CaseBlockMediaOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaOrderByWithRelationInput>;
export const CaseBlockMediaOrderByWithRelationInputObjectZodSchema = makeSchema();

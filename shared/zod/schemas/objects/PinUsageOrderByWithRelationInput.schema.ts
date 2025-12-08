import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PinCodeOrderByWithRelationInputObjectSchema as PinCodeOrderByWithRelationInputObjectSchema } from './PinCodeOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  pinCodeId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  ip: SortOrderSchema.optional(),
  userAgent: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  success: SortOrderSchema.optional(),
  path: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  pinCode: z.lazy(() => PinCodeOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const PinUsageOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.PinUsageOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.PinUsageOrderByWithRelationInput>;
export const PinUsageOrderByWithRelationInputObjectZodSchema = makeSchema();

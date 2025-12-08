import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinUsageWhereInputObjectSchema as PinUsageWhereInputObjectSchema } from './PinUsageWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => PinUsageWhereInputObjectSchema).optional(),
  some: z.lazy(() => PinUsageWhereInputObjectSchema).optional(),
  none: z.lazy(() => PinUsageWhereInputObjectSchema).optional()
}).strict();
export const PinUsageListRelationFilterObjectSchema: z.ZodType<Prisma.PinUsageListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PinUsageListRelationFilter>;
export const PinUsageListRelationFilterObjectZodSchema = makeSchema();

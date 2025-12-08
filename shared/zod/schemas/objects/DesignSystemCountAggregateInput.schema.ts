import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  typography: z.literal(true).optional(),
  colors: z.literal(true).optional(),
  links: z.literal(true).optional(),
  cards: z.literal(true).optional(),
  grid: z.literal(true).optional(),
  spacing: z.literal(true).optional(),
  faviconUrl: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const DesignSystemCountAggregateInputObjectSchema: z.ZodType<Prisma.DesignSystemCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.DesignSystemCountAggregateInputType>;
export const DesignSystemCountAggregateInputObjectZodSchema = makeSchema();

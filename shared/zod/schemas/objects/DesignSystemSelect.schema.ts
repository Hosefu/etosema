import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  typography: z.boolean().optional(),
  colors: z.boolean().optional(),
  links: z.boolean().optional(),
  cards: z.boolean().optional(),
  grid: z.boolean().optional(),
  spacing: z.boolean().optional(),
  faviconUrl: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const DesignSystemSelectObjectSchema: z.ZodType<Prisma.DesignSystemSelect> = makeSchema() as unknown as z.ZodType<Prisma.DesignSystemSelect>;
export const DesignSystemSelectObjectZodSchema = makeSchema();

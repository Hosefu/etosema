import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  family: z.boolean().optional(),
  url: z.boolean().optional(),
  format: z.boolean().optional(),
  weight: z.boolean().optional(),
  style: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const FontSelectObjectSchema: z.ZodType<Prisma.FontSelect> = makeSchema() as unknown as z.ZodType<Prisma.FontSelect>;
export const FontSelectObjectZodSchema = makeSchema();

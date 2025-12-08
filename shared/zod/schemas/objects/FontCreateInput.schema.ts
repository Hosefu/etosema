import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  family: z.string(),
  url: z.string(),
  format: z.string(),
  weight: z.string().optional(),
  style: z.string().optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const FontCreateInputObjectSchema: z.ZodType<Prisma.FontCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.FontCreateInput>;
export const FontCreateInputObjectZodSchema = makeSchema();

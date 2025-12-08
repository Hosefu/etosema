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
export const FontUncheckedCreateInputObjectSchema: z.ZodType<Prisma.FontUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.FontUncheckedCreateInput>;
export const FontUncheckedCreateInputObjectZodSchema = makeSchema();

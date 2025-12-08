import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  typography: z.string(),
  colors: z.string(),
  links: z.string(),
  cards: z.string().optional().nullable(),
  grid: z.string().optional().nullable(),
  spacing: z.string().optional().nullable(),
  faviconUrl: z.string().optional().nullable()
}).strict();
export const DesignSystemUncheckedCreateInputObjectSchema: z.ZodType<Prisma.DesignSystemUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.DesignSystemUncheckedCreateInput>;
export const DesignSystemUncheckedCreateInputObjectZodSchema = makeSchema();

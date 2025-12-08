import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  position: z.number().int(),
  type: z.string(),
  url: z.string(),
  alt: z.string().optional().nullable(),
  aspectRatio: z.string().optional().nullable()
}).strict();
export const CaseBlockMediaCreateWithoutBlockInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaCreateWithoutBlockInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaCreateWithoutBlockInput>;
export const CaseBlockMediaCreateWithoutBlockInputObjectZodSchema = makeSchema();

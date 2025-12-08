import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  blockId: z.string(),
  position: z.number().int(),
  type: z.string(),
  url: z.string(),
  alt: z.string().optional().nullable(),
  aspectRatio: z.string().optional().nullable()
}).strict();
export const CaseBlockMediaCreateManyInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaCreateManyInput>;
export const CaseBlockMediaCreateManyInputObjectZodSchema = makeSchema();

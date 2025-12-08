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
export const CaseBlockMediaCreateManyBlockInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaCreateManyBlockInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaCreateManyBlockInput>;
export const CaseBlockMediaCreateManyBlockInputObjectZodSchema = makeSchema();

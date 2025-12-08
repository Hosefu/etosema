import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockCreateNestedOneWithoutMediasInputObjectSchema as CaseBlockCreateNestedOneWithoutMediasInputObjectSchema } from './CaseBlockCreateNestedOneWithoutMediasInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  position: z.number().int(),
  type: z.string(),
  url: z.string(),
  alt: z.string().optional().nullable(),
  aspectRatio: z.string().optional().nullable(),
  block: z.lazy(() => CaseBlockCreateNestedOneWithoutMediasInputObjectSchema)
}).strict();
export const CaseBlockMediaCreateInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaCreateInput>;
export const CaseBlockMediaCreateInputObjectZodSchema = makeSchema();

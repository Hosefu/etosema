import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseCreateNestedOneWithoutBlocksInputObjectSchema as CaseCreateNestedOneWithoutBlocksInputObjectSchema } from './CaseCreateNestedOneWithoutBlocksInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  type: z.string().optional(),
  content: z.string().optional().nullable(),
  settings: z.string().optional().nullable(),
  layout: z.string(),
  orderRank: z.string(),
  case: z.lazy(() => CaseCreateNestedOneWithoutBlocksInputObjectSchema)
}).strict();
export const CaseBlockCreateWithoutMediasInputObjectSchema: z.ZodType<Prisma.CaseBlockCreateWithoutMediasInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockCreateWithoutMediasInput>;
export const CaseBlockCreateWithoutMediasInputObjectZodSchema = makeSchema();

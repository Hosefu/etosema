import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseCreateNestedOneWithoutBlocksInputObjectSchema as CaseCreateNestedOneWithoutBlocksInputObjectSchema } from './CaseCreateNestedOneWithoutBlocksInput.schema';
import { CaseBlockMediaCreateNestedManyWithoutBlockInputObjectSchema as CaseBlockMediaCreateNestedManyWithoutBlockInputObjectSchema } from './CaseBlockMediaCreateNestedManyWithoutBlockInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  type: z.string().optional(),
  content: z.string().optional().nullable(),
  settings: z.string().optional().nullable(),
  layout: z.string(),
  orderRank: z.string(),
  case: z.lazy(() => CaseCreateNestedOneWithoutBlocksInputObjectSchema),
  medias: z.lazy(() => CaseBlockMediaCreateNestedManyWithoutBlockInputObjectSchema).optional()
}).strict();
export const CaseBlockCreateInputObjectSchema: z.ZodType<Prisma.CaseBlockCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockCreateInput>;
export const CaseBlockCreateInputObjectZodSchema = makeSchema();

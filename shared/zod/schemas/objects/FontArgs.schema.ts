import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FontSelectObjectSchema as FontSelectObjectSchema } from './FontSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => FontSelectObjectSchema).optional()
}).strict();
export const FontArgsObjectSchema = makeSchema();
export const FontArgsObjectZodSchema = makeSchema();

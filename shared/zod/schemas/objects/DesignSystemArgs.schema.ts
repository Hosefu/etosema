import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DesignSystemSelectObjectSchema as DesignSystemSelectObjectSchema } from './DesignSystemSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => DesignSystemSelectObjectSchema).optional()
}).strict();
export const DesignSystemArgsObjectSchema = makeSchema();
export const DesignSystemArgsObjectZodSchema = makeSchema();

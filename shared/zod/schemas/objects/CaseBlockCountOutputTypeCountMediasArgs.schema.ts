import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockMediaWhereInputObjectSchema as CaseBlockMediaWhereInputObjectSchema } from './CaseBlockMediaWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseBlockMediaWhereInputObjectSchema).optional()
}).strict();
export const CaseBlockCountOutputTypeCountMediasArgsObjectSchema = makeSchema();
export const CaseBlockCountOutputTypeCountMediasArgsObjectZodSchema = makeSchema();

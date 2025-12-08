import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockWhereInputObjectSchema as CaseBlockWhereInputObjectSchema } from './CaseBlockWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseBlockWhereInputObjectSchema).optional()
}).strict();
export const CaseCountOutputTypeCountBlocksArgsObjectSchema = makeSchema();
export const CaseCountOutputTypeCountBlocksArgsObjectZodSchema = makeSchema();

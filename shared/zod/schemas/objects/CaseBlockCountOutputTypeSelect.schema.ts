import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockCountOutputTypeCountMediasArgsObjectSchema as CaseBlockCountOutputTypeCountMediasArgsObjectSchema } from './CaseBlockCountOutputTypeCountMediasArgs.schema'

const makeSchema = () => z.object({
  medias: z.union([z.boolean(), z.lazy(() => CaseBlockCountOutputTypeCountMediasArgsObjectSchema)]).optional()
}).strict();
export const CaseBlockCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.CaseBlockCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockCountOutputTypeSelect>;
export const CaseBlockCountOutputTypeSelectObjectZodSchema = makeSchema();

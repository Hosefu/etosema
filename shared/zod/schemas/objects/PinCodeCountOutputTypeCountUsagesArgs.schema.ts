import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinUsageWhereInputObjectSchema as PinUsageWhereInputObjectSchema } from './PinUsageWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PinUsageWhereInputObjectSchema).optional()
}).strict();
export const PinCodeCountOutputTypeCountUsagesArgsObjectSchema = makeSchema();
export const PinCodeCountOutputTypeCountUsagesArgsObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseWhereInputObjectSchema as PinCodeCaseWhereInputObjectSchema } from './PinCodeCaseWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PinCodeCaseWhereInputObjectSchema).optional()
}).strict();
export const PinCodeCountOutputTypeCountCasesArgsObjectSchema = makeSchema();
export const PinCodeCountOutputTypeCountCasesArgsObjectZodSchema = makeSchema();

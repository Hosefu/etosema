import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseWhereInputObjectSchema as PinCodeCaseWhereInputObjectSchema } from './PinCodeCaseWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => PinCodeCaseWhereInputObjectSchema).optional(),
  some: z.lazy(() => PinCodeCaseWhereInputObjectSchema).optional(),
  none: z.lazy(() => PinCodeCaseWhereInputObjectSchema).optional()
}).strict();
export const PinCodeCaseListRelationFilterObjectSchema: z.ZodType<Prisma.PinCodeCaseListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseListRelationFilter>;
export const PinCodeCaseListRelationFilterObjectZodSchema = makeSchema();

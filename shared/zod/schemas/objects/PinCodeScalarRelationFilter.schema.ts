import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeWhereInputObjectSchema as PinCodeWhereInputObjectSchema } from './PinCodeWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => PinCodeWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => PinCodeWhereInputObjectSchema).optional()
}).strict();
export const PinCodeScalarRelationFilterObjectSchema: z.ZodType<Prisma.PinCodeScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeScalarRelationFilter>;
export const PinCodeScalarRelationFilterObjectZodSchema = makeSchema();

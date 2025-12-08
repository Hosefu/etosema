import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeWhereInputObjectSchema as PinCodeWhereInputObjectSchema } from './PinCodeWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => PinCodeWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => PinCodeWhereInputObjectSchema).optional().nullable()
}).strict();
export const PinCodeNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.PinCodeNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeNullableScalarRelationFilter>;
export const PinCodeNullableScalarRelationFilterObjectZodSchema = makeSchema();

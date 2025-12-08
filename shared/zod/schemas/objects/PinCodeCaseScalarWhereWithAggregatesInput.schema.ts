import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema'

const pincodecasescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => PinCodeCaseScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PinCodeCaseScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PinCodeCaseScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PinCodeCaseScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PinCodeCaseScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  pinCodeId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional()
}).strict();
export const PinCodeCaseScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.PinCodeCaseScalarWhereWithAggregatesInput> = pincodecasescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.PinCodeCaseScalarWhereWithAggregatesInput>;
export const PinCodeCaseScalarWhereWithAggregatesInputObjectZodSchema = pincodecasescalarwherewithaggregatesinputSchema;

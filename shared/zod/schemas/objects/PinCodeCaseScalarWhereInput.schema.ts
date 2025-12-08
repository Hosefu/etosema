import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema'

const pincodecasescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PinCodeCaseScalarWhereInputObjectSchema), z.lazy(() => PinCodeCaseScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PinCodeCaseScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PinCodeCaseScalarWhereInputObjectSchema), z.lazy(() => PinCodeCaseScalarWhereInputObjectSchema).array()]).optional(),
  pinCodeId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional()
}).strict();
export const PinCodeCaseScalarWhereInputObjectSchema: z.ZodType<Prisma.PinCodeCaseScalarWhereInput> = pincodecasescalarwhereinputSchema as unknown as z.ZodType<Prisma.PinCodeCaseScalarWhereInput>;
export const PinCodeCaseScalarWhereInputObjectZodSchema = pincodecasescalarwhereinputSchema;

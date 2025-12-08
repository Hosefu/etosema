import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { PinCodeScalarRelationFilterObjectSchema as PinCodeScalarRelationFilterObjectSchema } from './PinCodeScalarRelationFilter.schema';
import { PinCodeWhereInputObjectSchema as PinCodeWhereInputObjectSchema } from './PinCodeWhereInput.schema';
import { CaseScalarRelationFilterObjectSchema as CaseScalarRelationFilterObjectSchema } from './CaseScalarRelationFilter.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema'

const pincodecasewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PinCodeCaseWhereInputObjectSchema), z.lazy(() => PinCodeCaseWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PinCodeCaseWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PinCodeCaseWhereInputObjectSchema), z.lazy(() => PinCodeCaseWhereInputObjectSchema).array()]).optional(),
  pinCodeId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  pinCode: z.union([z.lazy(() => PinCodeScalarRelationFilterObjectSchema), z.lazy(() => PinCodeWhereInputObjectSchema)]).optional(),
  case: z.union([z.lazy(() => CaseScalarRelationFilterObjectSchema), z.lazy(() => CaseWhereInputObjectSchema)]).optional()
}).strict();
export const PinCodeCaseWhereInputObjectSchema: z.ZodType<Prisma.PinCodeCaseWhereInput> = pincodecasewhereinputSchema as unknown as z.ZodType<Prisma.PinCodeCaseWhereInput>;
export const PinCodeCaseWhereInputObjectZodSchema = pincodecasewhereinputSchema;

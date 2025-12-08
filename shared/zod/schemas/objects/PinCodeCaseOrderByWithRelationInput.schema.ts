import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { PinCodeOrderByWithRelationInputObjectSchema as PinCodeOrderByWithRelationInputObjectSchema } from './PinCodeOrderByWithRelationInput.schema';
import { CaseOrderByWithRelationInputObjectSchema as CaseOrderByWithRelationInputObjectSchema } from './CaseOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  pinCodeId: SortOrderSchema.optional(),
  caseId: SortOrderSchema.optional(),
  pinCode: z.lazy(() => PinCodeOrderByWithRelationInputObjectSchema).optional(),
  case: z.lazy(() => CaseOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const PinCodeCaseOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.PinCodeCaseOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseOrderByWithRelationInput>;
export const PinCodeCaseOrderByWithRelationInputObjectZodSchema = makeSchema();

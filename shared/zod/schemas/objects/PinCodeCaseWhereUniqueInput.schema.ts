import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCasePinCodeIdCaseIdCompoundUniqueInputObjectSchema as PinCodeCasePinCodeIdCaseIdCompoundUniqueInputObjectSchema } from './PinCodeCasePinCodeIdCaseIdCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  pinCodeId_caseId: z.lazy(() => PinCodeCasePinCodeIdCaseIdCompoundUniqueInputObjectSchema).optional()
}).strict();
export const PinCodeCaseWhereUniqueInputObjectSchema: z.ZodType<Prisma.PinCodeCaseWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseWhereUniqueInput>;
export const PinCodeCaseWhereUniqueInputObjectZodSchema = makeSchema();

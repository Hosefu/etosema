import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  pinCodeId: z.string(),
  caseId: z.string()
}).strict();
export const PinCodeCasePinCodeIdCaseIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.PinCodeCasePinCodeIdCaseIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCasePinCodeIdCaseIdCompoundUniqueInput>;
export const PinCodeCasePinCodeIdCaseIdCompoundUniqueInputObjectZodSchema = makeSchema();

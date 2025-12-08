import * as z from 'zod';
export const PinCodeCaseFindUniqueResultSchema = z.nullable(z.object({
  pinCodeId: z.string(),
  caseId: z.string(),
  pinCode: z.unknown(),
  case: z.unknown()
}));
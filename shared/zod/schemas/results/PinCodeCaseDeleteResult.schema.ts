import * as z from 'zod';
export const PinCodeCaseDeleteResultSchema = z.nullable(z.object({
  pinCodeId: z.string(),
  caseId: z.string(),
  pinCode: z.unknown(),
  case: z.unknown()
}));
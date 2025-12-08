import * as z from 'zod';
export const PinCodeCaseUpsertResultSchema = z.object({
  pinCodeId: z.string(),
  caseId: z.string(),
  pinCode: z.unknown(),
  case: z.unknown()
});
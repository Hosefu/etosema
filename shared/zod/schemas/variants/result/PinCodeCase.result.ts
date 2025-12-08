import * as z from 'zod';
// prettier-ignore
export const PinCodeCaseResultSchema = z.object({
    pinCodeId: z.string(),
    caseId: z.string(),
    pinCode: z.unknown(),
    case: z.unknown()
}).strict();

export type PinCodeCaseResultType = z.infer<typeof PinCodeCaseResultSchema>;

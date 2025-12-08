import * as z from 'zod';
// prettier-ignore
export const PinCodeCaseInputSchema = z.object({
    pinCodeId: z.string(),
    caseId: z.string(),
    pinCode: z.unknown(),
    case: z.unknown()
}).strict();

export type PinCodeCaseInputType = z.infer<typeof PinCodeCaseInputSchema>;

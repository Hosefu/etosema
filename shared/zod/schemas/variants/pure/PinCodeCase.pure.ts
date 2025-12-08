import * as z from 'zod';
// prettier-ignore
export const PinCodeCaseModelSchema = z.object({
    pinCodeId: z.string(),
    caseId: z.string(),
    pinCode: z.unknown(),
    case: z.unknown()
}).strict();

export type PinCodeCasePureType = z.infer<typeof PinCodeCaseModelSchema>;

import * as z from 'zod';
// prettier-ignore
export const PinUsageModelSchema = z.object({
    id: z.string(),
    pinCodeId: z.string().nullable(),
    pinCode: z.unknown().nullable(),
    ip: z.string(),
    userAgent: z.string().nullable(),
    success: z.boolean(),
    path: z.string().nullable(),
    createdAt: z.date()
}).strict();

export type PinUsagePureType = z.infer<typeof PinUsageModelSchema>;

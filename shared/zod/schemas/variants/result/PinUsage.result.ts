import * as z from 'zod';
// prettier-ignore
export const PinUsageResultSchema = z.object({
    id: z.string(),
    pinCodeId: z.string().nullable(),
    pinCode: z.unknown().nullable(),
    ip: z.string(),
    userAgent: z.string().nullable(),
    success: z.boolean(),
    path: z.string().nullable(),
    createdAt: z.date()
}).strict();

export type PinUsageResultType = z.infer<typeof PinUsageResultSchema>;

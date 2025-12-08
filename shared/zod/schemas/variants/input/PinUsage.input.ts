import * as z from 'zod';
// prettier-ignore
export const PinUsageInputSchema = z.object({
    id: z.string(),
    pinCodeId: z.string().optional().nullable(),
    pinCode: z.unknown().optional().nullable(),
    ip: z.string(),
    userAgent: z.string().optional().nullable(),
    success: z.boolean(),
    path: z.string().optional().nullable(),
    createdAt: z.date()
}).strict();

export type PinUsageInputType = z.infer<typeof PinUsageInputSchema>;

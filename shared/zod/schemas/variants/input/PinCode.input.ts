import * as z from 'zod';
// prettier-ignore
export const PinCodeInputSchema = z.object({
    id: z.string(),
    label: z.string().optional().nullable(),
    codeHash: z.string(),
    code: z.string().optional().nullable(),
    shortCode: z.string().optional().nullable(),
    accessAll: z.boolean(),
    expiresAt: z.date().optional().nullable(),
    cases: z.array(z.unknown()),
    usages: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type PinCodeInputType = z.infer<typeof PinCodeInputSchema>;

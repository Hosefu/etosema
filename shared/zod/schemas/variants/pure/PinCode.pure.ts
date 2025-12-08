import * as z from 'zod';
// prettier-ignore
export const PinCodeModelSchema = z.object({
    id: z.string(),
    label: z.string().nullable(),
    codeHash: z.string(),
    code: z.string().nullable(),
    shortCode: z.string().nullable(),
    accessAll: z.boolean(),
    expiresAt: z.date().nullable(),
    cases: z.array(z.unknown()),
    usages: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type PinCodePureType = z.infer<typeof PinCodeModelSchema>;

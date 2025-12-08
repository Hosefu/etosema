import * as z from 'zod';
// prettier-ignore
export const ProfileInputSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    description: z.string(),
    contactsJson: z.string(),
    projectsJson: z.string(),
    socialsJson: z.string(),
    logoUrl: z.string().optional().nullable(),
    logoText: z.string().optional().nullable(),
    lockedCaseMessage: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ProfileInputType = z.infer<typeof ProfileInputSchema>;

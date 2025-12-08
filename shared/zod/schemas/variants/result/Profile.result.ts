import * as z from 'zod';
// prettier-ignore
export const ProfileResultSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    description: z.string(),
    contactsJson: z.string(),
    projectsJson: z.string(),
    socialsJson: z.string(),
    logoUrl: z.string().nullable(),
    logoText: z.string().nullable(),
    lockedCaseMessage: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ProfileResultType = z.infer<typeof ProfileResultSchema>;

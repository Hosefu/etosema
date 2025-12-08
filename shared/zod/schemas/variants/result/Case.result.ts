import * as z from 'zod';
// prettier-ignore
export const CaseResultSchema = z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    shortTitle: z.string().nullable(),
    year: z.number().int(),
    summary: z.string().nullable(),
    isNda: z.boolean(),
    orderRank: z.string(),
    useCustomDesign: z.boolean(),
    backgroundColor: z.string().nullable(),
    textColor: z.string().nullable(),
    fontFamily: z.string().nullable(),
    settings: z.string().nullable(),
    blocks: z.array(z.unknown()),
    pinAccess: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CaseResultType = z.infer<typeof CaseResultSchema>;

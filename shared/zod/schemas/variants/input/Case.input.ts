import * as z from 'zod';
// prettier-ignore
export const CaseInputSchema = z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    shortTitle: z.string().optional().nullable(),
    year: z.number().int(),
    summary: z.string().optional().nullable(),
    isNda: z.boolean(),
    orderRank: z.string(),
    useCustomDesign: z.boolean(),
    backgroundColor: z.string().optional().nullable(),
    textColor: z.string().optional().nullable(),
    fontFamily: z.string().optional().nullable(),
    settings: z.string().optional().nullable(),
    blocks: z.array(z.unknown()),
    pinAccess: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CaseInputType = z.infer<typeof CaseInputSchema>;

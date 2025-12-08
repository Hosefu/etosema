import * as z from 'zod';
// prettier-ignore
export const CaseBlockModelSchema = z.object({
    id: z.string(),
    caseId: z.string(),
    case: z.unknown(),
    type: z.string(),
    content: z.string().nullable(),
    settings: z.string().nullable(),
    layout: z.string(),
    orderRank: z.string(),
    medias: z.array(z.unknown())
}).strict();

export type CaseBlockPureType = z.infer<typeof CaseBlockModelSchema>;

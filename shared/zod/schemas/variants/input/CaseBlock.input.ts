import * as z from 'zod';
// prettier-ignore
export const CaseBlockInputSchema = z.object({
    id: z.string(),
    caseId: z.string(),
    case: z.unknown(),
    type: z.string(),
    content: z.string().optional().nullable(),
    settings: z.string().optional().nullable(),
    layout: z.string(),
    orderRank: z.string(),
    medias: z.array(z.unknown())
}).strict();

export type CaseBlockInputType = z.infer<typeof CaseBlockInputSchema>;

import * as z from 'zod';
// prettier-ignore
export const CaseBlockMediaInputSchema = z.object({
    id: z.string(),
    blockId: z.string(),
    block: z.unknown(),
    position: z.number().int(),
    type: z.string(),
    url: z.string(),
    alt: z.string().optional().nullable(),
    aspectRatio: z.string().optional().nullable()
}).strict();

export type CaseBlockMediaInputType = z.infer<typeof CaseBlockMediaInputSchema>;

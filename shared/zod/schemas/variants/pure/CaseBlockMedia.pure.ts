import * as z from 'zod';
// prettier-ignore
export const CaseBlockMediaModelSchema = z.object({
    id: z.string(),
    blockId: z.string(),
    block: z.unknown(),
    position: z.number().int(),
    type: z.string(),
    url: z.string(),
    alt: z.string().nullable(),
    aspectRatio: z.string().nullable()
}).strict();

export type CaseBlockMediaPureType = z.infer<typeof CaseBlockMediaModelSchema>;

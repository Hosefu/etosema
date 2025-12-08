import * as z from 'zod';
// prettier-ignore
export const FontResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    family: z.string(),
    url: z.string(),
    format: z.string(),
    weight: z.string(),
    style: z.string(),
    createdAt: z.date()
}).strict();

export type FontResultType = z.infer<typeof FontResultSchema>;

import * as z from 'zod';
// prettier-ignore
export const DesignSystemResultSchema = z.object({
    id: z.number().int(),
    typography: z.string(),
    colors: z.string(),
    links: z.string(),
    cards: z.string().nullable(),
    grid: z.string().nullable(),
    spacing: z.string().nullable(),
    faviconUrl: z.string().nullable(),
    updatedAt: z.date()
}).strict();

export type DesignSystemResultType = z.infer<typeof DesignSystemResultSchema>;

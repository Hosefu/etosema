import * as z from 'zod';
// prettier-ignore
export const DesignSystemInputSchema = z.object({
    id: z.number().int(),
    typography: z.string(),
    colors: z.string(),
    links: z.string(),
    cards: z.string().optional().nullable(),
    grid: z.string().optional().nullable(),
    spacing: z.string().optional().nullable(),
    faviconUrl: z.string().optional().nullable(),
    updatedAt: z.date()
}).strict();

export type DesignSystemInputType = z.infer<typeof DesignSystemInputSchema>;

import * as z from 'zod';
// prettier-ignore
export const DesignSystemModelSchema = z.object({
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

export type DesignSystemPureType = z.infer<typeof DesignSystemModelSchema>;

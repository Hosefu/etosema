import * as z from 'zod';
export const DesignSystemCreateResultSchema = z.object({
  id: z.number().int(),
  typography: z.string(),
  colors: z.string(),
  links: z.string(),
  cards: z.string().optional(),
  grid: z.string().optional(),
  spacing: z.string().optional(),
  faviconUrl: z.string().optional(),
  updatedAt: z.date()
});
import * as z from 'zod';
export const DesignSystemFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.number().int(),
  typography: z.string(),
  colors: z.string(),
  links: z.string(),
  cards: z.string().optional(),
  grid: z.string().optional(),
  spacing: z.string().optional(),
  faviconUrl: z.string().optional(),
  updatedAt: z.date()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});
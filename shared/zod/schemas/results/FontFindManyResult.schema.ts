import * as z from 'zod';
export const FontFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  name: z.string(),
  family: z.string(),
  url: z.string(),
  format: z.string(),
  weight: z.string(),
  style: z.string(),
  createdAt: z.date()
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
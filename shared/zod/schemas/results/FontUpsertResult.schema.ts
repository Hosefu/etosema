import * as z from 'zod';
export const FontUpsertResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  family: z.string(),
  url: z.string(),
  format: z.string(),
  weight: z.string(),
  style: z.string(),
  createdAt: z.date()
});
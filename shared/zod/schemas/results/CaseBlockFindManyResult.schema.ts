import * as z from 'zod';
export const CaseBlockFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  caseId: z.string(),
  case: z.unknown(),
  type: z.string(),
  content: z.string().optional(),
  settings: z.string().optional(),
  layout: z.string(),
  orderRank: z.string(),
  medias: z.array(z.unknown())
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
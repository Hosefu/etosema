import * as z from 'zod';
export const CaseBlockUpsertResultSchema = z.object({
  id: z.string(),
  caseId: z.string(),
  case: z.unknown(),
  type: z.string(),
  content: z.string().optional(),
  settings: z.string().optional(),
  layout: z.string(),
  orderRank: z.string(),
  medias: z.array(z.unknown())
});
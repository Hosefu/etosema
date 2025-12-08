import * as z from 'zod';
export const CaseBlockGroupByResultSchema = z.array(z.object({
  id: z.string(),
  caseId: z.string(),
  type: z.string(),
  content: z.string(),
  settings: z.string(),
  layout: z.string(),
  orderRank: z.string(),
  _count: z.object({
    id: z.number(),
    caseId: z.number(),
    case: z.number(),
    type: z.number(),
    content: z.number(),
    settings: z.number(),
    layout: z.number(),
    orderRank: z.number(),
    medias: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    caseId: z.string().nullable(),
    type: z.string().nullable(),
    content: z.string().nullable(),
    settings: z.string().nullable(),
    layout: z.string().nullable(),
    orderRank: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    caseId: z.string().nullable(),
    type: z.string().nullable(),
    content: z.string().nullable(),
    settings: z.string().nullable(),
    layout: z.string().nullable(),
    orderRank: z.string().nullable()
  }).nullable().optional()
}));
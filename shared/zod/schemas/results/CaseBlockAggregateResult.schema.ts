import * as z from 'zod';
export const CaseBlockAggregateResultSchema = z.object({  _count: z.object({
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
  }).nullable().optional()});
import * as z from 'zod';
export const CaseBlockMediaGroupByResultSchema = z.array(z.object({
  id: z.string(),
  blockId: z.string(),
  position: z.number().int(),
  type: z.string(),
  url: z.string(),
  alt: z.string(),
  aspectRatio: z.string(),
  _count: z.object({
    id: z.number(),
    blockId: z.number(),
    block: z.number(),
    position: z.number(),
    type: z.number(),
    url: z.number(),
    alt: z.number(),
    aspectRatio: z.number()
  }).optional(),
  _sum: z.object({
    position: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    position: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    blockId: z.string().nullable(),
    position: z.number().int().nullable(),
    type: z.string().nullable(),
    url: z.string().nullable(),
    alt: z.string().nullable(),
    aspectRatio: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    blockId: z.string().nullable(),
    position: z.number().int().nullable(),
    type: z.string().nullable(),
    url: z.string().nullable(),
    alt: z.string().nullable(),
    aspectRatio: z.string().nullable()
  }).nullable().optional()
}));
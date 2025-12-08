import * as z from 'zod';
export const CaseBlockMediaFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  blockId: z.string(),
  block: z.unknown(),
  position: z.number().int(),
  type: z.string(),
  url: z.string(),
  alt: z.string().optional(),
  aspectRatio: z.string().optional()
}));
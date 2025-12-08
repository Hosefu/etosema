import * as z from 'zod';
export const CaseUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  shortTitle: z.string().optional(),
  year: z.number().int(),
  summary: z.string().optional(),
  isNda: z.boolean(),
  orderRank: z.string(),
  useCustomDesign: z.boolean(),
  backgroundColor: z.string().optional(),
  textColor: z.string().optional(),
  fontFamily: z.string().optional(),
  settings: z.string().optional(),
  blocks: z.array(z.unknown()),
  pinAccess: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date()
}));
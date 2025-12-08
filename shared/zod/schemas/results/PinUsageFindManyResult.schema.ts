import * as z from 'zod';
export const PinUsageFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  pinCodeId: z.string().optional(),
  pinCode: z.unknown().optional(),
  ip: z.string(),
  userAgent: z.string().optional(),
  success: z.boolean(),
  path: z.string().optional(),
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
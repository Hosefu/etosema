import * as z from 'zod';
export const PinCodeFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  label: z.string().optional(),
  codeHash: z.string(),
  code: z.string().optional(),
  shortCode: z.string().optional(),
  accessAll: z.boolean(),
  expiresAt: z.date().optional(),
  cases: z.array(z.unknown()),
  usages: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date()
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
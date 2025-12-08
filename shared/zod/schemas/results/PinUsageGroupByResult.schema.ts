import * as z from 'zod';
export const PinUsageGroupByResultSchema = z.array(z.object({
  id: z.string(),
  pinCodeId: z.string(),
  ip: z.string(),
  userAgent: z.string(),
  success: z.boolean(),
  path: z.string(),
  createdAt: z.date(),
  _count: z.object({
    id: z.number(),
    pinCodeId: z.number(),
    pinCode: z.number(),
    ip: z.number(),
    userAgent: z.number(),
    success: z.number(),
    path: z.number(),
    createdAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    pinCodeId: z.string().nullable(),
    ip: z.string().nullable(),
    userAgent: z.string().nullable(),
    path: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    pinCodeId: z.string().nullable(),
    ip: z.string().nullable(),
    userAgent: z.string().nullable(),
    path: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()
}));
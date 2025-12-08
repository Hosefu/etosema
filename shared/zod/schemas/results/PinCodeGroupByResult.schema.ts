import * as z from 'zod';
export const PinCodeGroupByResultSchema = z.array(z.object({
  id: z.string(),
  label: z.string(),
  codeHash: z.string(),
  code: z.string(),
  shortCode: z.string(),
  accessAll: z.boolean(),
  expiresAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    label: z.number(),
    codeHash: z.number(),
    code: z.number(),
    shortCode: z.number(),
    accessAll: z.number(),
    expiresAt: z.number(),
    cases: z.number(),
    usages: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    label: z.string().nullable(),
    codeHash: z.string().nullable(),
    code: z.string().nullable(),
    shortCode: z.string().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    label: z.string().nullable(),
    codeHash: z.string().nullable(),
    code: z.string().nullable(),
    shortCode: z.string().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));
import * as z from 'zod';
export const FontAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    name: z.number(),
    family: z.number(),
    url: z.number(),
    format: z.number(),
    weight: z.number(),
    style: z.number(),
    createdAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    family: z.string().nullable(),
    url: z.string().nullable(),
    format: z.string().nullable(),
    weight: z.string().nullable(),
    style: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    family: z.string().nullable(),
    url: z.string().nullable(),
    format: z.string().nullable(),
    weight: z.string().nullable(),
    style: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()});
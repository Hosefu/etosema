import * as z from 'zod';
export const DesignSystemAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    typography: z.number(),
    colors: z.number(),
    links: z.number(),
    cards: z.number(),
    grid: z.number(),
    spacing: z.number(),
    faviconUrl: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    typography: z.string().nullable(),
    colors: z.string().nullable(),
    links: z.string().nullable(),
    cards: z.string().nullable(),
    grid: z.string().nullable(),
    spacing: z.string().nullable(),
    faviconUrl: z.string().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    typography: z.string().nullable(),
    colors: z.string().nullable(),
    links: z.string().nullable(),
    cards: z.string().nullable(),
    grid: z.string().nullable(),
    spacing: z.string().nullable(),
    faviconUrl: z.string().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});
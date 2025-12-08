import * as z from 'zod';
export const CaseAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    slug: z.number(),
    title: z.number(),
    shortTitle: z.number(),
    year: z.number(),
    summary: z.number(),
    isNda: z.number(),
    orderRank: z.number(),
    useCustomDesign: z.number(),
    backgroundColor: z.number(),
    textColor: z.number(),
    fontFamily: z.number(),
    settings: z.number(),
    blocks: z.number(),
    pinAccess: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    year: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    year: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    slug: z.string().nullable(),
    title: z.string().nullable(),
    shortTitle: z.string().nullable(),
    year: z.number().int().nullable(),
    summary: z.string().nullable(),
    orderRank: z.string().nullable(),
    backgroundColor: z.string().nullable(),
    textColor: z.string().nullable(),
    fontFamily: z.string().nullable(),
    settings: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    slug: z.string().nullable(),
    title: z.string().nullable(),
    shortTitle: z.string().nullable(),
    year: z.number().int().nullable(),
    summary: z.string().nullable(),
    orderRank: z.string().nullable(),
    backgroundColor: z.string().nullable(),
    textColor: z.string().nullable(),
    fontFamily: z.string().nullable(),
    settings: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});
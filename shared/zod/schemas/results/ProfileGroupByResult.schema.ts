import * as z from 'zod';
export const ProfileGroupByResultSchema = z.array(z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  contactsJson: z.string(),
  projectsJson: z.string(),
  socialsJson: z.string(),
  logoUrl: z.string(),
  logoText: z.string(),
  lockedCaseMessage: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    title: z.number(),
    description: z.number(),
    contactsJson: z.number(),
    projectsJson: z.number(),
    socialsJson: z.number(),
    logoUrl: z.number(),
    logoText: z.number(),
    lockedCaseMessage: z.number(),
    createdAt: z.number(),
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
    title: z.string().nullable(),
    description: z.string().nullable(),
    contactsJson: z.string().nullable(),
    projectsJson: z.string().nullable(),
    socialsJson: z.string().nullable(),
    logoUrl: z.string().nullable(),
    logoText: z.string().nullable(),
    lockedCaseMessage: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    title: z.string().nullable(),
    description: z.string().nullable(),
    contactsJson: z.string().nullable(),
    projectsJson: z.string().nullable(),
    socialsJson: z.string().nullable(),
    logoUrl: z.string().nullable(),
    logoText: z.string().nullable(),
    lockedCaseMessage: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));
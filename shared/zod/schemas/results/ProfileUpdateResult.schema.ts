import * as z from 'zod';
export const ProfileUpdateResultSchema = z.nullable(z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  contactsJson: z.string(),
  projectsJson: z.string(),
  socialsJson: z.string(),
  logoUrl: z.string().optional(),
  logoText: z.string().optional(),
  lockedCaseMessage: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}));
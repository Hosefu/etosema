import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string(),
  contactsJson: z.string(),
  projectsJson: z.string(),
  socialsJson: z.string(),
  logoUrl: z.string().optional().nullable(),
  logoText: z.string().optional().nullable(),
  lockedCaseMessage: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const ProfileCreateManyInputObjectSchema: z.ZodType<Prisma.ProfileCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.ProfileCreateManyInput>;
export const ProfileCreateManyInputObjectZodSchema = makeSchema();

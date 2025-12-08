import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  contactsJson: z.boolean().optional(),
  projectsJson: z.boolean().optional(),
  socialsJson: z.boolean().optional(),
  logoUrl: z.boolean().optional(),
  logoText: z.boolean().optional(),
  lockedCaseMessage: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const ProfileSelectObjectSchema: z.ZodType<Prisma.ProfileSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProfileSelect>;
export const ProfileSelectObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  title: z.literal(true).optional(),
  description: z.literal(true).optional(),
  contactsJson: z.literal(true).optional(),
  projectsJson: z.literal(true).optional(),
  socialsJson: z.literal(true).optional(),
  logoUrl: z.literal(true).optional(),
  logoText: z.literal(true).optional(),
  lockedCaseMessage: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const ProfileMinAggregateInputObjectSchema: z.ZodType<Prisma.ProfileMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProfileMinAggregateInputType>;
export const ProfileMinAggregateInputObjectZodSchema = makeSchema();

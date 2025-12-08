import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProfileSelectObjectSchema as ProfileSelectObjectSchema } from './ProfileSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ProfileSelectObjectSchema).optional()
}).strict();
export const ProfileArgsObjectSchema = makeSchema();
export const ProfileArgsObjectZodSchema = makeSchema();

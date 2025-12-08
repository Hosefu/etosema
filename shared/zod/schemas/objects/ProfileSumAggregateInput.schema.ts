import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional()
}).strict();
export const ProfileSumAggregateInputObjectSchema: z.ZodType<Prisma.ProfileSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProfileSumAggregateInputType>;
export const ProfileSumAggregateInputObjectZodSchema = makeSchema();

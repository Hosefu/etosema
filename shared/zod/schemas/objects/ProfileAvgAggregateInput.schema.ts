import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional()
}).strict();
export const ProfileAvgAggregateInputObjectSchema: z.ZodType<Prisma.ProfileAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProfileAvgAggregateInputType>;
export const ProfileAvgAggregateInputObjectZodSchema = makeSchema();

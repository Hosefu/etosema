import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional()
}).strict();
export const ProfileWhereUniqueInputObjectSchema: z.ZodType<Prisma.ProfileWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProfileWhereUniqueInput>;
export const ProfileWhereUniqueInputObjectZodSchema = makeSchema();

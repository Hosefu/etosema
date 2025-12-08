import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const CaseBlockMediaWhereUniqueInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaWhereUniqueInput>;
export const CaseBlockMediaWhereUniqueInputObjectZodSchema = makeSchema();

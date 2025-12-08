import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const CaseBlockWhereUniqueInputObjectSchema: z.ZodType<Prisma.CaseBlockWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockWhereUniqueInput>;
export const CaseBlockWhereUniqueInputObjectZodSchema = makeSchema();

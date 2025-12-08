import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const FontWhereUniqueInputObjectSchema: z.ZodType<Prisma.FontWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.FontWhereUniqueInput>;
export const FontWhereUniqueInputObjectZodSchema = makeSchema();

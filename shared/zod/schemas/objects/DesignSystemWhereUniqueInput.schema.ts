import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional()
}).strict();
export const DesignSystemWhereUniqueInputObjectSchema: z.ZodType<Prisma.DesignSystemWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.DesignSystemWhereUniqueInput>;
export const DesignSystemWhereUniqueInputObjectZodSchema = makeSchema();

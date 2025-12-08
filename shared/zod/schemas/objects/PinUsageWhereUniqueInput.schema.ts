import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const PinUsageWhereUniqueInputObjectSchema: z.ZodType<Prisma.PinUsageWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PinUsageWhereUniqueInput>;
export const PinUsageWhereUniqueInputObjectZodSchema = makeSchema();

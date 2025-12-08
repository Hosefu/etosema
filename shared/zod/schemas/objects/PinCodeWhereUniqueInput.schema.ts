import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  codeHash: z.string().optional(),
  shortCode: z.string().optional()
}).strict();
export const PinCodeWhereUniqueInputObjectSchema: z.ZodType<Prisma.PinCodeWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeWhereUniqueInput>;
export const PinCodeWhereUniqueInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  label: z.string().optional().nullable(),
  codeHash: z.string(),
  code: z.string().optional().nullable(),
  shortCode: z.string().optional().nullable(),
  accessAll: z.boolean().optional(),
  expiresAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const PinCodeCreateManyInputObjectSchema: z.ZodType<Prisma.PinCodeCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCreateManyInput>;
export const PinCodeCreateManyInputObjectZodSchema = makeSchema();

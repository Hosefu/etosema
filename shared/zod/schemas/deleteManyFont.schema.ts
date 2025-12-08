import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FontWhereInputObjectSchema as FontWhereInputObjectSchema } from './objects/FontWhereInput.schema';

export const FontDeleteManySchema: z.ZodType<Prisma.FontDeleteManyArgs> = z.object({ where: FontWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FontDeleteManyArgs>;

export const FontDeleteManyZodSchema = z.object({ where: FontWhereInputObjectSchema.optional() }).strict();
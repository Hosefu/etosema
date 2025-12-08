import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FontSelectObjectSchema as FontSelectObjectSchema } from './objects/FontSelect.schema';
import { FontWhereUniqueInputObjectSchema as FontWhereUniqueInputObjectSchema } from './objects/FontWhereUniqueInput.schema';

export const FontDeleteOneSchema: z.ZodType<Prisma.FontDeleteArgs> = z.object({ select: FontSelectObjectSchema.optional(),  where: FontWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.FontDeleteArgs>;

export const FontDeleteOneZodSchema = z.object({ select: FontSelectObjectSchema.optional(),  where: FontWhereUniqueInputObjectSchema }).strict();
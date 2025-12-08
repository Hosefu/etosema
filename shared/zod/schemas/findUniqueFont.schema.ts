import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FontSelectObjectSchema as FontSelectObjectSchema } from './objects/FontSelect.schema';
import { FontWhereUniqueInputObjectSchema as FontWhereUniqueInputObjectSchema } from './objects/FontWhereUniqueInput.schema';

export const FontFindUniqueSchema: z.ZodType<Prisma.FontFindUniqueArgs> = z.object({ select: FontSelectObjectSchema.optional(),  where: FontWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.FontFindUniqueArgs>;

export const FontFindUniqueZodSchema = z.object({ select: FontSelectObjectSchema.optional(),  where: FontWhereUniqueInputObjectSchema }).strict();
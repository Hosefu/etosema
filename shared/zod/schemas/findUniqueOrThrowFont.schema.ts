import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FontSelectObjectSchema as FontSelectObjectSchema } from './objects/FontSelect.schema';
import { FontWhereUniqueInputObjectSchema as FontWhereUniqueInputObjectSchema } from './objects/FontWhereUniqueInput.schema';

export const FontFindUniqueOrThrowSchema: z.ZodType<Prisma.FontFindUniqueOrThrowArgs> = z.object({ select: FontSelectObjectSchema.optional(),  where: FontWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.FontFindUniqueOrThrowArgs>;

export const FontFindUniqueOrThrowZodSchema = z.object({ select: FontSelectObjectSchema.optional(),  where: FontWhereUniqueInputObjectSchema }).strict();
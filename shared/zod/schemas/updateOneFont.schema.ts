import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FontSelectObjectSchema as FontSelectObjectSchema } from './objects/FontSelect.schema';
import { FontUpdateInputObjectSchema as FontUpdateInputObjectSchema } from './objects/FontUpdateInput.schema';
import { FontUncheckedUpdateInputObjectSchema as FontUncheckedUpdateInputObjectSchema } from './objects/FontUncheckedUpdateInput.schema';
import { FontWhereUniqueInputObjectSchema as FontWhereUniqueInputObjectSchema } from './objects/FontWhereUniqueInput.schema';

export const FontUpdateOneSchema: z.ZodType<Prisma.FontUpdateArgs> = z.object({ select: FontSelectObjectSchema.optional(),  data: z.union([FontUpdateInputObjectSchema, FontUncheckedUpdateInputObjectSchema]), where: FontWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.FontUpdateArgs>;

export const FontUpdateOneZodSchema = z.object({ select: FontSelectObjectSchema.optional(),  data: z.union([FontUpdateInputObjectSchema, FontUncheckedUpdateInputObjectSchema]), where: FontWhereUniqueInputObjectSchema }).strict();
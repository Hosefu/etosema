import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FontSelectObjectSchema as FontSelectObjectSchema } from './objects/FontSelect.schema';
import { FontWhereUniqueInputObjectSchema as FontWhereUniqueInputObjectSchema } from './objects/FontWhereUniqueInput.schema';
import { FontCreateInputObjectSchema as FontCreateInputObjectSchema } from './objects/FontCreateInput.schema';
import { FontUncheckedCreateInputObjectSchema as FontUncheckedCreateInputObjectSchema } from './objects/FontUncheckedCreateInput.schema';
import { FontUpdateInputObjectSchema as FontUpdateInputObjectSchema } from './objects/FontUpdateInput.schema';
import { FontUncheckedUpdateInputObjectSchema as FontUncheckedUpdateInputObjectSchema } from './objects/FontUncheckedUpdateInput.schema';

export const FontUpsertOneSchema: z.ZodType<Prisma.FontUpsertArgs> = z.object({ select: FontSelectObjectSchema.optional(),  where: FontWhereUniqueInputObjectSchema, create: z.union([ FontCreateInputObjectSchema, FontUncheckedCreateInputObjectSchema ]), update: z.union([ FontUpdateInputObjectSchema, FontUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.FontUpsertArgs>;

export const FontUpsertOneZodSchema = z.object({ select: FontSelectObjectSchema.optional(),  where: FontWhereUniqueInputObjectSchema, create: z.union([ FontCreateInputObjectSchema, FontUncheckedCreateInputObjectSchema ]), update: z.union([ FontUpdateInputObjectSchema, FontUncheckedUpdateInputObjectSchema ]) }).strict();
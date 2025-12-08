import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FontUpdateManyMutationInputObjectSchema as FontUpdateManyMutationInputObjectSchema } from './objects/FontUpdateManyMutationInput.schema';
import { FontWhereInputObjectSchema as FontWhereInputObjectSchema } from './objects/FontWhereInput.schema';

export const FontUpdateManySchema: z.ZodType<Prisma.FontUpdateManyArgs> = z.object({ data: FontUpdateManyMutationInputObjectSchema, where: FontWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FontUpdateManyArgs>;

export const FontUpdateManyZodSchema = z.object({ data: FontUpdateManyMutationInputObjectSchema, where: FontWhereInputObjectSchema.optional() }).strict();
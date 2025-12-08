import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FontSelectObjectSchema as FontSelectObjectSchema } from './objects/FontSelect.schema';
import { FontCreateInputObjectSchema as FontCreateInputObjectSchema } from './objects/FontCreateInput.schema';
import { FontUncheckedCreateInputObjectSchema as FontUncheckedCreateInputObjectSchema } from './objects/FontUncheckedCreateInput.schema';

export const FontCreateOneSchema: z.ZodType<Prisma.FontCreateArgs> = z.object({ select: FontSelectObjectSchema.optional(),  data: z.union([FontCreateInputObjectSchema, FontUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.FontCreateArgs>;

export const FontCreateOneZodSchema = z.object({ select: FontSelectObjectSchema.optional(),  data: z.union([FontCreateInputObjectSchema, FontUncheckedCreateInputObjectSchema]) }).strict();
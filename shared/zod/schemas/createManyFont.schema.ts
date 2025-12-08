import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FontCreateManyInputObjectSchema as FontCreateManyInputObjectSchema } from './objects/FontCreateManyInput.schema';

export const FontCreateManySchema: z.ZodType<Prisma.FontCreateManyArgs> = z.object({ data: z.union([ FontCreateManyInputObjectSchema, z.array(FontCreateManyInputObjectSchema) ]),  }).strict() as unknown as z.ZodType<Prisma.FontCreateManyArgs>;

export const FontCreateManyZodSchema = z.object({ data: z.union([ FontCreateManyInputObjectSchema, z.array(FontCreateManyInputObjectSchema) ]),  }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinCodeCreateManyInputObjectSchema as PinCodeCreateManyInputObjectSchema } from './objects/PinCodeCreateManyInput.schema';

export const PinCodeCreateManySchema: z.ZodType<Prisma.PinCodeCreateManyArgs> = z.object({ data: z.union([ PinCodeCreateManyInputObjectSchema, z.array(PinCodeCreateManyInputObjectSchema) ]),  }).strict() as unknown as z.ZodType<Prisma.PinCodeCreateManyArgs>;

export const PinCodeCreateManyZodSchema = z.object({ data: z.union([ PinCodeCreateManyInputObjectSchema, z.array(PinCodeCreateManyInputObjectSchema) ]),  }).strict();
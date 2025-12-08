import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinCodeCaseCreateManyInputObjectSchema as PinCodeCaseCreateManyInputObjectSchema } from './objects/PinCodeCaseCreateManyInput.schema';

export const PinCodeCaseCreateManySchema: z.ZodType<Prisma.PinCodeCaseCreateManyArgs> = z.object({ data: z.union([ PinCodeCaseCreateManyInputObjectSchema, z.array(PinCodeCaseCreateManyInputObjectSchema) ]),  }).strict() as unknown as z.ZodType<Prisma.PinCodeCaseCreateManyArgs>;

export const PinCodeCaseCreateManyZodSchema = z.object({ data: z.union([ PinCodeCaseCreateManyInputObjectSchema, z.array(PinCodeCaseCreateManyInputObjectSchema) ]),  }).strict();
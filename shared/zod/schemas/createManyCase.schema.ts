import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseCreateManyInputObjectSchema as CaseCreateManyInputObjectSchema } from './objects/CaseCreateManyInput.schema';

export const CaseCreateManySchema: z.ZodType<Prisma.CaseCreateManyArgs> = z.object({ data: z.union([ CaseCreateManyInputObjectSchema, z.array(CaseCreateManyInputObjectSchema) ]),  }).strict() as unknown as z.ZodType<Prisma.CaseCreateManyArgs>;

export const CaseCreateManyZodSchema = z.object({ data: z.union([ CaseCreateManyInputObjectSchema, z.array(CaseCreateManyInputObjectSchema) ]),  }).strict();
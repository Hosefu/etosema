import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseBlockMediaCreateManyInputObjectSchema as CaseBlockMediaCreateManyInputObjectSchema } from './objects/CaseBlockMediaCreateManyInput.schema';

export const CaseBlockMediaCreateManySchema: z.ZodType<Prisma.CaseBlockMediaCreateManyArgs> = z.object({ data: z.union([ CaseBlockMediaCreateManyInputObjectSchema, z.array(CaseBlockMediaCreateManyInputObjectSchema) ]),  }).strict() as unknown as z.ZodType<Prisma.CaseBlockMediaCreateManyArgs>;

export const CaseBlockMediaCreateManyZodSchema = z.object({ data: z.union([ CaseBlockMediaCreateManyInputObjectSchema, z.array(CaseBlockMediaCreateManyInputObjectSchema) ]),  }).strict();
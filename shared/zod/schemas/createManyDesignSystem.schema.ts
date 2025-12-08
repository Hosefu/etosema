import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DesignSystemCreateManyInputObjectSchema as DesignSystemCreateManyInputObjectSchema } from './objects/DesignSystemCreateManyInput.schema';

export const DesignSystemCreateManySchema: z.ZodType<Prisma.DesignSystemCreateManyArgs> = z.object({ data: z.union([ DesignSystemCreateManyInputObjectSchema, z.array(DesignSystemCreateManyInputObjectSchema) ]),  }).strict() as unknown as z.ZodType<Prisma.DesignSystemCreateManyArgs>;

export const DesignSystemCreateManyZodSchema = z.object({ data: z.union([ DesignSystemCreateManyInputObjectSchema, z.array(DesignSystemCreateManyInputObjectSchema) ]),  }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DesignSystemWhereInputObjectSchema as DesignSystemWhereInputObjectSchema } from './objects/DesignSystemWhereInput.schema';

export const DesignSystemDeleteManySchema: z.ZodType<Prisma.DesignSystemDeleteManyArgs> = z.object({ where: DesignSystemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.DesignSystemDeleteManyArgs>;

export const DesignSystemDeleteManyZodSchema = z.object({ where: DesignSystemWhereInputObjectSchema.optional() }).strict();
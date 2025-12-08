import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DesignSystemUpdateManyMutationInputObjectSchema as DesignSystemUpdateManyMutationInputObjectSchema } from './objects/DesignSystemUpdateManyMutationInput.schema';
import { DesignSystemWhereInputObjectSchema as DesignSystemWhereInputObjectSchema } from './objects/DesignSystemWhereInput.schema';

export const DesignSystemUpdateManySchema: z.ZodType<Prisma.DesignSystemUpdateManyArgs> = z.object({ data: DesignSystemUpdateManyMutationInputObjectSchema, where: DesignSystemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.DesignSystemUpdateManyArgs>;

export const DesignSystemUpdateManyZodSchema = z.object({ data: DesignSystemUpdateManyMutationInputObjectSchema, where: DesignSystemWhereInputObjectSchema.optional() }).strict();
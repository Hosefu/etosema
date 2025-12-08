import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DesignSystemSelectObjectSchema as DesignSystemSelectObjectSchema } from './objects/DesignSystemSelect.schema';
import { DesignSystemUpdateInputObjectSchema as DesignSystemUpdateInputObjectSchema } from './objects/DesignSystemUpdateInput.schema';
import { DesignSystemUncheckedUpdateInputObjectSchema as DesignSystemUncheckedUpdateInputObjectSchema } from './objects/DesignSystemUncheckedUpdateInput.schema';
import { DesignSystemWhereUniqueInputObjectSchema as DesignSystemWhereUniqueInputObjectSchema } from './objects/DesignSystemWhereUniqueInput.schema';

export const DesignSystemUpdateOneSchema: z.ZodType<Prisma.DesignSystemUpdateArgs> = z.object({ select: DesignSystemSelectObjectSchema.optional(),  data: z.union([DesignSystemUpdateInputObjectSchema, DesignSystemUncheckedUpdateInputObjectSchema]), where: DesignSystemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.DesignSystemUpdateArgs>;

export const DesignSystemUpdateOneZodSchema = z.object({ select: DesignSystemSelectObjectSchema.optional(),  data: z.union([DesignSystemUpdateInputObjectSchema, DesignSystemUncheckedUpdateInputObjectSchema]), where: DesignSystemWhereUniqueInputObjectSchema }).strict();
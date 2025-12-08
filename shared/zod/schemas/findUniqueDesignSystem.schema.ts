import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DesignSystemSelectObjectSchema as DesignSystemSelectObjectSchema } from './objects/DesignSystemSelect.schema';
import { DesignSystemWhereUniqueInputObjectSchema as DesignSystemWhereUniqueInputObjectSchema } from './objects/DesignSystemWhereUniqueInput.schema';

export const DesignSystemFindUniqueSchema: z.ZodType<Prisma.DesignSystemFindUniqueArgs> = z.object({ select: DesignSystemSelectObjectSchema.optional(),  where: DesignSystemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.DesignSystemFindUniqueArgs>;

export const DesignSystemFindUniqueZodSchema = z.object({ select: DesignSystemSelectObjectSchema.optional(),  where: DesignSystemWhereUniqueInputObjectSchema }).strict();
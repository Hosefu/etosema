import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DesignSystemSelectObjectSchema as DesignSystemSelectObjectSchema } from './objects/DesignSystemSelect.schema';
import { DesignSystemWhereUniqueInputObjectSchema as DesignSystemWhereUniqueInputObjectSchema } from './objects/DesignSystemWhereUniqueInput.schema';

export const DesignSystemFindUniqueOrThrowSchema: z.ZodType<Prisma.DesignSystemFindUniqueOrThrowArgs> = z.object({ select: DesignSystemSelectObjectSchema.optional(),  where: DesignSystemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.DesignSystemFindUniqueOrThrowArgs>;

export const DesignSystemFindUniqueOrThrowZodSchema = z.object({ select: DesignSystemSelectObjectSchema.optional(),  where: DesignSystemWhereUniqueInputObjectSchema }).strict();
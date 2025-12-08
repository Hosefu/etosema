import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DesignSystemSelectObjectSchema as DesignSystemSelectObjectSchema } from './objects/DesignSystemSelect.schema';
import { DesignSystemWhereUniqueInputObjectSchema as DesignSystemWhereUniqueInputObjectSchema } from './objects/DesignSystemWhereUniqueInput.schema';
import { DesignSystemCreateInputObjectSchema as DesignSystemCreateInputObjectSchema } from './objects/DesignSystemCreateInput.schema';
import { DesignSystemUncheckedCreateInputObjectSchema as DesignSystemUncheckedCreateInputObjectSchema } from './objects/DesignSystemUncheckedCreateInput.schema';
import { DesignSystemUpdateInputObjectSchema as DesignSystemUpdateInputObjectSchema } from './objects/DesignSystemUpdateInput.schema';
import { DesignSystemUncheckedUpdateInputObjectSchema as DesignSystemUncheckedUpdateInputObjectSchema } from './objects/DesignSystemUncheckedUpdateInput.schema';

export const DesignSystemUpsertOneSchema: z.ZodType<Prisma.DesignSystemUpsertArgs> = z.object({ select: DesignSystemSelectObjectSchema.optional(),  where: DesignSystemWhereUniqueInputObjectSchema, create: z.union([ DesignSystemCreateInputObjectSchema, DesignSystemUncheckedCreateInputObjectSchema ]), update: z.union([ DesignSystemUpdateInputObjectSchema, DesignSystemUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.DesignSystemUpsertArgs>;

export const DesignSystemUpsertOneZodSchema = z.object({ select: DesignSystemSelectObjectSchema.optional(),  where: DesignSystemWhereUniqueInputObjectSchema, create: z.union([ DesignSystemCreateInputObjectSchema, DesignSystemUncheckedCreateInputObjectSchema ]), update: z.union([ DesignSystemUpdateInputObjectSchema, DesignSystemUncheckedUpdateInputObjectSchema ]) }).strict();
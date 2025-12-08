import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DesignSystemSelectObjectSchema as DesignSystemSelectObjectSchema } from './objects/DesignSystemSelect.schema';
import { DesignSystemCreateInputObjectSchema as DesignSystemCreateInputObjectSchema } from './objects/DesignSystemCreateInput.schema';
import { DesignSystemUncheckedCreateInputObjectSchema as DesignSystemUncheckedCreateInputObjectSchema } from './objects/DesignSystemUncheckedCreateInput.schema';

export const DesignSystemCreateOneSchema: z.ZodType<Prisma.DesignSystemCreateArgs> = z.object({ select: DesignSystemSelectObjectSchema.optional(),  data: z.union([DesignSystemCreateInputObjectSchema, DesignSystemUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.DesignSystemCreateArgs>;

export const DesignSystemCreateOneZodSchema = z.object({ select: DesignSystemSelectObjectSchema.optional(),  data: z.union([DesignSystemCreateInputObjectSchema, DesignSystemUncheckedCreateInputObjectSchema]) }).strict();
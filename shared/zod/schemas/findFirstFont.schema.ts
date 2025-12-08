import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FontOrderByWithRelationInputObjectSchema as FontOrderByWithRelationInputObjectSchema } from './objects/FontOrderByWithRelationInput.schema';
import { FontWhereInputObjectSchema as FontWhereInputObjectSchema } from './objects/FontWhereInput.schema';
import { FontWhereUniqueInputObjectSchema as FontWhereUniqueInputObjectSchema } from './objects/FontWhereUniqueInput.schema';
import { FontScalarFieldEnumSchema } from './enums/FontScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const FontFindFirstSelectSchema: z.ZodType<Prisma.FontSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    family: z.boolean().optional(),
    url: z.boolean().optional(),
    format: z.boolean().optional(),
    weight: z.boolean().optional(),
    style: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.FontSelect>;

export const FontFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    family: z.boolean().optional(),
    url: z.boolean().optional(),
    format: z.boolean().optional(),
    weight: z.boolean().optional(),
    style: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const FontFindFirstSchema: z.ZodType<Prisma.FontFindFirstArgs> = z.object({ select: FontFindFirstSelectSchema.optional(),  orderBy: z.union([FontOrderByWithRelationInputObjectSchema, FontOrderByWithRelationInputObjectSchema.array()]).optional(), where: FontWhereInputObjectSchema.optional(), cursor: FontWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([FontScalarFieldEnumSchema, FontScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.FontFindFirstArgs>;

export const FontFindFirstZodSchema = z.object({ select: FontFindFirstSelectSchema.optional(),  orderBy: z.union([FontOrderByWithRelationInputObjectSchema, FontOrderByWithRelationInputObjectSchema.array()]).optional(), where: FontWhereInputObjectSchema.optional(), cursor: FontWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([FontScalarFieldEnumSchema, FontScalarFieldEnumSchema.array()]).optional() }).strict();
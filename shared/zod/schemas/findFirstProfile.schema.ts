import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProfileOrderByWithRelationInputObjectSchema as ProfileOrderByWithRelationInputObjectSchema } from './objects/ProfileOrderByWithRelationInput.schema';
import { ProfileWhereInputObjectSchema as ProfileWhereInputObjectSchema } from './objects/ProfileWhereInput.schema';
import { ProfileWhereUniqueInputObjectSchema as ProfileWhereUniqueInputObjectSchema } from './objects/ProfileWhereUniqueInput.schema';
import { ProfileScalarFieldEnumSchema } from './enums/ProfileScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ProfileFindFirstSelectSchema: z.ZodType<Prisma.ProfileSelect> = z.object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    description: z.boolean().optional(),
    contactsJson: z.boolean().optional(),
    projectsJson: z.boolean().optional(),
    socialsJson: z.boolean().optional(),
    logoUrl: z.boolean().optional(),
    logoText: z.boolean().optional(),
    lockedCaseMessage: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ProfileSelect>;

export const ProfileFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    description: z.boolean().optional(),
    contactsJson: z.boolean().optional(),
    projectsJson: z.boolean().optional(),
    socialsJson: z.boolean().optional(),
    logoUrl: z.boolean().optional(),
    logoText: z.boolean().optional(),
    lockedCaseMessage: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const ProfileFindFirstSchema: z.ZodType<Prisma.ProfileFindFirstArgs> = z.object({ select: ProfileFindFirstSelectSchema.optional(),  orderBy: z.union([ProfileOrderByWithRelationInputObjectSchema, ProfileOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProfileWhereInputObjectSchema.optional(), cursor: ProfileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProfileScalarFieldEnumSchema, ProfileScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ProfileFindFirstArgs>;

export const ProfileFindFirstZodSchema = z.object({ select: ProfileFindFirstSelectSchema.optional(),  orderBy: z.union([ProfileOrderByWithRelationInputObjectSchema, ProfileOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProfileWhereInputObjectSchema.optional(), cursor: ProfileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProfileScalarFieldEnumSchema, ProfileScalarFieldEnumSchema.array()]).optional() }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseBlockMediaSelectObjectSchema as CaseBlockMediaSelectObjectSchema } from './objects/CaseBlockMediaSelect.schema';
import { CaseBlockMediaIncludeObjectSchema as CaseBlockMediaIncludeObjectSchema } from './objects/CaseBlockMediaInclude.schema';
import { CaseBlockMediaWhereUniqueInputObjectSchema as CaseBlockMediaWhereUniqueInputObjectSchema } from './objects/CaseBlockMediaWhereUniqueInput.schema';

export const CaseBlockMediaDeleteOneSchema: z.ZodType<Prisma.CaseBlockMediaDeleteArgs> = z.object({ select: CaseBlockMediaSelectObjectSchema.optional(), include: CaseBlockMediaIncludeObjectSchema.optional(), where: CaseBlockMediaWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseBlockMediaDeleteArgs>;

export const CaseBlockMediaDeleteOneZodSchema = z.object({ select: CaseBlockMediaSelectObjectSchema.optional(), include: CaseBlockMediaIncludeObjectSchema.optional(), where: CaseBlockMediaWhereUniqueInputObjectSchema }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseBlockMediaSelectObjectSchema as CaseBlockMediaSelectObjectSchema } from './objects/CaseBlockMediaSelect.schema';
import { CaseBlockMediaIncludeObjectSchema as CaseBlockMediaIncludeObjectSchema } from './objects/CaseBlockMediaInclude.schema';
import { CaseBlockMediaUpdateInputObjectSchema as CaseBlockMediaUpdateInputObjectSchema } from './objects/CaseBlockMediaUpdateInput.schema';
import { CaseBlockMediaUncheckedUpdateInputObjectSchema as CaseBlockMediaUncheckedUpdateInputObjectSchema } from './objects/CaseBlockMediaUncheckedUpdateInput.schema';
import { CaseBlockMediaWhereUniqueInputObjectSchema as CaseBlockMediaWhereUniqueInputObjectSchema } from './objects/CaseBlockMediaWhereUniqueInput.schema';

export const CaseBlockMediaUpdateOneSchema: z.ZodType<Prisma.CaseBlockMediaUpdateArgs> = z.object({ select: CaseBlockMediaSelectObjectSchema.optional(), include: CaseBlockMediaIncludeObjectSchema.optional(), data: z.union([CaseBlockMediaUpdateInputObjectSchema, CaseBlockMediaUncheckedUpdateInputObjectSchema]), where: CaseBlockMediaWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseBlockMediaUpdateArgs>;

export const CaseBlockMediaUpdateOneZodSchema = z.object({ select: CaseBlockMediaSelectObjectSchema.optional(), include: CaseBlockMediaIncludeObjectSchema.optional(), data: z.union([CaseBlockMediaUpdateInputObjectSchema, CaseBlockMediaUncheckedUpdateInputObjectSchema]), where: CaseBlockMediaWhereUniqueInputObjectSchema }).strict();
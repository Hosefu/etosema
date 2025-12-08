import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseBlockSelectObjectSchema as CaseBlockSelectObjectSchema } from './objects/CaseBlockSelect.schema';
import { CaseBlockIncludeObjectSchema as CaseBlockIncludeObjectSchema } from './objects/CaseBlockInclude.schema';
import { CaseBlockUpdateInputObjectSchema as CaseBlockUpdateInputObjectSchema } from './objects/CaseBlockUpdateInput.schema';
import { CaseBlockUncheckedUpdateInputObjectSchema as CaseBlockUncheckedUpdateInputObjectSchema } from './objects/CaseBlockUncheckedUpdateInput.schema';
import { CaseBlockWhereUniqueInputObjectSchema as CaseBlockWhereUniqueInputObjectSchema } from './objects/CaseBlockWhereUniqueInput.schema';

export const CaseBlockUpdateOneSchema: z.ZodType<Prisma.CaseBlockUpdateArgs> = z.object({ select: CaseBlockSelectObjectSchema.optional(), include: CaseBlockIncludeObjectSchema.optional(), data: z.union([CaseBlockUpdateInputObjectSchema, CaseBlockUncheckedUpdateInputObjectSchema]), where: CaseBlockWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseBlockUpdateArgs>;

export const CaseBlockUpdateOneZodSchema = z.object({ select: CaseBlockSelectObjectSchema.optional(), include: CaseBlockIncludeObjectSchema.optional(), data: z.union([CaseBlockUpdateInputObjectSchema, CaseBlockUncheckedUpdateInputObjectSchema]), where: CaseBlockWhereUniqueInputObjectSchema }).strict();
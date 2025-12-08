import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseBlockSelectObjectSchema as CaseBlockSelectObjectSchema } from './objects/CaseBlockSelect.schema';
import { CaseBlockIncludeObjectSchema as CaseBlockIncludeObjectSchema } from './objects/CaseBlockInclude.schema';
import { CaseBlockWhereUniqueInputObjectSchema as CaseBlockWhereUniqueInputObjectSchema } from './objects/CaseBlockWhereUniqueInput.schema';
import { CaseBlockCreateInputObjectSchema as CaseBlockCreateInputObjectSchema } from './objects/CaseBlockCreateInput.schema';
import { CaseBlockUncheckedCreateInputObjectSchema as CaseBlockUncheckedCreateInputObjectSchema } from './objects/CaseBlockUncheckedCreateInput.schema';
import { CaseBlockUpdateInputObjectSchema as CaseBlockUpdateInputObjectSchema } from './objects/CaseBlockUpdateInput.schema';
import { CaseBlockUncheckedUpdateInputObjectSchema as CaseBlockUncheckedUpdateInputObjectSchema } from './objects/CaseBlockUncheckedUpdateInput.schema';

export const CaseBlockUpsertOneSchema: z.ZodType<Prisma.CaseBlockUpsertArgs> = z.object({ select: CaseBlockSelectObjectSchema.optional(), include: CaseBlockIncludeObjectSchema.optional(), where: CaseBlockWhereUniqueInputObjectSchema, create: z.union([ CaseBlockCreateInputObjectSchema, CaseBlockUncheckedCreateInputObjectSchema ]), update: z.union([ CaseBlockUpdateInputObjectSchema, CaseBlockUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CaseBlockUpsertArgs>;

export const CaseBlockUpsertOneZodSchema = z.object({ select: CaseBlockSelectObjectSchema.optional(), include: CaseBlockIncludeObjectSchema.optional(), where: CaseBlockWhereUniqueInputObjectSchema, create: z.union([ CaseBlockCreateInputObjectSchema, CaseBlockUncheckedCreateInputObjectSchema ]), update: z.union([ CaseBlockUpdateInputObjectSchema, CaseBlockUncheckedUpdateInputObjectSchema ]) }).strict();
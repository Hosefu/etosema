import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseBlockMediaSelectObjectSchema as CaseBlockMediaSelectObjectSchema } from './objects/CaseBlockMediaSelect.schema';
import { CaseBlockMediaIncludeObjectSchema as CaseBlockMediaIncludeObjectSchema } from './objects/CaseBlockMediaInclude.schema';
import { CaseBlockMediaWhereUniqueInputObjectSchema as CaseBlockMediaWhereUniqueInputObjectSchema } from './objects/CaseBlockMediaWhereUniqueInput.schema';
import { CaseBlockMediaCreateInputObjectSchema as CaseBlockMediaCreateInputObjectSchema } from './objects/CaseBlockMediaCreateInput.schema';
import { CaseBlockMediaUncheckedCreateInputObjectSchema as CaseBlockMediaUncheckedCreateInputObjectSchema } from './objects/CaseBlockMediaUncheckedCreateInput.schema';
import { CaseBlockMediaUpdateInputObjectSchema as CaseBlockMediaUpdateInputObjectSchema } from './objects/CaseBlockMediaUpdateInput.schema';
import { CaseBlockMediaUncheckedUpdateInputObjectSchema as CaseBlockMediaUncheckedUpdateInputObjectSchema } from './objects/CaseBlockMediaUncheckedUpdateInput.schema';

export const CaseBlockMediaUpsertOneSchema: z.ZodType<Prisma.CaseBlockMediaUpsertArgs> = z.object({ select: CaseBlockMediaSelectObjectSchema.optional(), include: CaseBlockMediaIncludeObjectSchema.optional(), where: CaseBlockMediaWhereUniqueInputObjectSchema, create: z.union([ CaseBlockMediaCreateInputObjectSchema, CaseBlockMediaUncheckedCreateInputObjectSchema ]), update: z.union([ CaseBlockMediaUpdateInputObjectSchema, CaseBlockMediaUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CaseBlockMediaUpsertArgs>;

export const CaseBlockMediaUpsertOneZodSchema = z.object({ select: CaseBlockMediaSelectObjectSchema.optional(), include: CaseBlockMediaIncludeObjectSchema.optional(), where: CaseBlockMediaWhereUniqueInputObjectSchema, create: z.union([ CaseBlockMediaCreateInputObjectSchema, CaseBlockMediaUncheckedCreateInputObjectSchema ]), update: z.union([ CaseBlockMediaUpdateInputObjectSchema, CaseBlockMediaUncheckedUpdateInputObjectSchema ]) }).strict();
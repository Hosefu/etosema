import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseBlockSelectObjectSchema as CaseBlockSelectObjectSchema } from './objects/CaseBlockSelect.schema';
import { CaseBlockIncludeObjectSchema as CaseBlockIncludeObjectSchema } from './objects/CaseBlockInclude.schema';
import { CaseBlockCreateInputObjectSchema as CaseBlockCreateInputObjectSchema } from './objects/CaseBlockCreateInput.schema';
import { CaseBlockUncheckedCreateInputObjectSchema as CaseBlockUncheckedCreateInputObjectSchema } from './objects/CaseBlockUncheckedCreateInput.schema';

export const CaseBlockCreateOneSchema: z.ZodType<Prisma.CaseBlockCreateArgs> = z.object({ select: CaseBlockSelectObjectSchema.optional(), include: CaseBlockIncludeObjectSchema.optional(), data: z.union([CaseBlockCreateInputObjectSchema, CaseBlockUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CaseBlockCreateArgs>;

export const CaseBlockCreateOneZodSchema = z.object({ select: CaseBlockSelectObjectSchema.optional(), include: CaseBlockIncludeObjectSchema.optional(), data: z.union([CaseBlockCreateInputObjectSchema, CaseBlockUncheckedCreateInputObjectSchema]) }).strict();
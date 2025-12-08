import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseBlockMediaSelectObjectSchema as CaseBlockMediaSelectObjectSchema } from './objects/CaseBlockMediaSelect.schema';
import { CaseBlockMediaIncludeObjectSchema as CaseBlockMediaIncludeObjectSchema } from './objects/CaseBlockMediaInclude.schema';
import { CaseBlockMediaCreateInputObjectSchema as CaseBlockMediaCreateInputObjectSchema } from './objects/CaseBlockMediaCreateInput.schema';
import { CaseBlockMediaUncheckedCreateInputObjectSchema as CaseBlockMediaUncheckedCreateInputObjectSchema } from './objects/CaseBlockMediaUncheckedCreateInput.schema';

export const CaseBlockMediaCreateOneSchema: z.ZodType<Prisma.CaseBlockMediaCreateArgs> = z.object({ select: CaseBlockMediaSelectObjectSchema.optional(), include: CaseBlockMediaIncludeObjectSchema.optional(), data: z.union([CaseBlockMediaCreateInputObjectSchema, CaseBlockMediaUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CaseBlockMediaCreateArgs>;

export const CaseBlockMediaCreateOneZodSchema = z.object({ select: CaseBlockMediaSelectObjectSchema.optional(), include: CaseBlockMediaIncludeObjectSchema.optional(), data: z.union([CaseBlockMediaCreateInputObjectSchema, CaseBlockMediaUncheckedCreateInputObjectSchema]) }).strict();
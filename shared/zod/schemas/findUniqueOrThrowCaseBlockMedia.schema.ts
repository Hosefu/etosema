import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseBlockMediaSelectObjectSchema as CaseBlockMediaSelectObjectSchema } from './objects/CaseBlockMediaSelect.schema';
import { CaseBlockMediaIncludeObjectSchema as CaseBlockMediaIncludeObjectSchema } from './objects/CaseBlockMediaInclude.schema';
import { CaseBlockMediaWhereUniqueInputObjectSchema as CaseBlockMediaWhereUniqueInputObjectSchema } from './objects/CaseBlockMediaWhereUniqueInput.schema';

export const CaseBlockMediaFindUniqueOrThrowSchema: z.ZodType<Prisma.CaseBlockMediaFindUniqueOrThrowArgs> = z.object({ select: CaseBlockMediaSelectObjectSchema.optional(), include: CaseBlockMediaIncludeObjectSchema.optional(), where: CaseBlockMediaWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseBlockMediaFindUniqueOrThrowArgs>;

export const CaseBlockMediaFindUniqueOrThrowZodSchema = z.object({ select: CaseBlockMediaSelectObjectSchema.optional(), include: CaseBlockMediaIncludeObjectSchema.optional(), where: CaseBlockMediaWhereUniqueInputObjectSchema }).strict();
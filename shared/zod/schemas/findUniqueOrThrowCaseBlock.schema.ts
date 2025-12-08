import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseBlockSelectObjectSchema as CaseBlockSelectObjectSchema } from './objects/CaseBlockSelect.schema';
import { CaseBlockIncludeObjectSchema as CaseBlockIncludeObjectSchema } from './objects/CaseBlockInclude.schema';
import { CaseBlockWhereUniqueInputObjectSchema as CaseBlockWhereUniqueInputObjectSchema } from './objects/CaseBlockWhereUniqueInput.schema';

export const CaseBlockFindUniqueOrThrowSchema: z.ZodType<Prisma.CaseBlockFindUniqueOrThrowArgs> = z.object({ select: CaseBlockSelectObjectSchema.optional(), include: CaseBlockIncludeObjectSchema.optional(), where: CaseBlockWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseBlockFindUniqueOrThrowArgs>;

export const CaseBlockFindUniqueOrThrowZodSchema = z.object({ select: CaseBlockSelectObjectSchema.optional(), include: CaseBlockIncludeObjectSchema.optional(), where: CaseBlockWhereUniqueInputObjectSchema }).strict();
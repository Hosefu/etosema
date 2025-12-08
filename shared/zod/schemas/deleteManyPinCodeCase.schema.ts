import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinCodeCaseWhereInputObjectSchema as PinCodeCaseWhereInputObjectSchema } from './objects/PinCodeCaseWhereInput.schema';

export const PinCodeCaseDeleteManySchema: z.ZodType<Prisma.PinCodeCaseDeleteManyArgs> = z.object({ where: PinCodeCaseWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PinCodeCaseDeleteManyArgs>;

export const PinCodeCaseDeleteManyZodSchema = z.object({ where: PinCodeCaseWhereInputObjectSchema.optional() }).strict();
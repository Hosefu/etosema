import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinCodeWhereInputObjectSchema as PinCodeWhereInputObjectSchema } from './objects/PinCodeWhereInput.schema';

export const PinCodeDeleteManySchema: z.ZodType<Prisma.PinCodeDeleteManyArgs> = z.object({ where: PinCodeWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PinCodeDeleteManyArgs>;

export const PinCodeDeleteManyZodSchema = z.object({ where: PinCodeWhereInputObjectSchema.optional() }).strict();
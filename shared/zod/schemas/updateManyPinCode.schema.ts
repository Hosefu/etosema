import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinCodeUpdateManyMutationInputObjectSchema as PinCodeUpdateManyMutationInputObjectSchema } from './objects/PinCodeUpdateManyMutationInput.schema';
import { PinCodeWhereInputObjectSchema as PinCodeWhereInputObjectSchema } from './objects/PinCodeWhereInput.schema';

export const PinCodeUpdateManySchema: z.ZodType<Prisma.PinCodeUpdateManyArgs> = z.object({ data: PinCodeUpdateManyMutationInputObjectSchema, where: PinCodeWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PinCodeUpdateManyArgs>;

export const PinCodeUpdateManyZodSchema = z.object({ data: PinCodeUpdateManyMutationInputObjectSchema, where: PinCodeWhereInputObjectSchema.optional() }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinCodeCaseUpdateManyMutationInputObjectSchema as PinCodeCaseUpdateManyMutationInputObjectSchema } from './objects/PinCodeCaseUpdateManyMutationInput.schema';
import { PinCodeCaseWhereInputObjectSchema as PinCodeCaseWhereInputObjectSchema } from './objects/PinCodeCaseWhereInput.schema';

export const PinCodeCaseUpdateManySchema: z.ZodType<Prisma.PinCodeCaseUpdateManyArgs> = z.object({ data: PinCodeCaseUpdateManyMutationInputObjectSchema, where: PinCodeCaseWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PinCodeCaseUpdateManyArgs>;

export const PinCodeCaseUpdateManyZodSchema = z.object({ data: PinCodeCaseUpdateManyMutationInputObjectSchema, where: PinCodeCaseWhereInputObjectSchema.optional() }).strict();
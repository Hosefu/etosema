import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseScalarWhereInputObjectSchema as PinCodeCaseScalarWhereInputObjectSchema } from './PinCodeCaseScalarWhereInput.schema';
import { PinCodeCaseUpdateManyMutationInputObjectSchema as PinCodeCaseUpdateManyMutationInputObjectSchema } from './PinCodeCaseUpdateManyMutationInput.schema';
import { PinCodeCaseUncheckedUpdateManyWithoutPinCodeInputObjectSchema as PinCodeCaseUncheckedUpdateManyWithoutPinCodeInputObjectSchema } from './PinCodeCaseUncheckedUpdateManyWithoutPinCodeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PinCodeCaseScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PinCodeCaseUpdateManyMutationInputObjectSchema), z.lazy(() => PinCodeCaseUncheckedUpdateManyWithoutPinCodeInputObjectSchema)])
}).strict();
export const PinCodeCaseUpdateManyWithWhereWithoutPinCodeInputObjectSchema: z.ZodType<Prisma.PinCodeCaseUpdateManyWithWhereWithoutPinCodeInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseUpdateManyWithWhereWithoutPinCodeInput>;
export const PinCodeCaseUpdateManyWithWhereWithoutPinCodeInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseScalarWhereInputObjectSchema as PinCodeCaseScalarWhereInputObjectSchema } from './PinCodeCaseScalarWhereInput.schema';
import { PinCodeCaseUpdateManyMutationInputObjectSchema as PinCodeCaseUpdateManyMutationInputObjectSchema } from './PinCodeCaseUpdateManyMutationInput.schema';
import { PinCodeCaseUncheckedUpdateManyWithoutCaseInputObjectSchema as PinCodeCaseUncheckedUpdateManyWithoutCaseInputObjectSchema } from './PinCodeCaseUncheckedUpdateManyWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PinCodeCaseScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PinCodeCaseUpdateManyMutationInputObjectSchema), z.lazy(() => PinCodeCaseUncheckedUpdateManyWithoutCaseInputObjectSchema)])
}).strict();
export const PinCodeCaseUpdateManyWithWhereWithoutCaseInputObjectSchema: z.ZodType<Prisma.PinCodeCaseUpdateManyWithWhereWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseUpdateManyWithWhereWithoutCaseInput>;
export const PinCodeCaseUpdateManyWithWhereWithoutCaseInputObjectZodSchema = makeSchema();

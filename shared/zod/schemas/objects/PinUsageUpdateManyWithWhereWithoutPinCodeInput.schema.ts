import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinUsageScalarWhereInputObjectSchema as PinUsageScalarWhereInputObjectSchema } from './PinUsageScalarWhereInput.schema';
import { PinUsageUpdateManyMutationInputObjectSchema as PinUsageUpdateManyMutationInputObjectSchema } from './PinUsageUpdateManyMutationInput.schema';
import { PinUsageUncheckedUpdateManyWithoutPinCodeInputObjectSchema as PinUsageUncheckedUpdateManyWithoutPinCodeInputObjectSchema } from './PinUsageUncheckedUpdateManyWithoutPinCodeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PinUsageScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PinUsageUpdateManyMutationInputObjectSchema), z.lazy(() => PinUsageUncheckedUpdateManyWithoutPinCodeInputObjectSchema)])
}).strict();
export const PinUsageUpdateManyWithWhereWithoutPinCodeInputObjectSchema: z.ZodType<Prisma.PinUsageUpdateManyWithWhereWithoutPinCodeInput> = makeSchema() as unknown as z.ZodType<Prisma.PinUsageUpdateManyWithWhereWithoutPinCodeInput>;
export const PinUsageUpdateManyWithWhereWithoutPinCodeInputObjectZodSchema = makeSchema();

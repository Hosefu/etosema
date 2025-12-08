import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseWhereUniqueInputObjectSchema as PinCodeCaseWhereUniqueInputObjectSchema } from './PinCodeCaseWhereUniqueInput.schema';
import { PinCodeCaseUpdateWithoutCaseInputObjectSchema as PinCodeCaseUpdateWithoutCaseInputObjectSchema } from './PinCodeCaseUpdateWithoutCaseInput.schema';
import { PinCodeCaseUncheckedUpdateWithoutCaseInputObjectSchema as PinCodeCaseUncheckedUpdateWithoutCaseInputObjectSchema } from './PinCodeCaseUncheckedUpdateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PinCodeCaseUpdateWithoutCaseInputObjectSchema), z.lazy(() => PinCodeCaseUncheckedUpdateWithoutCaseInputObjectSchema)])
}).strict();
export const PinCodeCaseUpdateWithWhereUniqueWithoutCaseInputObjectSchema: z.ZodType<Prisma.PinCodeCaseUpdateWithWhereUniqueWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseUpdateWithWhereUniqueWithoutCaseInput>;
export const PinCodeCaseUpdateWithWhereUniqueWithoutCaseInputObjectZodSchema = makeSchema();

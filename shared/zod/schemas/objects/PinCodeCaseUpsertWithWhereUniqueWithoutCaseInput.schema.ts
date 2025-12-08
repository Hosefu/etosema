import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseWhereUniqueInputObjectSchema as PinCodeCaseWhereUniqueInputObjectSchema } from './PinCodeCaseWhereUniqueInput.schema';
import { PinCodeCaseUpdateWithoutCaseInputObjectSchema as PinCodeCaseUpdateWithoutCaseInputObjectSchema } from './PinCodeCaseUpdateWithoutCaseInput.schema';
import { PinCodeCaseUncheckedUpdateWithoutCaseInputObjectSchema as PinCodeCaseUncheckedUpdateWithoutCaseInputObjectSchema } from './PinCodeCaseUncheckedUpdateWithoutCaseInput.schema';
import { PinCodeCaseCreateWithoutCaseInputObjectSchema as PinCodeCaseCreateWithoutCaseInputObjectSchema } from './PinCodeCaseCreateWithoutCaseInput.schema';
import { PinCodeCaseUncheckedCreateWithoutCaseInputObjectSchema as PinCodeCaseUncheckedCreateWithoutCaseInputObjectSchema } from './PinCodeCaseUncheckedCreateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PinCodeCaseUpdateWithoutCaseInputObjectSchema), z.lazy(() => PinCodeCaseUncheckedUpdateWithoutCaseInputObjectSchema)]),
  create: z.union([z.lazy(() => PinCodeCaseCreateWithoutCaseInputObjectSchema), z.lazy(() => PinCodeCaseUncheckedCreateWithoutCaseInputObjectSchema)])
}).strict();
export const PinCodeCaseUpsertWithWhereUniqueWithoutCaseInputObjectSchema: z.ZodType<Prisma.PinCodeCaseUpsertWithWhereUniqueWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseUpsertWithWhereUniqueWithoutCaseInput>;
export const PinCodeCaseUpsertWithWhereUniqueWithoutCaseInputObjectZodSchema = makeSchema();

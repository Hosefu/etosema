import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseCreateWithoutCaseInputObjectSchema as PinCodeCaseCreateWithoutCaseInputObjectSchema } from './PinCodeCaseCreateWithoutCaseInput.schema';
import { PinCodeCaseUncheckedCreateWithoutCaseInputObjectSchema as PinCodeCaseUncheckedCreateWithoutCaseInputObjectSchema } from './PinCodeCaseUncheckedCreateWithoutCaseInput.schema';
import { PinCodeCaseCreateOrConnectWithoutCaseInputObjectSchema as PinCodeCaseCreateOrConnectWithoutCaseInputObjectSchema } from './PinCodeCaseCreateOrConnectWithoutCaseInput.schema';
import { PinCodeCaseCreateManyCaseInputEnvelopeObjectSchema as PinCodeCaseCreateManyCaseInputEnvelopeObjectSchema } from './PinCodeCaseCreateManyCaseInputEnvelope.schema';
import { PinCodeCaseWhereUniqueInputObjectSchema as PinCodeCaseWhereUniqueInputObjectSchema } from './PinCodeCaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PinCodeCaseCreateWithoutCaseInputObjectSchema), z.lazy(() => PinCodeCaseCreateWithoutCaseInputObjectSchema).array(), z.lazy(() => PinCodeCaseUncheckedCreateWithoutCaseInputObjectSchema), z.lazy(() => PinCodeCaseUncheckedCreateWithoutCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PinCodeCaseCreateOrConnectWithoutCaseInputObjectSchema), z.lazy(() => PinCodeCaseCreateOrConnectWithoutCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PinCodeCaseCreateManyCaseInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema), z.lazy(() => PinCodeCaseWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PinCodeCaseCreateNestedManyWithoutCaseInputObjectSchema: z.ZodType<Prisma.PinCodeCaseCreateNestedManyWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseCreateNestedManyWithoutCaseInput>;
export const PinCodeCaseCreateNestedManyWithoutCaseInputObjectZodSchema = makeSchema();

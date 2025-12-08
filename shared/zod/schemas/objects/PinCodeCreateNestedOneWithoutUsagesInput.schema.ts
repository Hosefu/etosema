import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCreateWithoutUsagesInputObjectSchema as PinCodeCreateWithoutUsagesInputObjectSchema } from './PinCodeCreateWithoutUsagesInput.schema';
import { PinCodeUncheckedCreateWithoutUsagesInputObjectSchema as PinCodeUncheckedCreateWithoutUsagesInputObjectSchema } from './PinCodeUncheckedCreateWithoutUsagesInput.schema';
import { PinCodeCreateOrConnectWithoutUsagesInputObjectSchema as PinCodeCreateOrConnectWithoutUsagesInputObjectSchema } from './PinCodeCreateOrConnectWithoutUsagesInput.schema';
import { PinCodeWhereUniqueInputObjectSchema as PinCodeWhereUniqueInputObjectSchema } from './PinCodeWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PinCodeCreateWithoutUsagesInputObjectSchema), z.lazy(() => PinCodeUncheckedCreateWithoutUsagesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PinCodeCreateOrConnectWithoutUsagesInputObjectSchema).optional(),
  connect: z.lazy(() => PinCodeWhereUniqueInputObjectSchema).optional()
}).strict();
export const PinCodeCreateNestedOneWithoutUsagesInputObjectSchema: z.ZodType<Prisma.PinCodeCreateNestedOneWithoutUsagesInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCreateNestedOneWithoutUsagesInput>;
export const PinCodeCreateNestedOneWithoutUsagesInputObjectZodSchema = makeSchema();

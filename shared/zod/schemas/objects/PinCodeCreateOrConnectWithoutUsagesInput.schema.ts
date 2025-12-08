import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeWhereUniqueInputObjectSchema as PinCodeWhereUniqueInputObjectSchema } from './PinCodeWhereUniqueInput.schema';
import { PinCodeCreateWithoutUsagesInputObjectSchema as PinCodeCreateWithoutUsagesInputObjectSchema } from './PinCodeCreateWithoutUsagesInput.schema';
import { PinCodeUncheckedCreateWithoutUsagesInputObjectSchema as PinCodeUncheckedCreateWithoutUsagesInputObjectSchema } from './PinCodeUncheckedCreateWithoutUsagesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PinCodeWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PinCodeCreateWithoutUsagesInputObjectSchema), z.lazy(() => PinCodeUncheckedCreateWithoutUsagesInputObjectSchema)])
}).strict();
export const PinCodeCreateOrConnectWithoutUsagesInputObjectSchema: z.ZodType<Prisma.PinCodeCreateOrConnectWithoutUsagesInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCreateOrConnectWithoutUsagesInput>;
export const PinCodeCreateOrConnectWithoutUsagesInputObjectZodSchema = makeSchema();

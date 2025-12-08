import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCreateWithoutUsagesInputObjectSchema as PinCodeCreateWithoutUsagesInputObjectSchema } from './PinCodeCreateWithoutUsagesInput.schema';
import { PinCodeUncheckedCreateWithoutUsagesInputObjectSchema as PinCodeUncheckedCreateWithoutUsagesInputObjectSchema } from './PinCodeUncheckedCreateWithoutUsagesInput.schema';
import { PinCodeCreateOrConnectWithoutUsagesInputObjectSchema as PinCodeCreateOrConnectWithoutUsagesInputObjectSchema } from './PinCodeCreateOrConnectWithoutUsagesInput.schema';
import { PinCodeUpsertWithoutUsagesInputObjectSchema as PinCodeUpsertWithoutUsagesInputObjectSchema } from './PinCodeUpsertWithoutUsagesInput.schema';
import { PinCodeWhereInputObjectSchema as PinCodeWhereInputObjectSchema } from './PinCodeWhereInput.schema';
import { PinCodeWhereUniqueInputObjectSchema as PinCodeWhereUniqueInputObjectSchema } from './PinCodeWhereUniqueInput.schema';
import { PinCodeUpdateToOneWithWhereWithoutUsagesInputObjectSchema as PinCodeUpdateToOneWithWhereWithoutUsagesInputObjectSchema } from './PinCodeUpdateToOneWithWhereWithoutUsagesInput.schema';
import { PinCodeUpdateWithoutUsagesInputObjectSchema as PinCodeUpdateWithoutUsagesInputObjectSchema } from './PinCodeUpdateWithoutUsagesInput.schema';
import { PinCodeUncheckedUpdateWithoutUsagesInputObjectSchema as PinCodeUncheckedUpdateWithoutUsagesInputObjectSchema } from './PinCodeUncheckedUpdateWithoutUsagesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PinCodeCreateWithoutUsagesInputObjectSchema), z.lazy(() => PinCodeUncheckedCreateWithoutUsagesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PinCodeCreateOrConnectWithoutUsagesInputObjectSchema).optional(),
  upsert: z.lazy(() => PinCodeUpsertWithoutUsagesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => PinCodeWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => PinCodeWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => PinCodeWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => PinCodeUpdateToOneWithWhereWithoutUsagesInputObjectSchema), z.lazy(() => PinCodeUpdateWithoutUsagesInputObjectSchema), z.lazy(() => PinCodeUncheckedUpdateWithoutUsagesInputObjectSchema)]).optional()
}).strict();
export const PinCodeUpdateOneWithoutUsagesNestedInputObjectSchema: z.ZodType<Prisma.PinCodeUpdateOneWithoutUsagesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeUpdateOneWithoutUsagesNestedInput>;
export const PinCodeUpdateOneWithoutUsagesNestedInputObjectZodSchema = makeSchema();

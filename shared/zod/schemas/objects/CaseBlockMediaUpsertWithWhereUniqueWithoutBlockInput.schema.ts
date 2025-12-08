import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockMediaWhereUniqueInputObjectSchema as CaseBlockMediaWhereUniqueInputObjectSchema } from './CaseBlockMediaWhereUniqueInput.schema';
import { CaseBlockMediaUpdateWithoutBlockInputObjectSchema as CaseBlockMediaUpdateWithoutBlockInputObjectSchema } from './CaseBlockMediaUpdateWithoutBlockInput.schema';
import { CaseBlockMediaUncheckedUpdateWithoutBlockInputObjectSchema as CaseBlockMediaUncheckedUpdateWithoutBlockInputObjectSchema } from './CaseBlockMediaUncheckedUpdateWithoutBlockInput.schema';
import { CaseBlockMediaCreateWithoutBlockInputObjectSchema as CaseBlockMediaCreateWithoutBlockInputObjectSchema } from './CaseBlockMediaCreateWithoutBlockInput.schema';
import { CaseBlockMediaUncheckedCreateWithoutBlockInputObjectSchema as CaseBlockMediaUncheckedCreateWithoutBlockInputObjectSchema } from './CaseBlockMediaUncheckedCreateWithoutBlockInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseBlockMediaWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseBlockMediaUpdateWithoutBlockInputObjectSchema), z.lazy(() => CaseBlockMediaUncheckedUpdateWithoutBlockInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseBlockMediaCreateWithoutBlockInputObjectSchema), z.lazy(() => CaseBlockMediaUncheckedCreateWithoutBlockInputObjectSchema)])
}).strict();
export const CaseBlockMediaUpsertWithWhereUniqueWithoutBlockInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaUpsertWithWhereUniqueWithoutBlockInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaUpsertWithWhereUniqueWithoutBlockInput>;
export const CaseBlockMediaUpsertWithWhereUniqueWithoutBlockInputObjectZodSchema = makeSchema();

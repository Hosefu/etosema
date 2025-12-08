import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockMediaWhereUniqueInputObjectSchema as CaseBlockMediaWhereUniqueInputObjectSchema } from './CaseBlockMediaWhereUniqueInput.schema';
import { CaseBlockMediaUpdateWithoutBlockInputObjectSchema as CaseBlockMediaUpdateWithoutBlockInputObjectSchema } from './CaseBlockMediaUpdateWithoutBlockInput.schema';
import { CaseBlockMediaUncheckedUpdateWithoutBlockInputObjectSchema as CaseBlockMediaUncheckedUpdateWithoutBlockInputObjectSchema } from './CaseBlockMediaUncheckedUpdateWithoutBlockInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseBlockMediaWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseBlockMediaUpdateWithoutBlockInputObjectSchema), z.lazy(() => CaseBlockMediaUncheckedUpdateWithoutBlockInputObjectSchema)])
}).strict();
export const CaseBlockMediaUpdateWithWhereUniqueWithoutBlockInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaUpdateWithWhereUniqueWithoutBlockInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaUpdateWithWhereUniqueWithoutBlockInput>;
export const CaseBlockMediaUpdateWithWhereUniqueWithoutBlockInputObjectZodSchema = makeSchema();

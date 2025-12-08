import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockMediaWhereUniqueInputObjectSchema as CaseBlockMediaWhereUniqueInputObjectSchema } from './CaseBlockMediaWhereUniqueInput.schema';
import { CaseBlockMediaCreateWithoutBlockInputObjectSchema as CaseBlockMediaCreateWithoutBlockInputObjectSchema } from './CaseBlockMediaCreateWithoutBlockInput.schema';
import { CaseBlockMediaUncheckedCreateWithoutBlockInputObjectSchema as CaseBlockMediaUncheckedCreateWithoutBlockInputObjectSchema } from './CaseBlockMediaUncheckedCreateWithoutBlockInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseBlockMediaWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseBlockMediaCreateWithoutBlockInputObjectSchema), z.lazy(() => CaseBlockMediaUncheckedCreateWithoutBlockInputObjectSchema)])
}).strict();
export const CaseBlockMediaCreateOrConnectWithoutBlockInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaCreateOrConnectWithoutBlockInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaCreateOrConnectWithoutBlockInput>;
export const CaseBlockMediaCreateOrConnectWithoutBlockInputObjectZodSchema = makeSchema();

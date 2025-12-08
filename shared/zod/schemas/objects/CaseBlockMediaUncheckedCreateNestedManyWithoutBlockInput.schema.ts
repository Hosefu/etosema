import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockMediaCreateWithoutBlockInputObjectSchema as CaseBlockMediaCreateWithoutBlockInputObjectSchema } from './CaseBlockMediaCreateWithoutBlockInput.schema';
import { CaseBlockMediaUncheckedCreateWithoutBlockInputObjectSchema as CaseBlockMediaUncheckedCreateWithoutBlockInputObjectSchema } from './CaseBlockMediaUncheckedCreateWithoutBlockInput.schema';
import { CaseBlockMediaCreateOrConnectWithoutBlockInputObjectSchema as CaseBlockMediaCreateOrConnectWithoutBlockInputObjectSchema } from './CaseBlockMediaCreateOrConnectWithoutBlockInput.schema';
import { CaseBlockMediaCreateManyBlockInputEnvelopeObjectSchema as CaseBlockMediaCreateManyBlockInputEnvelopeObjectSchema } from './CaseBlockMediaCreateManyBlockInputEnvelope.schema';
import { CaseBlockMediaWhereUniqueInputObjectSchema as CaseBlockMediaWhereUniqueInputObjectSchema } from './CaseBlockMediaWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseBlockMediaCreateWithoutBlockInputObjectSchema), z.lazy(() => CaseBlockMediaCreateWithoutBlockInputObjectSchema).array(), z.lazy(() => CaseBlockMediaUncheckedCreateWithoutBlockInputObjectSchema), z.lazy(() => CaseBlockMediaUncheckedCreateWithoutBlockInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseBlockMediaCreateOrConnectWithoutBlockInputObjectSchema), z.lazy(() => CaseBlockMediaCreateOrConnectWithoutBlockInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseBlockMediaCreateManyBlockInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseBlockMediaWhereUniqueInputObjectSchema), z.lazy(() => CaseBlockMediaWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseBlockMediaUncheckedCreateNestedManyWithoutBlockInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaUncheckedCreateNestedManyWithoutBlockInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaUncheckedCreateNestedManyWithoutBlockInput>;
export const CaseBlockMediaUncheckedCreateNestedManyWithoutBlockInputObjectZodSchema = makeSchema();

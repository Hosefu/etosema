import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseCreateWithoutBlocksInputObjectSchema as CaseCreateWithoutBlocksInputObjectSchema } from './CaseCreateWithoutBlocksInput.schema';
import { CaseUncheckedCreateWithoutBlocksInputObjectSchema as CaseUncheckedCreateWithoutBlocksInputObjectSchema } from './CaseUncheckedCreateWithoutBlocksInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseCreateWithoutBlocksInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutBlocksInputObjectSchema)])
}).strict();
export const CaseCreateOrConnectWithoutBlocksInputObjectSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutBlocksInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateOrConnectWithoutBlocksInput>;
export const CaseCreateOrConnectWithoutBlocksInputObjectZodSchema = makeSchema();

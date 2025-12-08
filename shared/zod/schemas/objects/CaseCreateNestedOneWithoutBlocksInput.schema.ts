import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseCreateWithoutBlocksInputObjectSchema as CaseCreateWithoutBlocksInputObjectSchema } from './CaseCreateWithoutBlocksInput.schema';
import { CaseUncheckedCreateWithoutBlocksInputObjectSchema as CaseUncheckedCreateWithoutBlocksInputObjectSchema } from './CaseUncheckedCreateWithoutBlocksInput.schema';
import { CaseCreateOrConnectWithoutBlocksInputObjectSchema as CaseCreateOrConnectWithoutBlocksInputObjectSchema } from './CaseCreateOrConnectWithoutBlocksInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutBlocksInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutBlocksInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCreateOrConnectWithoutBlocksInputObjectSchema).optional(),
  connect: z.lazy(() => CaseWhereUniqueInputObjectSchema).optional()
}).strict();
export const CaseCreateNestedOneWithoutBlocksInputObjectSchema: z.ZodType<Prisma.CaseCreateNestedOneWithoutBlocksInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateNestedOneWithoutBlocksInput>;
export const CaseCreateNestedOneWithoutBlocksInputObjectZodSchema = makeSchema();

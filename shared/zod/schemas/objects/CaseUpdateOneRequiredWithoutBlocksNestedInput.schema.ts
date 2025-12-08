import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseCreateWithoutBlocksInputObjectSchema as CaseCreateWithoutBlocksInputObjectSchema } from './CaseCreateWithoutBlocksInput.schema';
import { CaseUncheckedCreateWithoutBlocksInputObjectSchema as CaseUncheckedCreateWithoutBlocksInputObjectSchema } from './CaseUncheckedCreateWithoutBlocksInput.schema';
import { CaseCreateOrConnectWithoutBlocksInputObjectSchema as CaseCreateOrConnectWithoutBlocksInputObjectSchema } from './CaseCreateOrConnectWithoutBlocksInput.schema';
import { CaseUpsertWithoutBlocksInputObjectSchema as CaseUpsertWithoutBlocksInputObjectSchema } from './CaseUpsertWithoutBlocksInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateToOneWithWhereWithoutBlocksInputObjectSchema as CaseUpdateToOneWithWhereWithoutBlocksInputObjectSchema } from './CaseUpdateToOneWithWhereWithoutBlocksInput.schema';
import { CaseUpdateWithoutBlocksInputObjectSchema as CaseUpdateWithoutBlocksInputObjectSchema } from './CaseUpdateWithoutBlocksInput.schema';
import { CaseUncheckedUpdateWithoutBlocksInputObjectSchema as CaseUncheckedUpdateWithoutBlocksInputObjectSchema } from './CaseUncheckedUpdateWithoutBlocksInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutBlocksInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutBlocksInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCreateOrConnectWithoutBlocksInputObjectSchema).optional(),
  upsert: z.lazy(() => CaseUpsertWithoutBlocksInputObjectSchema).optional(),
  connect: z.lazy(() => CaseWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CaseUpdateToOneWithWhereWithoutBlocksInputObjectSchema), z.lazy(() => CaseUpdateWithoutBlocksInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutBlocksInputObjectSchema)]).optional()
}).strict();
export const CaseUpdateOneRequiredWithoutBlocksNestedInputObjectSchema: z.ZodType<Prisma.CaseUpdateOneRequiredWithoutBlocksNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateOneRequiredWithoutBlocksNestedInput>;
export const CaseUpdateOneRequiredWithoutBlocksNestedInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockCreateWithoutMediasInputObjectSchema as CaseBlockCreateWithoutMediasInputObjectSchema } from './CaseBlockCreateWithoutMediasInput.schema';
import { CaseBlockUncheckedCreateWithoutMediasInputObjectSchema as CaseBlockUncheckedCreateWithoutMediasInputObjectSchema } from './CaseBlockUncheckedCreateWithoutMediasInput.schema';
import { CaseBlockCreateOrConnectWithoutMediasInputObjectSchema as CaseBlockCreateOrConnectWithoutMediasInputObjectSchema } from './CaseBlockCreateOrConnectWithoutMediasInput.schema';
import { CaseBlockWhereUniqueInputObjectSchema as CaseBlockWhereUniqueInputObjectSchema } from './CaseBlockWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseBlockCreateWithoutMediasInputObjectSchema), z.lazy(() => CaseBlockUncheckedCreateWithoutMediasInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseBlockCreateOrConnectWithoutMediasInputObjectSchema).optional(),
  connect: z.lazy(() => CaseBlockWhereUniqueInputObjectSchema).optional()
}).strict();
export const CaseBlockCreateNestedOneWithoutMediasInputObjectSchema: z.ZodType<Prisma.CaseBlockCreateNestedOneWithoutMediasInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockCreateNestedOneWithoutMediasInput>;
export const CaseBlockCreateNestedOneWithoutMediasInputObjectZodSchema = makeSchema();

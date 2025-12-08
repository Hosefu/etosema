import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockWhereUniqueInputObjectSchema as CaseBlockWhereUniqueInputObjectSchema } from './CaseBlockWhereUniqueInput.schema';
import { CaseBlockCreateWithoutMediasInputObjectSchema as CaseBlockCreateWithoutMediasInputObjectSchema } from './CaseBlockCreateWithoutMediasInput.schema';
import { CaseBlockUncheckedCreateWithoutMediasInputObjectSchema as CaseBlockUncheckedCreateWithoutMediasInputObjectSchema } from './CaseBlockUncheckedCreateWithoutMediasInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseBlockWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseBlockCreateWithoutMediasInputObjectSchema), z.lazy(() => CaseBlockUncheckedCreateWithoutMediasInputObjectSchema)])
}).strict();
export const CaseBlockCreateOrConnectWithoutMediasInputObjectSchema: z.ZodType<Prisma.CaseBlockCreateOrConnectWithoutMediasInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockCreateOrConnectWithoutMediasInput>;
export const CaseBlockCreateOrConnectWithoutMediasInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseCreateWithoutPinAccessInputObjectSchema as CaseCreateWithoutPinAccessInputObjectSchema } from './CaseCreateWithoutPinAccessInput.schema';
import { CaseUncheckedCreateWithoutPinAccessInputObjectSchema as CaseUncheckedCreateWithoutPinAccessInputObjectSchema } from './CaseUncheckedCreateWithoutPinAccessInput.schema';
import { CaseCreateOrConnectWithoutPinAccessInputObjectSchema as CaseCreateOrConnectWithoutPinAccessInputObjectSchema } from './CaseCreateOrConnectWithoutPinAccessInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutPinAccessInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutPinAccessInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCreateOrConnectWithoutPinAccessInputObjectSchema).optional(),
  connect: z.lazy(() => CaseWhereUniqueInputObjectSchema).optional()
}).strict();
export const CaseCreateNestedOneWithoutPinAccessInputObjectSchema: z.ZodType<Prisma.CaseCreateNestedOneWithoutPinAccessInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateNestedOneWithoutPinAccessInput>;
export const CaseCreateNestedOneWithoutPinAccessInputObjectZodSchema = makeSchema();

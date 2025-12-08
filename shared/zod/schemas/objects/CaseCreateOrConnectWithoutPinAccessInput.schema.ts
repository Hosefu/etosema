import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseCreateWithoutPinAccessInputObjectSchema as CaseCreateWithoutPinAccessInputObjectSchema } from './CaseCreateWithoutPinAccessInput.schema';
import { CaseUncheckedCreateWithoutPinAccessInputObjectSchema as CaseUncheckedCreateWithoutPinAccessInputObjectSchema } from './CaseUncheckedCreateWithoutPinAccessInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseCreateWithoutPinAccessInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutPinAccessInputObjectSchema)])
}).strict();
export const CaseCreateOrConnectWithoutPinAccessInputObjectSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutPinAccessInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateOrConnectWithoutPinAccessInput>;
export const CaseCreateOrConnectWithoutPinAccessInputObjectZodSchema = makeSchema();

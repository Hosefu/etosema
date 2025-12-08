import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockMediaScalarWhereInputObjectSchema as CaseBlockMediaScalarWhereInputObjectSchema } from './CaseBlockMediaScalarWhereInput.schema';
import { CaseBlockMediaUpdateManyMutationInputObjectSchema as CaseBlockMediaUpdateManyMutationInputObjectSchema } from './CaseBlockMediaUpdateManyMutationInput.schema';
import { CaseBlockMediaUncheckedUpdateManyWithoutBlockInputObjectSchema as CaseBlockMediaUncheckedUpdateManyWithoutBlockInputObjectSchema } from './CaseBlockMediaUncheckedUpdateManyWithoutBlockInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseBlockMediaScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseBlockMediaUpdateManyMutationInputObjectSchema), z.lazy(() => CaseBlockMediaUncheckedUpdateManyWithoutBlockInputObjectSchema)])
}).strict();
export const CaseBlockMediaUpdateManyWithWhereWithoutBlockInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaUpdateManyWithWhereWithoutBlockInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaUpdateManyWithWhereWithoutBlockInput>;
export const CaseBlockMediaUpdateManyWithWhereWithoutBlockInputObjectZodSchema = makeSchema();

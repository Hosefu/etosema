import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  
}).strict();
export const PinCodeCaseUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.PinCodeCaseUpdateManyMutationInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseUpdateManyMutationInput>;
export const PinCodeCaseUpdateManyMutationInputObjectZodSchema = makeSchema();

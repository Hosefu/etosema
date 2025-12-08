import * as z from 'zod';

export const PinCodeScalarFieldEnumSchema = z.enum(['id', 'label', 'codeHash', 'code', 'shortCode', 'accessAll', 'expiresAt', 'createdAt', 'updatedAt'])

export type PinCodeScalarFieldEnum = z.infer<typeof PinCodeScalarFieldEnumSchema>;
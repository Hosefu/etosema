import * as z from 'zod';

export const PinUsageScalarFieldEnumSchema = z.enum(['id', 'pinCodeId', 'ip', 'userAgent', 'success', 'path', 'createdAt'])

export type PinUsageScalarFieldEnum = z.infer<typeof PinUsageScalarFieldEnumSchema>;
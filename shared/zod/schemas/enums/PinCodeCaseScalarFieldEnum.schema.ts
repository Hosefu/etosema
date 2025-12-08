import * as z from 'zod';

export const PinCodeCaseScalarFieldEnumSchema = z.enum(['pinCodeId', 'caseId'])

export type PinCodeCaseScalarFieldEnum = z.infer<typeof PinCodeCaseScalarFieldEnumSchema>;
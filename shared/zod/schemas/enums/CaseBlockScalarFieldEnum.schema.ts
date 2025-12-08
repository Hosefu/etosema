import * as z from 'zod';

export const CaseBlockScalarFieldEnumSchema = z.enum(['id', 'caseId', 'type', 'content', 'settings', 'layout', 'orderRank'])

export type CaseBlockScalarFieldEnum = z.infer<typeof CaseBlockScalarFieldEnumSchema>;
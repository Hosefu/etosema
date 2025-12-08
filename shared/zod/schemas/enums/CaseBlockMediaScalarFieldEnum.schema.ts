import * as z from 'zod';

export const CaseBlockMediaScalarFieldEnumSchema = z.enum(['id', 'blockId', 'position', 'type', 'url', 'alt', 'aspectRatio'])

export type CaseBlockMediaScalarFieldEnum = z.infer<typeof CaseBlockMediaScalarFieldEnumSchema>;
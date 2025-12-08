import * as z from 'zod';

export const FontScalarFieldEnumSchema = z.enum(['id', 'name', 'family', 'url', 'format', 'weight', 'style', 'createdAt'])

export type FontScalarFieldEnum = z.infer<typeof FontScalarFieldEnumSchema>;
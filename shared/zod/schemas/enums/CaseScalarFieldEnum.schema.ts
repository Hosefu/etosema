import * as z from 'zod';

export const CaseScalarFieldEnumSchema = z.enum(['id', 'slug', 'title', 'shortTitle', 'year', 'summary', 'isNda', 'orderRank', 'useCustomDesign', 'backgroundColor', 'textColor', 'fontFamily', 'settings', 'createdAt', 'updatedAt'])

export type CaseScalarFieldEnum = z.infer<typeof CaseScalarFieldEnumSchema>;
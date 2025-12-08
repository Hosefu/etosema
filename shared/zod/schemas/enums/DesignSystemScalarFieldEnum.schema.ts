import * as z from 'zod';

export const DesignSystemScalarFieldEnumSchema = z.enum(['id', 'typography', 'colors', 'links', 'cards', 'grid', 'spacing', 'faviconUrl', 'updatedAt'])

export type DesignSystemScalarFieldEnum = z.infer<typeof DesignSystemScalarFieldEnumSchema>;
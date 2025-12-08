import * as z from 'zod';

export const ProfileScalarFieldEnumSchema = z.enum(['id', 'title', 'description', 'contactsJson', 'projectsJson', 'socialsJson', 'logoUrl', 'logoText', 'lockedCaseMessage', 'createdAt', 'updatedAt'])

export type ProfileScalarFieldEnum = z.infer<typeof ProfileScalarFieldEnumSchema>;
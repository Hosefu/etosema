/**
 * Shared Types and Schemas
 *
 * Exports Zod schemas generated from Prisma models.
 * These schemas can be used for validation on both frontend and backend.
 */

// Export all Zod schemas
export * from './zod/schemas';

// Export commonly used model schemas directly for convenience
export { CaseSchema } from './zod/schemas/objects/Case.schema';
export { CaseBlockSchema } from './zod/schemas/objects/CaseBlock.schema';
export { CaseBlockMediaSchema } from './zod/schemas/objects/CaseBlockMedia.schema';
export { PinCodeSchema } from './zod/schemas/objects/PinCode.schema';
export { PinCodeCaseSchema } from './zod/schemas/objects/PinCodeCase.schema';
export { PinUsageSchema } from './zod/schemas/objects/PinUsage.schema';
export { ProfileSchema } from './zod/schemas/objects/Profile.schema';
export { DesignSystemSchema } from './zod/schemas/objects/DesignSystem.schema';
export { FontSchema } from './zod/schemas/objects/Font.schema';

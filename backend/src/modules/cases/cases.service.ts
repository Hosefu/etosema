/**
 * Cases Service
 *
 * Business logic for retrieving and managing portfolio cases.
 */

import { prisma } from '../../db/prisma';
import {
  CasePreview,
  CaseDetail,
  CaseBlockData,
  CaseMedia,
  PinContext,
} from '../../types/api';
import { isCaseAccessible } from '../pin/pin.middleware';

/**
 * Get all cases for the grid display
 *
 * Returns cases with computed isLocked status based on user's PIN access.
 *
 * @param pinContext - PIN context from request
 * @returns Array of case previews
 */
export async function getAllCases(
  pinContext?: PinContext
): Promise<CasePreview[]> {
  const cases = await prisma.case.findMany({
    orderBy: {
      orderRank: 'asc',
    },
    include: {
      blocks: {
        orderBy: {
          orderRank: 'asc',
        },
        include: {
          medias: {
            orderBy: {
              position: 'asc',
            },
          },
        },
      },
    },
  });

  return cases.map(caseItem => {
    const isLocked = !isCaseAccessible(caseItem.id, caseItem.isNda, pinContext);

    // Transform blocks and medias for preview
    const blocks: CaseBlockData[] = isLocked ? [] : caseItem.blocks.map(block => ({
      id: block.id,
      layout: block.layout as 'FULL' | 'HALF',
      medias: block.medias.map(media => ({
        url: media.url,
        type: media.type as 'IMAGE' | 'VIDEO',
        position: media.position,
        alt: media.alt || undefined,
        aspectRatio: media.aspectRatio as '16:9' | '4:3' | '1:1' | undefined,
      })),
    }));

    // Compute coverUrl from first media
    let coverUrl = '/placeholder.png';
    if (caseItem.blocks.length > 0) {
      for (const block of caseItem.blocks) {
        if (block.medias.length > 0) {
          coverUrl = block.medias[0].url;
          break;
        }
      }
    }

    return {
      id: caseItem.id,
      slug: caseItem.slug,
      title: caseItem.title,
      shortTitle: caseItem.shortTitle || undefined,
      year: caseItem.year,
      coverUrl,
      isNda: caseItem.isNda,
      isLocked,
      blocks,
    };
  });
}

/**
 * Get a single case by slug with full details
 *
 * @param slug - Case slug
 * @param pinContext - PIN context from request
 * @returns Case details or null if not found/not accessible
 * @throws Error with code 'pin_required' if case is NDA-protected and not accessible
 */
export async function getCaseBySlug(
  slug: string,
  pinContext?: PinContext
): Promise<CaseDetail | null> {
  const caseItem = await prisma.case.findUnique({
    where: { slug },
    include: {
      blocks: {
        orderBy: {
          orderRank: 'asc',
        },
        include: {
          medias: {
            orderBy: {
              position: 'asc',
            },
          },
        },
      },
    },
  });

  if (!caseItem) {
    return null;
  }

  // Check access
  const accessible = isCaseAccessible(caseItem.id, caseItem.isNda, pinContext);

  if (!accessible) {
    const error = new Error('PIN required to access this case');
    (error as any).code = 'pin_required';
    throw error;
  }

  // Transform blocks and medias
  const blocks: CaseBlockData[] = caseItem.blocks.map(block => ({
    id: block.id,
    type: (block.type as 'MEDIA' | 'TEXT') || 'MEDIA',
    content: block.content || undefined,
    settings: block.settings || undefined,
    layout: block.layout as 'FULL' | 'HALF',
    medias: block.medias.map(media => ({
      url: media.url,
      type: media.type as 'IMAGE' | 'VIDEO',
      position: media.position,
      alt: media.alt || undefined,
      aspectRatio: media.aspectRatio as '16:9' | '4:3' | '1:1' | undefined,
    })),
  }));

  return {
    id: caseItem.id,
    slug: caseItem.slug,
    title: caseItem.title,
    year: caseItem.year,
    summary: caseItem.summary || undefined,
    isNda: caseItem.isNda,
    backgroundColor: caseItem.backgroundColor,
    textColor: caseItem.textColor,
    fontFamily: caseItem.fontFamily,
    settings: caseItem.settings,
    useCustomDesign: caseItem.useCustomDesign,
    blocks,
  };
}

/**
 * Get case preview data for inline preview
 *
 * Similar to getCaseBySlug but optimized for preview display.
 *
 * @param slug - Case slug
 * @param pinContext - PIN context from request
 * @returns Case blocks or null if not accessible
 */
export async function getCasePreviewBlocks(
  slug: string,
  pinContext?: PinContext
): Promise<CaseBlockData[] | null> {
  const caseDetail = await getCaseBySlug(slug, pinContext);

  if (!caseDetail) {
    return null;
  }

  return caseDetail.blocks;
}

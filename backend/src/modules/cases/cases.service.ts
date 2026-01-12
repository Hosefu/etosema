/**
 * Cases Service
 *
 * Business logic for retrieving and managing portfolio cases.
 * Uses Dependency Injection for better testability and flexibility.
 */

import { PrismaClient } from '@prisma/client';
import {
  CasePreview,
  CaseDetail,
  CaseBlockData,
  PinContext,
} from '../../types/api';
import { isCaseAccessible } from '../pin/pin.middleware';
import { AppError } from '../../utils/AppError';

/**
 * Cases Service Class
 * Handles all business logic related to portfolio cases
 */
export class CasesService {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * Get all cases for the grid display
   *
   * Returns cases with computed isLocked status based on user's PIN access.
   *
   * @param pinContext - PIN context from request
   * @returns Array of case previews
   */
  async getAllCases(pinContext?: PinContext): Promise<CasePreview[]> {
    const cases = await this.prisma.case.findMany({
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

    return cases.map((caseItem) => {
      const isLocked = !isCaseAccessible(
        caseItem.id,
        caseItem.isNda,
        pinContext
      );

      // Transform blocks and medias for preview
      const blocks: CaseBlockData[] = isLocked
        ? []
        : caseItem.blocks.map((block) => ({
            id: block.id,
            layout: block.layout as 'FULL' | 'HALF',
            medias: block.medias.map((media) => ({
              url: media.url,
              type: media.type as 'IMAGE' | 'VIDEO',
              position: media.position,
              alt: media.alt || undefined,
              aspectRatio: media.aspectRatio as
                | '16:9'
                | '4:3'
                | '1:1'
                | undefined,
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

      // For locked NDA cases, use ndaPublicTitle if available
      const displayTitle = isLocked && (caseItem as any).ndaPublicTitle 
        ? (caseItem as any).ndaPublicTitle 
        : caseItem.title;
      const displayShortTitle = isLocked && (caseItem as any).ndaPublicTitle
        ? undefined
        : (caseItem.shortTitle || undefined);
      const displaySeoTitle = isLocked && (caseItem as any).ndaPublicTitle
        ? (caseItem as any).ndaPublicTitle
        : (caseItem.seoTitle || undefined);

      return {
        id: caseItem.id,
        slug: caseItem.slug,
        title: displayTitle,
        shortTitle: displayShortTitle,
        year: caseItem.year,
        coverUrl,
        isNda: caseItem.isNda,
        isLocked,
        seoTitle: displaySeoTitle,
        seoDescription: isLocked ? undefined : (caseItem.seoDescription || undefined),
        blocks,
        // Include custom design settings for card background
        useCustomDesign: caseItem.useCustomDesign,
        backgroundColor: caseItem.backgroundColor,
      } as any;
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
  async getCaseBySlug(
    slug: string,
    pinContext?: PinContext
  ): Promise<CaseDetail | null> {
    const caseItem = await this.prisma.case.findUnique({
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
    const accessible = isCaseAccessible(
      caseItem.id,
      caseItem.isNda,
      pinContext
    );

    if (!accessible) {
      throw AppError.pinRequired('PIN required to access this case');
    }

    // Transform blocks and medias
    const blocks: CaseBlockData[] = caseItem.blocks.map((block) => ({
      id: block.id,
      type: (block.type as 'MEDIA' | 'TEXT') || 'MEDIA',
      content: block.content || undefined,
      settings: block.settings || undefined,
      layout: block.layout as 'FULL' | 'HALF',
      medias: block.medias.map((media) => ({
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
      seoTitle: caseItem.seoTitle || undefined,
      seoDescription: caseItem.seoDescription || undefined,
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
  async getCasePreviewBlocks(
    slug: string,
    pinContext?: PinContext
  ): Promise<CaseBlockData[] | null> {
    const caseDetail = await this.getCaseBySlug(slug, pinContext);

    if (!caseDetail) {
      return null;
    }

    return caseDetail.blocks;
  }
}

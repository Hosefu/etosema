/**
 * Cases Service Tests
 *
 * Unit tests for CasesService business logic.
 * Uses in-memory mock for Prisma client.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { CasesService } from './cases.service';
import { AppError } from '../../utils/AppError';

// Mock Prisma client
const mockPrisma = {
  case: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
  },
} as unknown as PrismaClient;

describe('CasesService', () => {
  let casesService: CasesService;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    casesService = new CasesService(mockPrisma);
  });

  describe('getAllCases', () => {
    it('should return all cases with computed isLocked status', async () => {
      // Arrange
      const mockCases = [
        {
          id: '1',
          slug: 'test-case',
          title: 'Test Case',
          shortTitle: null,
          year: 2024,
          summary: null,
          isNda: false,
          orderRank: '0',
          seoTitle: null,
          seoDescription: null,
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
          fontFamily: 'Inter',
          useCustomDesign: false,
          settings: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          blocks: [
            {
              id: 'b1',
              caseId: '1',
              type: 'MEDIA',
              layout: 'FULL',
              content: null,
              settings: null,
              orderRank: 0,
              createdAt: new Date(),
              updatedAt: new Date(),
              medias: [
                {
                  id: 'm1',
                  blockId: 'b1',
                  url: 'https://example.com/image.jpg',
                  type: 'IMAGE',
                  position: 0,
                  alt: 'Test Image',
                  aspectRatio: '16:9',
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              ],
            },
          ],
        },
      ];

      vi.mocked(mockPrisma.case.findMany).mockResolvedValue(mockCases);

      // Act
      const result = await casesService.getAllCases();

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: '1',
        slug: 'test-case',
        title: 'Test Case',
        year: 2024,
        isNda: false,
        isLocked: false,
      });
      expect(result[0].coverUrl).toBe('https://example.com/image.jpg');
      expect(mockPrisma.case.findMany).toHaveBeenCalledOnce();
    });

    it('should mark NDA cases as locked when no PIN context', async () => {
      // Arrange
      const mockCases = [
        {
          id: '1',
          slug: 'nda-case',
          title: 'NDA Case',
          shortTitle: null,
          year: 2024,
          summary: null,
          isNda: true,
          orderRank: '0',
          seoTitle: null,
          seoDescription: null,
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
          fontFamily: 'Inter',
          useCustomDesign: false,
          settings: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          blocks: [],
        },
      ];

      vi.mocked(mockPrisma.case.findMany).mockResolvedValue(mockCases);

      // Act
      const result = await casesService.getAllCases();

      // Assert
      expect(result[0].isLocked).toBe(true);
      expect(result[0].blocks).toEqual([]);
    });
  });

  describe('getCaseBySlug', () => {
    it('should return case details for accessible case', async () => {
      // Arrange
      const mockCase = {
        id: '1',
        slug: 'test-case',
        title: 'Test Case',
        shortTitle: null,
        year: 2024,
        summary: 'Test Summary',
        isNda: false,
        orderRank: '0',
        seoTitle: null,
        seoDescription: null,
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
        fontFamily: 'Inter',
        useCustomDesign: false,
        settings: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        blocks: [],
      };

      vi.mocked(mockPrisma.case.findUnique).mockResolvedValue(mockCase);

      // Act
      const result = await casesService.getCaseBySlug('test-case');

      // Assert
      expect(result).toMatchObject({
        id: '1',
        slug: 'test-case',
        title: 'Test Case',
      });
      expect(mockPrisma.case.findUnique).toHaveBeenCalledWith({
        where: { slug: 'test-case' },
        include: {
          blocks: {
            orderBy: { orderRank: 'asc' },
            include: {
              medias: {
                orderBy: { position: 'asc' },
              },
            },
          },
        },
      });
    });

    it('should return null for non-existent case', async () => {
      // Arrange
      vi.mocked(mockPrisma.case.findUnique).mockResolvedValue(null);

      // Act
      const result = await casesService.getCaseBySlug('non-existent');

      // Assert
      expect(result).toBeNull();
    });

    it('should throw AppError for NDA case without PIN', async () => {
      // Arrange
      const mockCase = {
        id: '1',
        slug: 'nda-case',
        title: 'NDA Case',
        shortTitle: null,
        year: 2024,
        summary: 'NDA Summary',
        isNda: true,
        orderRank: '0',
        seoTitle: null,
        seoDescription: null,
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
        fontFamily: 'Inter',
        useCustomDesign: false,
        settings: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        blocks: [],
      };

      vi.mocked(mockPrisma.case.findUnique).mockResolvedValue(mockCase);

      // Act & Assert
      await expect(casesService.getCaseBySlug('nda-case')).rejects.toThrow(
        AppError
      );
      await expect(
        casesService.getCaseBySlug('nda-case')
      ).rejects.toMatchObject({
        statusCode: 403,
        code: 'pin_required',
      });
    });
  });
});

/**
 * Case Viewer Component
 *
 * Displays full case content with blocks.
 */

'use client';

import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { CaseDetail, CaseBlock } from '@/lib/apiClient';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';
import { OptimizedImage } from '@/components/atoms/OptimizedImage/OptimizedImage';
import { OptimizedVideo } from '@/components/atoms/OptimizedVideo/OptimizedVideo';
import { parseMarkdown } from '@/lib/utils/markdown';
import styles from './CaseViewer.module.scss';

export interface CaseViewerProps {
  case: CaseDetail;
  prevCase?: { slug: string; title: string; shortTitle?: string } | null;
  nextCase?: { slug: string; title: string; shortTitle?: string } | null;
}

export function CaseViewer({ case: caseData, prevCase, nextCase }: CaseViewerProps) {
  useEffect(() => {
    // Check if there's a hash in URL (e.g., #image-2 or #video-0)
    const hash = window.location.hash;
    if (hash.startsWith('#image-') || hash.startsWith('#video-')) {
      const mediaIndex = parseInt(hash.replace(/^#(image|video)-/, ''), 10);
      if (!isNaN(mediaIndex)) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          const mediaElement = document.getElementById(hash.slice(1));
          if (mediaElement) {
            mediaElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        }, 100);
      }
    }
  }, []);

  const useCustomDesign = caseData.useCustomDesign;

  const settings = useMemo(() => {
    if (!useCustomDesign) return {};
    try {
      return caseData.settings ? JSON.parse(caseData.settings) : {};
    } catch (e) {
      return {};
    }
  }, [useCustomDesign, caseData.settings]);

  // Apply background color to body for full-bleed effect
  useEffect(() => {
    if (useCustomDesign && caseData.backgroundColor) {
      document.body.style.backgroundColor = caseData.backgroundColor;
      return () => {
        document.body.style.backgroundColor = '';
      };
    } else {
      // Ensure reset if toggled off or not present
      document.body.style.backgroundColor = '';
    }
  }, [useCustomDesign, caseData.backgroundColor]);

  // Create a mapping of media items to their global image/video index
  const mediaWithIndices: Array<{
    blockId: string;
    mediaIndex: number;
    globalImageIndex: number;
    globalVideoIndex: number;
  }> = [];
  let globalImageIndex = 0;
  let globalVideoIndex = 0;

  caseData.blocks.forEach((block) => {
    if (block.type === 'MEDIA' || !block.type) {
      // Default to MEDIA if type missing
      block.medias.forEach((media, mediaIndex) => {
        mediaWithIndices.push({
          blockId: block.id,
          mediaIndex,
          globalImageIndex: media.type === 'IMAGE' ? globalImageIndex++ : -1,
          globalVideoIndex: media.type === 'VIDEO' ? globalVideoIndex++ : -1,
        });
      });
    }
  });

  // Find first visual (image or video) to preload
  const priorityMedia =
    caseData.blocks
      .map((block) => ({
        blockId: block.id,
        medias: block.medias,
      }))
      .find((entry) => entry.medias.length > 0) ?? null;

  // Determine case-level layout overrides
  const caseBlockAlign = settings.blockAlign;
  const caseBlockMargins = caseBlockAlign
    ? {
        '--case-block-margin-left':
          caseBlockAlign === 'center' || caseBlockAlign === 'right'
            ? 'auto'
            : '0',
        '--case-block-margin-right':
          caseBlockAlign === 'center' || caseBlockAlign === 'left'
            ? 'auto'
            : '0',
      }
    : {};

  const caseTextAlign = settings.textAlign;
  const caseTextColumns = settings.textColumns;

  // Custom styles for the case page
  const containerStyle = {
    ...(useCustomDesign && caseData.textColor
      ? { color: caseData.textColor, '--body-color': caseData.textColor }
      : {}),
    ...(useCustomDesign && caseData.fontFamily
      ? {
          fontFamily: caseData.fontFamily,
          '--font-family-body': caseData.fontFamily,
        }
      : {}),
    // Layout overrides
    ...caseBlockMargins,
    ...(caseTextAlign ? { '--case-text-align': caseTextAlign } : {}),
    ...(caseTextColumns ? { '--case-text-columns': caseTextColumns } : {}),
  } as React.CSSProperties;

  const titleStyle = {
    textAlign:
      useCustomDesign && settings.titleAlignment
        ? settings.titleAlignment
        : 'inherit',
    ...(useCustomDesign && settings.headingColor
      ? { color: settings.headingColor }
      : {}),
    ...(useCustomDesign && settings.headingFontFamily
      ? { fontFamily: settings.headingFontFamily }
      : {}),
  } as React.CSSProperties;

  return (
    <div className={styles.viewer} style={containerStyle}>
      {/* Header */}
      <header className={styles.header}>
        <Heading variant="large" level="h1" style={titleStyle}>
          {caseData.title}
        </Heading>
        <div className={styles.meta}>
          <Text variant="small">{caseData.year}</Text>
          {caseData.summary && <Text>{caseData.summary}</Text>}
        </div>
      </header>

      {/* Blocks */}
      <div className={styles.blocks}>
        {caseData.blocks.map((block) => (
          <CaseBlockComponent
            key={block.id}
            block={block}
            priorityMedia={
              priorityMedia?.blockId === block.id ? 0 : undefined
            }
            mediaIndices={mediaWithIndices.filter(
              (m) => m.blockId === block.id
            )}
          />
        ))}
      </div>

      {/* Navigation */}
      {(prevCase || nextCase) && (
        <nav className={styles.navigation}>
          <div className={styles.navLinks}>
            {prevCase && (
              <Link href={`/cases/${prevCase.slug}`} className={styles.navLink}>
                <Text variant="small" className={styles.navLabel}>← Предыдущий</Text>
                <Text>{prevCase.shortTitle || prevCase.title}</Text>
              </Link>
            )}
            {nextCase && (
              <Link href={`/cases/${nextCase.slug}`} className={styles.navLink}>
                <Text variant="small" className={styles.navLabel}>Следующий →</Text>
                <Text>{nextCase.shortTitle || nextCase.title}</Text>
              </Link>
            )}
          </div>
          <div className={styles.navMainLinks}>
            <Link href="/" className={styles.navMainLink}>
              <Text>На главную</Text>
            </Link>
            <Link href="/about" className={styles.navMainLink}>
              <Text>Обо мне</Text>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}

function CaseBlockComponent({
  block,
  mediaIndices,
  priorityMedia,
}: {
  block: CaseBlock;
  mediaIndices: Array<{
    blockId: string;
    mediaIndex: number;
    globalImageIndex: number;
    globalVideoIndex: number;
  }>;
  priorityMedia?: number;
}) {
  // Handle Text Block
  if (block.type === 'TEXT') {
    const settings = block.settings ? JSON.parse(block.settings) : {};

    // Block-level override for positioning
    const blockAlign = settings.blockAlign;
    const blockStyle: React.CSSProperties = {
      textAlign: settings.align,
    };

    if (blockAlign) {
      blockStyle.marginLeft =
        blockAlign === 'center' || blockAlign === 'right' ? 'auto' : '0';
      blockStyle.marginRight =
        blockAlign === 'center' || blockAlign === 'left' ? 'auto' : '0';
    }

    return (
      <div className={styles.textBlock} style={blockStyle}>
        {/* Render markdown with preserved newlines */}
        <div style={{ whiteSpace: 'pre-wrap' }}>
          {block.content?.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && '\n'}
              {parseMarkdown(line)}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // Handle Media Block (Default)
  if (block.layout === 'FULL') {
    const media = block.medias[0];
    if (!media) return null;

    const mediaInfo = mediaIndices.find((m) => m.mediaIndex === 0);
    const imageId =
      media.type === 'IMAGE' && mediaInfo
        ? `image-${mediaInfo.globalImageIndex}`
        : undefined;
    const videoId =
      media.type === 'VIDEO' && mediaInfo
        ? `video-${mediaInfo.globalVideoIndex}`
        : undefined;

    const shouldPreload = priorityMedia === 0;
    return (
      <div className={styles.blockFull}>
        <MediaItem
          url={media.url}
          type={media.type}
          alt={media.alt}
          imageId={imageId}
          videoId={videoId}
          aspectRatio={media.aspectRatio}
          priority={shouldPreload}
        />
      </div>
    );
  }

  // HALF layout
  return (
    <div className={styles.blockHalf}>
      {block.medias.map((media, index) => {
        const mediaInfo = mediaIndices.find((m) => m.mediaIndex === index);
        const imageId =
          media.type === 'IMAGE' && mediaInfo
            ? `image-${mediaInfo.globalImageIndex}`
            : undefined;
        const videoId =
          media.type === 'VIDEO' && mediaInfo
            ? `video-${mediaInfo.globalVideoIndex}`
            : undefined;

        return (
          <div key={index} className={styles.halfItem}>
            <MediaItem
              url={media.url}
              type={media.type}
              alt={media.alt}
              imageId={imageId}
              videoId={videoId}
              aspectRatio={media.aspectRatio}
              priority={priorityMedia === index}
            />
          </div>
        );
      })}
    </div>
  );
}

function MediaItem({
  url,
  type,
  alt,
  imageId,
  videoId,
  aspectRatio,
  priority = false,
}: {
  url: string;
  type: 'IMAGE' | 'VIDEO';
  alt?: string;
  imageId?: string;
  videoId?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  priority?: boolean;
}) {
  if (type === 'VIDEO') {
    // Use the same container logic as images so aspect ratio and rounded corners match.
    const ratio = aspectRatio || '16:9';
    const safeAspectRatio = ratio.replace(':', '/');
    const [w, h] = ratio.split(':').map(Number);
    const pad = w && h ? `${Math.max((h / w) * 100, 1)}%` : undefined;
    return (
      <div
        className={styles.imageContainer}
        id={videoId}
        style={{
          aspectRatio: safeAspectRatio,
          ...(pad ? { ['--image-pad' as string]: pad } : {}),
        }}
      >
        <OptimizedVideo
          src={url}
          autoPlay
          loop
          muted
          playsInline
          lazy={!priority}
          fill
          className={styles.media}
        />
      </div>
    );
  }

  // Default aspect ratio if not provided to prevent layout shift/collapse
  const ratio = aspectRatio || '16:9';
  const safeAspectRatio = ratio.replace(':', '/');
  const [w, h] = ratio.split(':').map(Number);
  const pad = w && h ? `${Math.max((h / w) * 100, 1)}%` : undefined;

  return (
    <div
      className={styles.imageContainer}
      id={imageId}
      style={{
        aspectRatio: safeAspectRatio,
        ...(pad ? { ['--image-pad' as string]: pad } : {}),
      }}
    >
      <OptimizedImage
        src={url}
        alt={alt || ''}
        fill
        priority={priority}
        fetchPriority={priority ? 'high' : 'auto'}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
        className={styles.media}
        quality={90}
      />
    </div>
  );
}

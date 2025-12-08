/**
 * Case Card Component
 *
 * Card displaying a portfolio case in the grid.
 * Shows NDA lock if case is locked, otherwise shows cover and basic info.
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CasePreview } from '@/lib/apiClient';
import { IconLock } from '@/components/atoms/IconLock/IconLock';
import { Text } from '@/components/atoms/Text/Text';
import { PinInput } from '@/components/molecules/PinInput/PinInput';
import { Loader } from '@/components/atoms/Loader/Loader';
import { OptimizedImage } from '@/components/atoms/OptimizedImage/OptimizedImage';
import { OptimizedVideo } from '@/components/atoms/OptimizedVideo/OptimizedVideo';
import { parseMarkdownLinks } from '@/lib/utils/markdown';
import styles from './CaseCard.module.scss';

export interface CaseCardProps {
  case: CasePreview;
  onPinSubmit?: (pin: string, caseSlug: string) => Promise<{ success: boolean; error?: string }>;
  lockedCaseMessage?: string | null;
}

export function CaseCard({ case: caseData, onPinSubmit, lockedCaseMessage }: CaseCardProps) {
  const router = useRouter();
  const [showPinInput, setShowPinInput] = useState(false);
  const [pinError, setPinError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPinActive, setIsPinActive] = useState(false);

  const handlePinComplete = async (pin: string) => {
    if (!onPinSubmit) return;

    setIsSubmitting(true);
    setPinError(undefined);

    const result = await onPinSubmit(pin, caseData.slug);

    if (!result.success) {
      setIsSubmitting(false);
      setPinError(result.error || 'Invalid PIN');
    } else {
      // Success - wait a bit for the case to update in parent
      setTimeout(() => {
        setIsSubmitting(false);
        setIsHovered(false);
        setIsPinActive(false);
      }, 500);
    }
  };

  const handlePinInputFocus = () => {
    setIsPinActive(true);
  };

  // Locked NDA case
  if (caseData.isLocked) {
    return (
      <div
        className={styles.card}
        data-locked="true"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => !isSubmitting && !isPinActive && setIsHovered(false)}
      >
        <div className={styles.cover}>
          <div className={styles.lockContent}>
            {isSubmitting ? (
              <Loader size={70} />
            ) : (
              <IconLock size={70} />
            )}
            {(isHovered || isPinActive) && (
              <>
                <div className={styles.pinInputContainer} onFocus={handlePinInputFocus}>
                  <PinInput
                    onComplete={handlePinComplete}
                    disabled={isSubmitting}
                    error={pinError}
                    onErrorClear={() => setPinError(undefined)}
                  />
                </div>
                {lockedCaseMessage && (
                  <Text className={styles.lockMessage} variant="body">
                    {parseMarkdownLinks(lockedCaseMessage)}
                  </Text>
                )}
              </>
            )}
          </div>
        </div>
        <div className={styles.info}>
          <span className={styles.title}>
            {caseData.shortTitle || caseData.title}
          </span>
          <span className={styles.separator}>·</span>
          <span>{caseData.year}</span>
        </div>
      </div>
    );
  }

  // Collect all media from blocks for scrolling preview
  const previewMedia = caseData.blocks
    .flatMap(block => block.medias)
    .sort((a, b) => {
      // Sort by block rank then media position would be ideal,
      // but flatMap loses block context. Assuming blocks are sorted.
      return 0;
    });

  // If no preview media, we used to fallback to cover, but now we assume first media IS the cover equivalent.
  // If absolutely no media, the card will be empty/placeholder.
  const mediaToShow = previewMedia.length > 0
    ? previewMedia
    : [];

  // Calculate global image indices (only for IMAGE type, same logic as CaseViewer)
  const mediaWithIndices: Array<{ mediaIndex: number; globalImageIndex: number }> = [];
  let globalImageIndex = 0;

  mediaToShow.forEach((media, index) => {
    if (media.type === 'IMAGE') {
      mediaWithIndices.push({
        mediaIndex: index,
        globalImageIndex: globalImageIndex++
      });
    }
  });

  const handleImageClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();

    // Find the global image index for this media item
    const mediaInfo = mediaWithIndices.find(m => m.mediaIndex === index);

    if (mediaToShow[index].type === 'IMAGE' && mediaInfo) {
      // Navigate to case page with image anchor
      router.push(`/cases/${caseData.slug}#image-${mediaInfo.globalImageIndex}`);
    } else {
      // For videos or if no index found, just go to the case page
      router.push(`/cases/${caseData.slug}`);
    }
  };

  // Regular case
  return (
    <div className={styles.card}>
      <Link href={`/cases/${caseData.slug}`} className={styles.cover}>
        <div className={styles.imagesContainer}>
          {mediaToShow.map((item, index) => (
            <div
              key={index}
              className={styles.imageWrapper}
              onClick={(e) => handleImageClick(e, index)}
              style={{
                aspectRatio: item.aspectRatio?.replace(':', '/') || '16/9'
              }}
            >
              {item.type === 'VIDEO' ? (
                <OptimizedVideo
                  src={item.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  lazy={index > 0}
                  className={styles.image}
                />
              ) : (
                <OptimizedImage
                  src={item.url}
                  alt={`${caseData.title} - ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.image}
                  quality={85}
                />
              )}
            </div>
          ))}
        </div>
      </Link>
      <Link href={`/cases/${caseData.slug}`} className={styles.info}>
        <span className={styles.title}>
          {caseData.shortTitle || caseData.title}
        </span>
        <span className={styles.separator}>·</span>
        <span>{caseData.year}</span>
      </Link>
    </div>
  );
}

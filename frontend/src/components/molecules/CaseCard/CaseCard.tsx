/**
 * Case Card Component
 *
 * Card displaying a portfolio case in the grid.
 * Shows NDA lock if case is locked, otherwise shows cover and basic info.
 */

'use client';

import { useEffect, useState } from 'react';
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
  onPinSubmit?: (
    pin: string,
    caseSlug: string
  ) => Promise<{ success: boolean; error?: string }>;
  lockedCaseMessage?: string | null;
  priority?: boolean; // hint to preload first visual
}

export function CaseCard({
  case: caseData,
  onPinSubmit,
  lockedCaseMessage,
  priority = false,
}: CaseCardProps) {
  const router = useRouter();
  const [pinError, setPinError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPinActive, setIsPinActive] = useState(false);
  const [isNoHoverDevice, setIsNoHoverDevice] = useState(false);

  // On touch devices there's no hover, so NDA cards must show the PIN form by default.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia?.('(hover: none), (pointer: coarse)');
    if (!mql) return;

    const apply = () => {
      const touchPoints =
        typeof navigator !== 'undefined' ? navigator.maxTouchPoints || 0 : 0;
      setIsNoHoverDevice(!!mql.matches || touchPoints > 0);
    };
    apply();

    // Safari <14 uses addListener/removeListener
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyMql: any = mql;
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', apply);
      return () => mql.removeEventListener('change', apply);
    }
    if (typeof anyMql.addListener === 'function') {
      anyMql.addListener(apply);
      return () => anyMql.removeListener(apply);
    }
  }, []);

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
        onMouseLeave={() =>
          !isSubmitting && !isPinActive && setIsHovered(false)
        }
      >
        <div className={styles.cover}>
          <div className={styles.lockContent}>
            {isSubmitting ? <Loader size={70} /> : <IconLock size={70} />}
            {(isNoHoverDevice || isHovered || isPinActive) && (
              <>
                <div
                  className={styles.pinInputContainer}
                  onFocus={handlePinInputFocus}
                >
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
    .flatMap((block) => block.medias)
    .sort((_a, _b) => {
      // Sort by block rank then media position would be ideal,
      // but flatMap loses block context. Assuming blocks are sorted.
      return 0;
    });

  // If no preview media, we used to fallback to cover, but now we assume first media IS the cover equivalent.
  // If absolutely no media, the card will be empty/placeholder.
  const mediaToShow = previewMedia.length > 0 ? previewMedia : [];

  // Calculate global image/video indices (same logic as CaseViewer)
  const mediaWithIndices: Array<{
    mediaIndex: number;
    globalImageIndex: number;
    globalVideoIndex: number;
  }> = [];
  let globalImageIndex = 0;
  let globalVideoIndex = 0;

  mediaToShow.forEach((media, index) => {
    mediaWithIndices.push({
      mediaIndex: index,
      globalImageIndex: media.type === 'IMAGE' ? globalImageIndex++ : -1,
      globalVideoIndex: media.type === 'VIDEO' ? globalVideoIndex++ : -1,
    });
  });

  const handleImageClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();

    // Find the global image/video index for this media item
    const mediaInfo = mediaWithIndices.find((m) => m.mediaIndex === index);

    if (mediaToShow[index].type === 'IMAGE' && mediaInfo && mediaInfo.globalImageIndex >= 0) {
      // Navigate to case page with image anchor
      router.push(
        `/cases/${caseData.slug}#image-${mediaInfo.globalImageIndex}`
      );
    } else if (mediaToShow[index].type === 'VIDEO' && mediaInfo && mediaInfo.globalVideoIndex >= 0) {
      // Navigate to case page with video anchor
      router.push(
        `/cases/${caseData.slug}#video-${mediaInfo.globalVideoIndex}`
      );
    } else {
      // Fallback: just go to the case page
      router.push(`/cases/${caseData.slug}`);
    }
  };

  // Check if case has custom background color
  const customBgColor = (caseData as any).useCustomDesign && (caseData as any).backgroundColor
    ? (caseData as any).backgroundColor
    : undefined;

  // Regular case
  return (
    <div className={styles.card}>
      <Link 
        href={`/cases/${caseData.slug}`} 
        className={styles.cover}
        style={customBgColor ? { backgroundColor: customBgColor } : undefined}
      >
        <div className={styles.imagesContainer}>
          {mediaToShow.map((item, index) => {
            const ratio = item.aspectRatio || '16:9';
            const [w, h] = ratio.split(':').map(Number);
            const pad =
              w && h ? `${Math.max((h / w) * 100, 1)}%` : undefined;
            return (
            <div
              key={index}
              className={styles.imageWrapper}
              onClick={(e) => handleImageClick(e, index)}
              style={{
                aspectRatio: ratio.replace(':', '/'),
                ...(pad ? { ['--image-pad' as string]: pad } : {}),
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
                  // Wrapper already defines aspect ratio, so fill it.
                  fill
                  className={styles.image}
                  />
                ) : (
                  <OptimizedImage
                    src={item.url}
                    alt={`${caseData.title} - ${index + 1}`}
                    fill
                    priority={priority && index === 0}
                    fetchPriority={priority && index === 0 ? 'high' : 'auto'}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.image}
                    quality={85}
                  />
                )}
            </div>
            );
          })}
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

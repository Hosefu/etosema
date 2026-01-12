'use client';

import { useEffect, useState } from 'react';
import { getDesignSettings } from '@/lib/apiClient';
import { DesignData } from '@/lib/apiClient/types';

export function DesignSystemProvider() {
  const [design, setDesign] = useState<DesignData | null>(null);

  useEffect(() => {
    getDesignSettings()
      .then((res) => {
        if (res.data) {
          setDesign(res.data);
        }
      })
      .catch((err) => console.error('Failed to load design system:', err));
  }, []);

  if (!design || !design.settings) return null;

  const s = design.settings;
  const fonts = design.fonts;

  const blockAlign = s.grid?.blockAlign ?? 'center';
  const marginLeft =
    blockAlign === 'center' || blockAlign === 'right' ? 'auto' : '0';
  const marginRight =
    blockAlign === 'center' || blockAlign === 'left' ? 'auto' : '0';

  // Construct CSS variables
  // Scaled variables (typography, grid, spacing, cards) must be UNITLESS because --scale has 'vw' unit.
  // Link variables are used directly so they need 'px'.
  const cssVariables = `
    :root {
      --body-size: ${s.typography.body.size};
      --body-line-height: ${s.typography.body.lineHeight / 100};
      --body-letter-spacing: ${s.typography.body.letterSpacing / 100}em;
      --body-color: ${s.typography.body.color};
      --font-family-body: '${s.typography.body.family}', -apple-system, BlinkMacSystemFont, sans-serif;

      --heading-small-size: ${s.typography.headingSmall.size};
      --heading-small-line-height: ${s.typography.headingSmall.lineHeight / 100};
      --heading-small-letter-spacing: ${s.typography.headingSmall.letterSpacing / 100}em;
      --heading-small-color: ${s.typography.headingSmall.color};
      --font-family-heading-small: '${s.typography.headingSmall.family}', -apple-system, BlinkMacSystemFont, sans-serif;

      --heading-large-size: ${s.typography.headingLarge.size};
      --heading-large-line-height: ${s.typography.headingLarge.lineHeight / 100};
      --heading-large-letter-spacing: ${s.typography.headingLarge.letterSpacing / 100}em;
      --heading-large-color: ${s.typography.headingLarge.color};
      --font-family-heading-large: '${s.typography.headingLarge.family}', -apple-system, BlinkMacSystemFont, sans-serif;

      --color-bg-page: ${s.colors.background};
      --color-bg-card: ${s.colors.card};
      
      --link-offset: ${s.links.offset}px;
      --link-color: ${s.links.color};
      --link-thickness: ${s.links.thickness ?? 1}px;

      --card-radius: ${s.borderRadius?.cardOuter ?? s.cards?.borderRadius ?? 0};
      --card-radius-inner: ${s.borderRadius?.cardInner ?? 12};
      --media-radius: ${s.borderRadius?.media ?? 8};
      --card-padding: ${s.cards?.padding ?? 0};
      --card-height-css: ${s.cards?.height && s.cards.height > 0 ? `calc(var(--scale) * ${s.cards.height})` : 'auto'};

      --grid-margin: ${s.grid?.margin ?? 24};
      --grid-gutter: ${s.grid?.gutter ?? 24};
      --case-text-columns: ${s.grid?.textColumns ?? 8};
      --case-text-align: ${s.grid?.textAlign ?? 'left'};
      --case-block-align: ${s.grid?.blockAlign ?? 'center'};
      
      --case-block-margin-left: ${marginLeft};
      --case-block-margin-right: ${marginRight};
      
      --base-gap: ${s.spacing?.baseGap ?? 12};
    }
  `;

  const googleFonts = fonts.filter(
    (f) =>
      f.format === 'google' ||
      (typeof f.url === 'string' && f.url.includes('fonts.googleapis.com'))
  );

  const googleImports = Array.from(new Set(googleFonts.map((f) => f.url)))
    .map((url) => `@import url('${url}');`)
    .join('\n');

  const uploadedFonts = fonts.filter((f) => !googleFonts.includes(f));
  const fontFaces = uploadedFonts
    .map(
      (f) => `
    @font-face {
      font-family: '${f.family}';
      src: url('${f.url}') format('${f.format === 'ttf' ? 'truetype' : f.format}');
      font-weight: ${f.weight};
      font-style: ${f.style};
      font-display: swap;
    }
  `
    )
    .join('\n');

  return (
    <style
      dangerouslySetInnerHTML={{ __html: googleImports + '\n' + fontFaces + cssVariables }}
    />
  );
}

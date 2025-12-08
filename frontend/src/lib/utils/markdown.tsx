/**
 * Markdown Utilities
 *
 * Simple utilities for rendering markdown content.
 */

import React from 'react';

/**
 * Parse markdown links and return React elements
 * Converts [text](url) to <a> tags
 */
export function parseMarkdownLinks(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  // Regular expression to match markdown links: [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Add the link
    const linkText = match[1];
    const linkUrl = match[2];
    parts.push(
      <a
        key={match.index}
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: 'underline',
          textDecorationColor: 'rgba(0, 0, 0, 0.3)',
          textUnderlineOffset: '25%',
          textDecorationThickness: 'var(--link-thickness, 1px)',
        }}
      >
        {linkText}
      </a>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

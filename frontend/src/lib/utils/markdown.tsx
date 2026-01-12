/**
 * Markdown Utilities
 *
 * Simple utilities for rendering markdown content.
 */

import React from 'react';

/**
 * Parse markdown and return React elements
 * Supports:
 * - [text](url) - links
 * - **text** - bold
 * - ~~text~~ - strikethrough
 * - __text__ - underline (non-standard, but requested)
 */
export function parseMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let key = 0;

  // Combined regex for all markdown patterns
  // Order matters: links first, then bold, then strikethrough, then underline
  const markdownRegex = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(__([^_]+)__)|(?<!~)(~~([^~]+)~~)/g;
  
  let lastIndex = 0;
  let match;

  while ((match = markdownRegex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      const plainText = text.substring(lastIndex, match.index);
      parts.push(<React.Fragment key={key++}>{plainText}</React.Fragment>);
    }

    // Determine which pattern matched
    if (match[1]) {
      // Link: [text](url)
      const linkText = match[2];
      const linkUrl = match[3];
      parts.push(
        <a
          key={key++}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'underline',
            textDecorationColor: 'var(--link-color, rgba(0, 0, 0, 0.3))',
            textUnderlineOffset: 'var(--link-offset, 0.25em)',
            textDecorationThickness: 'var(--link-thickness, 1px)',
          }}
        >
          {linkText}
        </a>
      );
    } else if (match[4]) {
      // Bold: **text**
      parts.push(
        <strong key={key++} style={{ fontWeight: 600 }}>
          {match[5]}
        </strong>
      );
    } else if (match[6]) {
      // Underline: __text__
      parts.push(
        <span key={key++} style={{ textDecoration: 'underline' }}>
          {match[7]}
        </span>
      );
    } else if (match[8]) {
      // Strikethrough: ~~text~~
      parts.push(
        <span key={key++} style={{ textDecoration: 'line-through' }}>
          {match[9]}
        </span>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    const remaining = text.substring(lastIndex);
    parts.push(<React.Fragment key={key++}>{remaining}</React.Fragment>);
  }

  return parts.length > 0 ? parts : text;
}

/**
 * Parse markdown links and return React elements
 * Converts [text](url) to <a> tags
 * @deprecated Use parseMarkdown instead for full markdown support
 */
export function parseMarkdownLinks(text: string): React.ReactNode {
  return parseMarkdown(text);
}

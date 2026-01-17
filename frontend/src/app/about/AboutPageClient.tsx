'use client';

import { useEffect, useRef, useState } from 'react';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';
import { Link } from '@/components/atoms/Link/Link';
import { Loader } from '@/components/atoms/Loader/Loader';
import { useProfile } from '@/hooks/useApi';
import styles from './page.module.scss';

export default function AboutPageClient() {
  const { data: profile, isLoading: loading, error } = useProfile();
  const [cvMenuOpen, setCvMenuOpen] = useState(false);
  const cvMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cvMenuOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (!cvMenuRef.current) return;
      const target = event.target as Node;
      if (!cvMenuRef.current.contains(target)) {
        setCvMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [cvMenuOpen]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2147483647,
          backgroundColor: 'var(--color-bg-page, #fff)',
        }}
      >
        <Loader size={60} />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>
          Error: {error ? (error as Error).message : 'Profile not found'}
        </div>
      </div>
    );
  }

  const cvItems = [
    {
      key: 'docx',
      label: 'Скачать DOCX',
      url: profile.cvDocxUrl,
      enabled: profile.cvDocxEnabled,
      download: true,
    },
    {
      key: 'pdf',
      label: 'Скачать PDF',
      url: profile.cvPdfUrl,
      enabled: profile.cvPdfEnabled,
      download: true,
    },
    {
      key: 'hh',
      label: 'Перейти на Hh.ru',
      url: profile.cvHhUrl,
      enabled: profile.cvHhEnabled,
      download: false,
    },
    {
      key: 'habr',
      label: 'Перейти на Хабр Карьеру',
      url: profile.cvHabrUrl,
      enabled: profile.cvHabrEnabled,
      download: false,
    },
  ].filter((item) => item.enabled && item.url);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.titleSection}>
          <Heading variant="large" level="h1">
            {profile.title}
          </Heading>
        </div>

        <div className={styles.descriptionSection}>
          <Text>{profile.description}</Text>
        </div>

        <div className={styles.columnsSection}>
          <div className={styles.column}>
            <Heading variant="small" level="h2">
              {profile.contacts.title}
            </Heading>
            <div className={styles.links}>
              {profile.contacts.items.map((item, index: number) => (
                <Link
                  key={`${profile.contacts.title}-${index}`}
                  href={item.url}
                  external
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.column}>
            <Heading variant="small" level="h2">
              {profile.projects.title}
            </Heading>
            <div className={styles.links}>
              {profile.projects.items.map((item, index: number) => (
                <Link
                  key={`${profile.projects.title}-${index}`}
                  href={item.url}
                  external
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.column}>
            <Heading variant="small" level="h2">
              {profile.socials.title}
            </Heading>
            <div className={styles.links}>
              {profile.socials.items.map((item, index: number) => (
                <Link
                  key={`${profile.socials.title}-${index}`}
                  href={item.url}
                  external
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {cvItems.length > 0 && (
            <div className={styles.column}>
              <div className={styles.cvBlock} ref={cvMenuRef}>
                <button
                  type="button"
                  className={styles.cvButton}
                  onClick={() => setCvMenuOpen((prev) => !prev)}
                  aria-haspopup="menu"
                  aria-expanded={cvMenuOpen}
                >
                  Скачать CV
                </button>
                {cvMenuOpen && (
                  <div className={styles.cvMenu} role="menu">
                    {cvItems.map((item) => (
                      <a
                        key={item.key}
                        href={item.url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cvMenuItem}
                        download={item.download ? '' : undefined}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


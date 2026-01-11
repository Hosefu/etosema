'use client';

import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';
import { Link } from '@/components/atoms/Link/Link';
import { Loader } from '@/components/atoms/Loader/Loader';
import { useProfile } from '@/hooks/useApi';
import styles from './page.module.scss';

export default function AboutPageClient() {
  const { data: profile, isLoading: loading, error } = useProfile();

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
        </div>
      </div>
    </div>
  );
}


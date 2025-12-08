'use client';

import { useEffect, useState } from 'react';
import { getProfile, ProfileData } from '@/lib/apiClient';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';
import { Link } from '@/components/atoms/Link/Link';
import { Loader } from '@/components/atoms/Loader/Loader';
import styles from './page.module.scss';

export default function AboutPage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await getProfile();

        if (response.error) {
          setError(response.error.message);
          return;
        }

        setProfile(response.data || null);
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2147483647,
        backgroundColor: 'var(--color-bg-page, #fff)'
      }}>
        <Loader size={60} />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>Error: {error || 'Profile not found'}</div>
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
              {profile.contacts.items.map((item, index) => (
                <Link key={index} href={item.url} external>
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
              {profile.projects.items.map((item, index) => (
                <Link key={index} href={item.url} external>
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
              {profile.socials.items.map((item, index) => (
                <Link key={index} href={item.url} external>
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

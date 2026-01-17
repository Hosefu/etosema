/**
 * Admin Layout
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Layout, Menu } from 'antd';
import {
  FolderOutlined,
  LockOutlined,
  UserOutlined,
  LogoutOutlined,
  BgColorsOutlined,
  RobotOutlined,
} from '@ant-design/icons';
import { clearAdminToken, adminGetProfile } from '@/lib/adminClient';

const { Content, Sider } = Layout;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedKey, setSelectedKey] = useState('cases');
  const [logoText, setLogoText] = useState('');

  useEffect(() => {
    // Check auth
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('admin_token')
        : null;
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else if (token) {
      adminGetProfile()
        .then((res) => {
          if (res.success && res.data) {
            setLogoText(res.data.logoText || 'Etosema');
          }
        })
        .catch(() => setLogoText('Etosema'));
    }

    // Set active menu item
    if (pathname.includes('/cases')) setSelectedKey('cases');
    else if (pathname.includes('/pins')) setSelectedKey('pins');
    else if (pathname.includes('/profile')) setSelectedKey('profile');
    else if (pathname.includes('/design')) setSelectedKey('design');
    else if (pathname.includes('/monitoring')) setSelectedKey('monitoring');
  }, [pathname, router]);

  const handleLogout = () => {
    clearAdminToken();
    router.push('/admin/login');
  };

  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const menuItems = [
    {
      key: 'cases',
      icon: <FolderOutlined />,
      label: 'Кейсы',
      onClick: () => router.push('/admin/cases'),
    },
    {
      key: 'pins',
      icon: <LockOutlined />,
      label: 'PIN-коды',
      onClick: () => router.push('/admin/pins'),
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Профиль',
      onClick: () => router.push('/admin/profile'),
    },
    {
      key: 'design',
      icon: <BgColorsOutlined />,
      label: 'Дизайн',
      onClick: () => router.push('/admin/design'),
    },
    {
      key: 'monitoring',
      icon: <RobotOutlined />,
      label: 'Мониторинг',
      onClick: () => router.push('/admin/monitoring'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Выход',
      onClick: handleLogout,
      style: { marginTop: 'auto' },
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} theme="dark">
        <div
          style={{
            padding: '16px',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          Админка для «{logoText || '...'}»
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: '24px',
            background: '#fff',
            padding: '24px',
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

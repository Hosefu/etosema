'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Layout,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  ColorPicker,
  Button,
  Upload,
  List,
  message,
  Row,
  Col,
  Typography,
  Divider,
  Radio,
} from 'antd';
import {
  UploadOutlined,
  DeleteOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import {
  adminGetDesign,
  adminUpdateDesign,
  adminUploadFaviconBase,
  adminUploadFaviconIco,
  adminUploadFaviconMask,
  adminUploadFile,
  adminUploadFont,
  adminAddGoogleFont,
  adminDeleteFont,
  DesignSettings,
  Font,
  TypographyConfig,
} from '@/lib/adminClient';
import type { UploadProps } from 'antd';

const { Text } = Typography;

function FaviconPreviewGrid({ favicons }: { favicons: any }) {
  const items: Array<{ key: string; label: string; url?: string; size?: number }> = [
    { key: 'png16', label: 'PNG 16×16', url: favicons?.png16, size: 16 },
    { key: 'png32', label: 'PNG 32×32', url: favicons?.png32, size: 32 },
    { key: 'png48', label: 'PNG 48×48', url: favicons?.png48, size: 48 },
    { key: 'png64', label: 'PNG 64×64', url: favicons?.png64, size: 64 },
    { key: 'apple180', label: 'Apple Touch (iOS) 180×180', url: favicons?.apple180, size: 60 },
    { key: 'android192', label: 'Android 192×192', url: favicons?.android192, size: 64 },
    { key: 'android512', label: 'Android 512×512', url: favicons?.android512, size: 80 },
    { key: 'ico', label: 'favicon.ico', url: favicons?.ico, size: 32 },
    { key: 'svg', label: 'favicon.svg', url: favicons?.svg, size: 32 },
    { key: 'maskIconUrl', label: 'mask-icon.svg (Safari)', url: favicons?.maskIconUrl, size: 32 },
    { key: 'manifestUrl', label: 'webmanifest', url: favicons?.manifestUrl },
  ];

  const visible = items.filter((i) => i.url);
  if (visible.length === 0) {
    return <Text type="secondary">Пока не загружено.</Text>;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 12,
      }}
    >
      {visible.map((i) => (
        <div
          key={i.key}
          style={{
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: 12,
            padding: 12,
            background: '#fff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {i.size ? (
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  background: 'rgba(0,0,0,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={i.url}
                  alt={i.label}
                  width={i.size}
                  height={i.size}
                  style={{ imageRendering: 'auto' }}
                />
              </div>
            ) : (
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  background: 'rgba(0,0,0,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  color: 'rgba(0,0,0,0.6)',
                }}
              >
                JSON
              </div>
            )}

            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 600, lineHeight: 1.2 }}>{i.label}</div>
              <a href={i.url} target="_blank" rel="noreferrer" style={{ fontSize: 12 }}>
                Открыть
              </a>
            </div>
          </div>
          {i.key === 'maskIconUrl' && favicons?.maskColor ? (
            <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(0,0,0,0.6)' }}>
              Цвет: <Text code>{String(favicons.maskColor)}</Text>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

const GoogleMonoIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    style={{
      display: 'inline-block',
      verticalAlign: 'text-bottom',
      color: 'rgba(0,0,0,0.65)',
    }}
    aria-hidden
  >
    <path
      fill="currentColor"
      d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20c10.1 0 18.5-7.35 19.8-17H26v-6h18c.13.98.2 2 .2 3 0 11.05-8.95 20-20 20S4 35.05 4 24 12.95 4 24 4zm-1 16h13v6h-7c-1.2 4.05-5 7-9.5 7A10.5 10.5 0 1 1 23 20z"
    />
  </svg>
);

// Initial default state to avoid null checks
const defaultTypography: TypographyConfig = {
  family: 'Inter',
  size: 16,
  lineHeight: 120,
  letterSpacing: 0,
  color: '#000000',
};

const defaultSettings: DesignSettings = {
  id: 0,
  typography: {
    body: {
      ...defaultTypography,
      size: 18,
      lineHeight: 135,
      letterSpacing: -3,
    },
    headingSmall: {
      ...defaultTypography,
      size: 26,
      lineHeight: 100,
      letterSpacing: -3,
    },
    headingLarge: {
      ...defaultTypography,
      size: 90,
      lineHeight: 90,
      letterSpacing: -3,
    },
  },
  colors: {
    background: '#f5f5f5',
    card: '#ffffff',
    textPrimary: '#1a1a1a',
    textSecondary: '#666666',
  },
  links: {
    offset: 2,
    color: 'rgba(0,0,0,0.2)',
    thickness: 1,
  },
  cards: {
    borderRadius: 0,
    padding: 0,
    paddingBottom: 0,
    height: 0,
  },
  grid: {
    margin: 24,
    gutter: 24,
    textColumns: 8,
    textAlign: 'left',
  },
  spacing: {
    baseGap: 12,
  },
  faviconUrl: null,
  favicons: null,
  seo: {
    siteName: 'Портфолио Сёмы',
    homeTitle: 'Сёма — Коммуникационный дизайнер',
    homeDescription: 'Портфолио коммуникационной дизайнерки Сёмы',
    aboutTitle: 'Обо мне — Сёма',
    aboutDescription: 'Контакты и информация обо мне',
    caseTitleTemplate: '{title} — Сёма',
    caseDescriptionFallback: '',
  },
};

// Typography Editor Component
interface TypographyEditorProps {
  value: TypographyConfig;
  onChange: (val: TypographyConfig) => void;
  fonts: Font[];
  label: string;
}

const TypographyEditor = ({
  value,
  onChange,
  fonts,
  label,
}: TypographyEditorProps) => {
  const handleChange = (
    key: keyof TypographyConfig,
    val: number | string | null
  ) => {
    onChange({ ...value, [key]: val });
  };

  const fontOptions = [
    {
      label: 'System Fonts',
      options: [
        { label: 'Inter', value: 'Inter' },
        { label: 'Arial', value: 'Arial' },
        { label: 'Helvetica', value: 'Helvetica' },
        { label: 'Times New Roman', value: 'Times New Roman' },
        { label: 'Georgia', value: 'Georgia' },
      ],
    },
    {
      label: 'Uploaded Fonts',
      options: fonts.map((f) => ({ label: f.name, value: f.family })),
    },
  ];

  return (
    <div
      style={{
        marginBottom: 24,
        padding: 16,
        border: '1px solid #f0f0f0',
        borderRadius: 8,
      }}
    >
      <Text strong style={{ display: 'block', marginBottom: 16 }}>
        {label}
      </Text>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item label="Шрифт" style={{ marginBottom: 8 }}>
            <Select
              value={value.family}
              onChange={(v) => handleChange('family', v)}
              options={fontOptions}
              showSearch
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Цвет" style={{ marginBottom: 8 }}>
            <ColorPicker
              value={value.color}
              onChange={(_c, hex) => handleChange('color', hex)}
              showText
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Размер (px)" style={{ marginBottom: 8 }}>
            <InputNumber
              value={value.size}
              onChange={(v) => handleChange('size', v)}
              min={1}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Интерлиньяж (%)" style={{ marginBottom: 8 }}>
            <InputNumber
              value={value.lineHeight}
              onChange={(v) => handleChange('lineHeight', v)}
              min={0}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Кернинг (%)" style={{ marginBottom: 8 }}>
            <InputNumber
              value={value.letterSpacing}
              onChange={(v) => handleChange('letterSpacing', v)}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default function DesignPage() {
  const [settings, setSettings] = useState<DesignSettings>(defaultSettings);
  const [fonts, setFonts] = useState<Font[]>([]);
  const [googleFontUrl, setGoogleFontUrl] = useState<string>('');
  const [, setLoading] = useState(true);
  const [saving, setSave] = useState(false);
  const [maskColor, setMaskColor] = useState<string>('#000000');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await adminGetDesign();
      if (res.success && res.data) {
        setSettings({
          ...defaultSettings,
          ...res.data.settings,
          // Deep merge objects to ensure new fields are present if DB has partial data
          cards: { ...defaultSettings.cards, ...res.data.settings.cards },
          grid: { ...defaultSettings.grid, ...res.data.settings.grid },
          spacing: { ...defaultSettings.spacing, ...res.data.settings.spacing },
          links: { ...defaultSettings.links, ...res.data.settings.links },
          typography: {
            body: {
              ...defaultSettings.typography.body,
              ...res.data.settings.typography.body,
            },
            headingSmall: {
              ...defaultSettings.typography.headingSmall,
              ...res.data.settings.typography.headingSmall,
            },
            headingLarge: {
              ...defaultSettings.typography.headingLarge,
              ...res.data.settings.typography.headingLarge,
            },
          },
          colors: { ...defaultSettings.colors, ...res.data.settings.colors },
          seo: {
            ...defaultSettings.seo,
            ...(res.data.settings.seo || {}),
          },
          favicons: (res.data.settings as any).favicons || null,
        });
        setFonts(res.data.fonts);
      }
    } catch (e) {
      message.error('Failed to load design settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSave(true);
      const res = await adminUpdateDesign(settings);
      if (res.success) {
        message.success('Настройки сохранены');
      } else {
        message.error('Ошибка сохранения');
      }
    } catch (e) {
      message.error('Ошибка сохранения');
    } finally {
      setSave(false);
    }
  };

  const handleFontUpload: UploadProps['customRequest'] = async (options) => {
    const { file, onSuccess, onError } = options;
    try {
      const uploadFile = file as File;
      const res = await adminUploadFont(uploadFile, {
        family: uploadFile.name.split('.')[0],
      });
      if (res.success) {
        message.success('Шрифт загружен');
        loadData(); // Reload to get updated list
        onSuccess?.(res.data as unknown as void);
      } else {
        onError?.(new Error('Upload failed'));
      }
    } catch (e) {
      onError?.(e as Error);
    }
  };

  // Legacy single-file favicon uploader removed: use the favicon set generator (base/ico/mask).

  const handleFaviconBaseUpload: UploadProps['customRequest'] = async (
    options
  ) => {
    const { file, onSuccess, onError } = options;
    try {
      const uploadFile = file as File;
      const res = await adminUploadFaviconBase(uploadFile);
      if (res.success && res.data?.favicons) {
        const favicons = res.data.favicons;
        setSettings((prev) => ({
          ...prev,
          faviconUrl: res.data?.faviconUrl ?? prev.faviconUrl,
          favicons,
        }));
        message.success('Favicon-набор сгенерирован и сохранён');
        onSuccess?.(res.data as unknown as void);
      } else {
        onError?.(new Error('Upload failed'));
      }
    } catch (e) {
      onError?.(e as Error);
    }
  };

  const handleFaviconIcoUpload: UploadProps['customRequest'] = async (options) => {
    const { file, onSuccess, onError } = options;
    try {
      const uploadFile = file as File;
      const res = await adminUploadFaviconIco(uploadFile);
      if (res.success && res.data?.favicons) {
        setSettings((prev) => ({ ...prev, favicons: res.data!.favicons! }));
        message.success('favicon.ico загружен');
        onSuccess?.(res.data as unknown as void);
      } else {
        onError?.(new Error('Upload failed'));
      }
    } catch (e) {
      onError?.(e as Error);
    }
  };

  const handleFaviconMaskUpload: UploadProps['customRequest'] = async (options) => {
    const { file, onSuccess, onError } = options;
    try {
      const uploadFile = file as File;
      const res = await adminUploadFaviconMask(uploadFile, maskColor);
      if (res.success && res.data?.favicons) {
        setSettings((prev) => ({ ...prev, favicons: res.data!.favicons! }));
        message.success('Safari mask-icon загружен');
        onSuccess?.(res.data as unknown as void);
      } else {
        onError?.(new Error('Upload failed'));
      }
    } catch (e) {
      onError?.(e as Error);
    }
  };

  const handleDeleteFont = async (id: string) => {
    try {
      await adminDeleteFont(id);
      message.success('Шрифт удален');
      setFonts(fonts.filter((f) => f.id !== id));
    } catch (e) {
      message.error('Ошибка удаления');
    }
  };

  const handleAddGoogleFont = async () => {
    try {
      if (!googleFontUrl.trim()) {
        message.error('Вставь ссылку на Google Fonts');
        return;
      }

      const res = await adminAddGoogleFont(googleFontUrl.trim());
      if (res.success && res.data) {
        message.success('Google Font добавлен');
        setFonts([res.data, ...fonts]);
        setGoogleFontUrl('');
      } else {
        message.error('Не удалось добавить Google Font');
      }
    } catch (e) {
      console.error(e);
      message.error('Ошибка добавления Google Font');
    }
  };

  const fontFaceStyles = useMemo(() => {
    return fonts
      .map(
        (f) => `
      @font-face {
        font-family: '${f.family}';
        src: url('${f.url}') format('${f.format === 'ttf' ? 'truetype' : f.format}');
        font-weight: ${f.weight};
        font-style: ${f.style};
      }
    `
      )
      .join('\n');
  }, [fonts]);

  return (
    <Layout style={{ background: 'transparent' }}>
      <style dangerouslySetInnerHTML={{ __html: fontFaceStyles }} />

      <div style={{ display: 'block' }}>
        <div style={{ width: '100%', maxWidth: 1400, margin: '0 auto', padding: '0 16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              marginBottom: 16,
            }}
          >
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}>
                Настройки дизайна
              </div>
              <Text type="secondary">
                Меняй внешний вид сайта. Нажми «Сохранить», чтобы применить изменения.
              </Text>
            </div>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              loading={saving}
              onClick={handleSave}
            >
              Сохранить
            </Button>
          </div>

          <Card title="Бренд" style={{ marginBottom: 16 }}>
            <Text type="secondary" style={{ display: 'block', marginBottom: 12 }}>
              Шрифты, размеры, цвета и стиль ссылок — влияет на общее “ощущение” сайта.
            </Text>

            <Text strong>Типографика</Text>
            <div style={{ marginTop: 8 }}>
              <TypographyEditor
                label="Основной текст"
                value={settings.typography.body}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    typography: { ...settings.typography, body: v },
                  })
                }
                fonts={fonts}
              />
              <TypographyEditor
                label="Заголовок (малый)"
                value={settings.typography.headingSmall}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    typography: { ...settings.typography, headingSmall: v },
                  })
                }
                fonts={fonts}
              />
              <TypographyEditor
                label="Заголовок (крупный)"
                value={settings.typography.headingLarge}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    typography: { ...settings.typography, headingLarge: v },
                  })
                }
                fonts={fonts}
              />
            </div>

            <Divider />

            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Text strong>Цвета</Text>
                <div style={{ marginTop: 8 }}>
                  <Form.Item label="Фон страницы">
                    <ColorPicker
                      value={settings.colors.background}
                      onChange={(_c, hex) =>
                        setSettings({
                          ...settings,
                          colors: { ...settings.colors, background: hex },
                        })
                      }
                      showText
                    />
                  </Form.Item>
                  <Form.Item label="Фон карточек">
                    <ColorPicker
                      value={settings.colors.card}
                      onChange={(_c, hex) =>
                        setSettings({
                          ...settings,
                          colors: { ...settings.colors, card: hex },
                        })
                      }
                      showText
                    />
                  </Form.Item>
                </div>
              </Col>

              <Col xs={24} md={12}>
                <Text strong>Ссылки</Text>
                <Text type="secondary" style={{ display: 'block', marginTop: 6 }}>
                  Подчёркивание у ссылок и его позиция относительно текста.
                </Text>
                <div style={{ marginTop: 8 }}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Отступ линии (px)">
                        <InputNumber
                          value={settings.links.offset}
                          onChange={(v) =>
                            setSettings({
                              ...settings,
                              links: { ...settings.links, offset: v || 0 },
                            })
                          }
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Толщина линии (px)">
                        <InputNumber
                          value={settings.links.thickness || 1}
                          onChange={(v) =>
                            setSettings({
                              ...settings,
                              links: { ...settings.links, thickness: v || 1 },
                            })
                          }
                          min={1}
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label="Цвет подчёркивания">
                    <ColorPicker
                      value={settings.links.color}
                      onChange={(_c, hex) =>
                        setSettings({
                          ...settings,
                          links: { ...settings.links, color: hex },
                        })
                      }
                      showText
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Card>

          <Card title="Логотип и брендинг" style={{ marginBottom: 16 }}>
            <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
              SVG логотип автоматически окрашивается цветом заголовка в кейсах. PNG логотипы устарели.
            </Text>

            <Form.Item label="SVG логотип (с собственными цветами)">
              <Upload
                accept=".svg"
                maxCount={1}
                showUploadList={false}
                customRequest={async (options) => {
                  const { file, onSuccess, onError } = options;
                  try {
                    const uploadFile = file as File;
                    const data = await adminUploadFile(uploadFile);
                    if (data.success && data.data?.url) {
                      setSettings((prev) => ({ ...prev, logoSvgUrl: data.data!.url }));
                      message.success('SVG логотип загружен');
                      onSuccess?.(data as unknown as void);
                    } else {
                      throw new Error('Upload failed');
                    }
                  } catch (e) {
                    message.error('Ошибка загрузки');
                    onError?.(e as Error);
                  }
                }}
              >
                <Button icon={<UploadOutlined />}>Загрузить SVG</Button>
              </Upload>
              {settings.logoSvgUrl && (
                <div style={{ marginTop: 8 }}>
                  <img src={settings.logoSvgUrl} alt="Logo preview" style={{ maxHeight: 40 }} />
                  <Button 
                    type="link" 
                    danger 
                    size="small"
                    onClick={() => setSettings({ ...settings, logoSvgUrl: null })}
                  >
                    Удалить
                  </Button>
                </div>
              )}
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 4 }}>
                Приоритет #1. SVG с цветами (не окрашивается автоматически)
              </Text>
            </Form.Item>

            <Form.Item label="SVG-mask логотип (для окрашивания)">
              <Upload
                accept=".svg"
                maxCount={1}
                showUploadList={false}
                customRequest={async (options) => {
                  const { file, onSuccess, onError } = options;
                  try {
                    const uploadFile = file as File;
                    const data = await adminUploadFile(uploadFile);
                    if (data.success && data.data?.url) {
                      setSettings((prev) => ({
                        ...prev,
                        logoSvgMaskUrl: data.data!.url,
                      }));
                      message.success('SVG-mask логотип загружен');
                      onSuccess?.(data as unknown as void);
                    } else {
                      throw new Error('Upload failed');
                    }
                  } catch (e) {
                    message.error('Ошибка загрузки');
                    onError?.(e as Error);
                  }
                }}
              >
                <Button icon={<UploadOutlined />}>Загрузить SVG-mask</Button>
              </Upload>
              {settings.logoSvgMaskUrl && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ 
                    width: 100, 
                    height: 40, 
                    backgroundColor: '#000',
                    maskImage: `url(${settings.logoSvgMaskUrl})`,
                    WebkitMaskImage: `url(${settings.logoSvgMaskUrl})`,
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                  }} />
                  <Button 
                    type="link" 
                    danger 
                    size="small"
                    onClick={() => setSettings({ ...settings, logoSvgMaskUrl: null })}
                  >
                    Удалить
                  </Button>
                </div>
              )}
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 4 }}>
                Приоритет #2. Одноцветный SVG-mask, окрашивается цветом заголовка
              </Text>
            </Form.Item>

            <Form.Item label="Текстовый логотип (fallback)">
              <Input
                value={settings.logoText || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    logoText: e.target.value,
                  })
                }
                placeholder="сёма"
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                Приоритет #3. Используется если нет SVG
              </Text>
            </Form.Item>
          </Card>

          <Card title="Макет" style={{ marginBottom: 16 }}>
            <Text type="secondary" style={{ display: 'block', marginBottom: 12 }}>
              Геометрия: скругления и отступы карточек, сетка, ширина текста в кейсах.
            </Text>

            <Text strong>Скругления</Text>
            <div style={{ marginTop: 8, marginBottom: 24 }}>
              <Text type="secondary" style={{ display: 'block', marginBottom: 12 }}>
                Разные радиусы для внешних карточек, внутреннего контента и медиа.
              </Text>
              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <Form.Item label="Внешнее (карточка)">
                    <InputNumber
                      value={settings.borderRadius?.cardOuter ?? settings.cards.borderRadius}
                      onChange={(v) =>
                        setSettings({
                          ...settings,
                          borderRadius: { 
                            ...settings.borderRadius, 
                            cardOuter: v || 0 
                          },
                        })
                      }
                      style={{ width: '100%' }}
                      addonAfter="px"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Внутреннее (контент)">
                    <InputNumber
                      value={settings.borderRadius?.cardInner ?? 12}
                      onChange={(v) =>
                        setSettings({
                          ...settings,
                          borderRadius: { 
                            ...settings.borderRadius, 
                            cardInner: v || 0 
                          },
                        })
                      }
                      style={{ width: '100%' }}
                      addonAfter="px"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Медиа (фото/видео)">
                    <InputNumber
                      value={settings.borderRadius?.media ?? 8}
                      onChange={(v) =>
                        setSettings({
                          ...settings,
                          borderRadius: { 
                            ...settings.borderRadius, 
                            media: v || 0 
                          },
                        })
                      }
                      style={{ width: '100%' }}
                      addonAfter="px"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <Text strong>Карточки</Text>
            <div style={{ marginTop: 8 }}>
              <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col xs={24} md={12}>
                  <Form.Item label="Фиксированная высота (0 = авто)">
                    <InputNumber
                      value={settings.cards.height}
                      onChange={(v) =>
                        setSettings({
                          ...settings,
                          cards: { ...settings.cards, height: v || 0 },
                        })
                      }
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Внутренний отступ (px)">
                    <InputNumber
                      value={settings.cards.padding}
                      onChange={(v) =>
                        setSettings({
                          ...settings,
                          cards: { ...settings.cards, padding: v || 0 },
                        })
                      }
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <Divider />

            <Text strong>Сетка</Text>
            <div style={{ marginTop: 8 }}>
              <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col xs={24} md={12}>
                  <Form.Item label="Внешний отступ страницы (px)">
                    <InputNumber
                      value={settings.grid.margin}
                      onChange={(v) =>
                        setSettings({
                          ...settings,
                          grid: { ...settings.grid, margin: v || 0 },
                        })
                      }
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Межколонник (px)">
                    <InputNumber
                      value={settings.grid.gutter}
                      onChange={(v) =>
                        setSettings({
                          ...settings,
                          grid: { ...settings.grid, gutter: v || 0 },
                        })
                      }
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Divider />

              <Text strong>Кейсы: текст</Text>
              <Form.Item label="Ширина текста (в колонках)" style={{ marginTop: 8 }}>
                <Radio.Group
                  value={settings.grid.textColumns || 8}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      grid: { ...settings.grid, textColumns: e.target.value },
                    })
                  }
                  buttonStyle="solid"
                >
                  <Radio.Button value={6}>Узко (6)</Radio.Button>
                  <Radio.Button value={8}>Средне (8)</Radio.Button>
                  <Radio.Button value={12}>Широко (12)</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="Выравнивание текста">
                <Radio.Group
                  value={settings.grid.textAlign || 'left'}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      grid: { ...settings.grid, textAlign: e.target.value },
                    })
                  }
                  buttonStyle="solid"
                >
                  <Radio.Button value="left">Слева</Radio.Button>
                  <Radio.Button value="center">По центру</Radio.Button>
                  <Radio.Button value="right">Справа</Radio.Button>
                  <Radio.Button value="justify">По ширине</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="Положение блока текста">
                <Radio.Group
                  value={settings.grid.blockAlign || 'center'}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      grid: { ...settings.grid, blockAlign: e.target.value },
                    })
                  }
                  buttonStyle="solid"
                >
                  <Radio.Button value="left">Слева</Radio.Button>
                  <Radio.Button value="center">По центру</Radio.Button>
                  <Radio.Button value="right">Справа</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </div>

            <Divider />

            <Text strong>Глобальные отступы</Text>
            <Form.Item label="Базовый шаг (px)" style={{ marginTop: 8 }}>
              <InputNumber
                value={settings.spacing.baseGap}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    spacing: { ...settings.spacing, baseGap: v || 0 },
                  })
                }
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Card>

          <Card title="SEO" style={{ marginBottom: 16 }}>
            <Text type="secondary" style={{ display: 'block', marginBottom: 12 }}>
              Заголовок и описание страниц (вкладка браузера / поисковики). Для кейсов можно задать SEO отдельно в редакторе кейса.
            </Text>

            <Form.Item label="Название сайта">
              <Input
                value={settings.seo?.siteName}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: { ...(settings.seo || {}), siteName: e.target.value },
                  })
                }
                placeholder="Etosema"
              />
            </Form.Item>

            <Divider />

            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Text strong>Главная</Text>
                <div style={{ marginTop: 8 }}>
                  <Form.Item label="Заголовок (title)">
                    <Input
                      value={settings.seo?.homeTitle}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          seo: { ...(settings.seo || {}), homeTitle: e.target.value },
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Описание (description)">
                    <Input.TextArea
                      value={settings.seo?.homeDescription}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          seo: { ...(settings.seo || {}), homeDescription: e.target.value },
                        })
                      }
                      autoSize={{ minRows: 2, maxRows: 6 }}
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <Text strong>Обо мне</Text>
                <div style={{ marginTop: 8 }}>
                  <Form.Item label="Заголовок (title)">
                    <Input
                      value={settings.seo?.aboutTitle}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          seo: { ...(settings.seo || {}), aboutTitle: e.target.value },
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Описание (description)">
                    <Input.TextArea
                      value={settings.seo?.aboutDescription}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          seo: { ...(settings.seo || {}), aboutDescription: e.target.value },
                        })
                      }
                      autoSize={{ minRows: 2, maxRows: 6 }}
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>

            <Divider />

            <Text strong>Кейсы</Text>
            <div style={{ marginTop: 8 }}>
              <Form.Item label="Шаблон заголовка (используй {title})">
                <Input
                  value={settings.seo?.caseTitleTemplate}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      seo: { ...(settings.seo || {}), caseTitleTemplate: e.target.value },
                    })
                  }
                  placeholder="{title} — Etosema"
                />
              </Form.Item>
              <Form.Item label="Описание по умолчанию (если у кейса не задано)">
                <Input.TextArea
                  value={settings.seo?.caseDescriptionFallback}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      seo: { ...(settings.seo || {}), caseDescriptionFallback: e.target.value },
                    })
                  }
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
            </div>
          </Card>

          <Card title="Файлы сайта" style={{ marginBottom: 16 }}>
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Text strong>Иконка сайта (favicon)</Text>
                <Text type="secondary" style={{ display: 'block', marginTop: 6 }}>
                  Загрузи одну квадратную картинку — сервер сделает набор иконок.
                </Text>

                <div style={{ marginTop: 12, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Upload
                    accept="image/png,image/jpeg,image/svg+xml"
                    showUploadList={false}
                    customRequest={handleFaviconBaseUpload}
                  >
                    <Button icon={<UploadOutlined />}>Загрузить базовую иконку</Button>
                  </Upload>

                  <Upload
                    accept=".ico,image/x-icon,image/vnd.microsoft.icon"
                    showUploadList={false}
                    customRequest={handleFaviconIcoUpload}
                  >
                    <Button icon={<UploadOutlined />}>Загрузить favicon.ico</Button>
                  </Upload>
                </div>

                <Divider style={{ margin: '16px 0' }} />

                <Text strong>Safari (pinned tab)</Text>
                <div
                  style={{
                    marginTop: 8,
                    display: 'flex',
                    gap: 12,
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  }}
                >
                  <Input
                    value={maskColor}
                    onChange={(e) => setMaskColor(e.target.value)}
                    placeholder="Цвет, например #000000"
                    style={{ width: 220 }}
                  />
                  <Upload
                    accept="image/svg+xml"
                    showUploadList={false}
                    customRequest={handleFaviconMaskUpload}
                  >
                    <Button icon={<UploadOutlined />}>Загрузить mask-icon.svg</Button>
                  </Upload>
                </div>
              </Col>

              <Col xs={24} md={12}>
                <Text strong>Текущий набор</Text>
                <div style={{ marginTop: 12 }}>
                  <FaviconPreviewGrid favicons={settings.favicons} />
                </div>
                {settings.faviconUrl ? (
                  <div style={{ marginTop: 12 }}>
                    <Text type="secondary">Старое поле faviconUrl:</Text>{' '}
                    <a href={String(settings.faviconUrl)} target="_blank" rel="noreferrer">
                      открыть
                    </a>
                  </div>
                ) : null}
              </Col>
            </Row>

            <Divider style={{ margin: '20px 0' }} />

            <Text strong>Шрифты</Text>
            <Text type="secondary" style={{ display: 'block', marginTop: 6 }}>
              Google Fonts — приоритетный способ. Файлы загружай, если шрифта нет в Google Fonts.
            </Text>

            <div style={{ marginTop: 12 }}>
              <div style={{ marginBottom: 16 }}>
                <Text strong>Google Fonts</Text>
                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    marginTop: 8,
                    flexWrap: 'wrap',
                  }}
                >
                  <Input
                    placeholder="Например: https://fonts.google.com/specimen/Roboto+Flex"
                    value={googleFontUrl}
                    onChange={(e) => setGoogleFontUrl(e.target.value)}
                    style={{ flex: '1 1 520px', minWidth: 260 }}
                  />
                  <Button type="primary" onClick={handleAddGoogleFont}>
                    Добавить
                  </Button>
                </div>
                <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
                  Можно вставить ссылку на specimen или прямую CSS-ссылку.
                </Text>
              </div>

              <Upload customRequest={handleFontUpload} showUploadList={false}>
                <Button icon={<UploadOutlined />}>Загрузить шрифт (.ttf, .otf, .woff)</Button>
              </Upload>

              <List
                style={{ marginTop: 16 }}
                dataSource={fonts}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button
                        key="del"
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteFont(item.id)}
                      />,
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                          {(item.format === 'google' ||
                            (item.url || '').includes('fonts.googleapis.com')) && (
                            <GoogleMonoIcon />
                          )}
                          <span>{item.name}</span>
                        </span>
                      }
                      description={`Family: ${item.family} | Format: ${item.format}`}
                    />
                </List.Item>
              )}
            />
          </div>
        </Card>
      </div>
      </div>
    </Layout>
  );
}

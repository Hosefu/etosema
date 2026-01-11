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
  Tabs,
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

const GoogleGIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    style={{ display: 'inline-block', verticalAlign: 'text-bottom' }}
    aria-hidden
  >
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.7 1.22 9.2 3.63l6.85-6.85C35.9 2.44 30.3 0 24 0 14.64 0 6.38 5.38 2.44 13.22l7.98 6.2C12.3 13.1 17.7 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.14 24.55c0-1.64-.15-3.22-.43-4.75H24v9h12.4c-.54 2.9-2.17 5.36-4.63 7.03l7.08 5.5C43.8 36.95 46.14 31.2 46.14 24.55z"
    />
    <path
      fill="#FBBC05"
      d="M10.42 28.22a14.5 14.5 0 0 1 0-8.44l-7.98-6.2A23.94 23.94 0 0 0 0 24c0 3.93.94 7.65 2.44 10.42l7.98-6.2z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.3 0 11.6-2.08 15.47-5.67l-7.08-5.5c-1.97 1.33-4.5 2.12-8.39 2.12-6.3 0-11.7-3.6-13.58-8.93l-7.98 6.2C6.38 42.62 14.64 48 24 48z"
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

  const handleFaviconUpload: UploadProps['customRequest'] = async (
    options
  ) => {
    const { file, onSuccess, onError } = options;
    try {
      const uploadFile = file as File;
      const uploadRes = await adminUploadFile(uploadFile);
      const url = uploadRes.data?.url;

      if (uploadRes.success && url) {
        // Persist сразу, чтобы фавикон реально "работал" после перезагрузки
        const saveRes = await adminUpdateDesign({ faviconUrl: url });
        if (saveRes.success) {
          setSettings((prev) => ({ ...prev, faviconUrl: url }));
          message.success('Фавикон загружен и сохранён');
          onSuccess?.({ url } as unknown as void);
          return;
        }

        // Fallback: хотя бы покажем в UI, но предупредим
        setSettings((prev) => ({ ...prev, faviconUrl: url }));
        message.warning('Фавикон загружен, но не удалось сохранить настройки');
        onSuccess?.({ url } as unknown as void);
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
        {/* EDITOR */}
        <div style={{ maxWidth: 600 }}>
          <Card
            title="Настройки Дизайна"
            extra={
              <Button
                type="primary"
                icon={<SaveOutlined />}
                loading={saving}
                onClick={handleSave}
              >
                Сохранить
              </Button>
            }
          >
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: '1',
                  label: 'Типографика',
                  children: (
                    <>
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
                        label="Небольшой заголовок"
                        value={settings.typography.headingSmall}
                        onChange={(v) =>
                          setSettings({
                            ...settings,
                            typography: {
                              ...settings.typography,
                              headingSmall: v,
                            },
                          })
                        }
                        fonts={fonts}
                      />
                      <TypographyEditor
                        label="Большой заголовок"
                        value={settings.typography.headingLarge}
                        onChange={(v) =>
                          setSettings({
                            ...settings,
                            typography: {
                              ...settings.typography,
                              headingLarge: v,
                            },
                          })
                        }
                        fonts={fonts}
                      />
                    </>
                  ),
                },
                {
                  key: '2',
                  label: 'Цвета',
                  children: (
                    <div style={{ padding: 16 }}>
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
                  ),
                },
                {
                  key: '3',
                  label: 'Карточки',
                  children: (
                    <div style={{ padding: 16 }}>
                      <Row gutter={16} style={{ marginBottom: 16 }}>
                        <Col span={12}>
                          <Form.Item label="Скругление (px)">
                            <InputNumber
                              value={settings.cards.borderRadius}
                              onChange={(v) =>
                                setSettings({
                                  ...settings,
                                  cards: {
                                    ...settings.cards,
                                    borderRadius: v || 0,
                                  },
                                })
                              }
                              style={{ width: '100%' }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Фикс. высота (0 = авто)">
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
                      </Row>
                      <Row gutter={16}>
                        <Col span={24}>
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
                  ),
                },
                {
                  key: '4',
                  label: 'Layout',
                  children: (
                    <div style={{ padding: 16 }}>
                      <Text strong>Сетка (12 колонок)</Text>
                      <Row
                        gutter={16}
                        style={{ marginTop: 8, marginBottom: 24 }}
                      >
                        <Col span={12}>
                          <Form.Item label="Внешний отступ (Margin)">
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
                        <Col span={12}>
                          <Form.Item label="Межколонник (Gutter)">
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

                      <Text strong>Кейсы (Текст)</Text>
                      <Form.Item
                        label="Ширина текста (колонок)"
                        style={{ marginTop: 8, marginBottom: 24 }}
                      >
                        <Radio.Group
                          value={settings.grid.textColumns || 8}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              grid: {
                                ...settings.grid,
                                textColumns: e.target.value,
                              },
                            })
                          }
                          buttonStyle="solid"
                        >
                          <Radio.Button value={6}>Narrow (6)</Radio.Button>
                          <Radio.Button value={8}>Medium (8)</Radio.Button>
                          <Radio.Button value={12}>Wide (12)</Radio.Button>
                        </Radio.Group>
                      </Form.Item>

                      <Form.Item label="Флаг текста (Text Align)">
                        <Radio.Group
                          value={settings.grid.textAlign || 'left'}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              grid: {
                                ...settings.grid,
                                textAlign: e.target.value,
                              },
                            })
                          }
                          buttonStyle="solid"
                        >
                          <Radio.Button value="left">Left</Radio.Button>
                          <Radio.Button value="center">Center</Radio.Button>
                          <Radio.Button value="right">Right</Radio.Button>
                          <Radio.Button value="justify">Justify</Radio.Button>
                        </Radio.Group>
                      </Form.Item>

                      <Form.Item label="Положение блока (Block Position)">
                        <Radio.Group
                          value={settings.grid.blockAlign || 'center'}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              grid: {
                                ...settings.grid,
                                blockAlign: e.target.value,
                              },
                            })
                          }
                          buttonStyle="solid"
                        >
                          <Radio.Button value="left">Left</Radio.Button>
                          <Radio.Button value="center">Center</Radio.Button>
                          <Radio.Button value="right">Right</Radio.Button>
                        </Radio.Group>
                      </Form.Item>

                      <Divider />

                      <Text strong>Глобальные отступы</Text>
                      <Form.Item
                        label="Базовый отступ (Gap, px)"
                        style={{ marginTop: 8 }}
                      >
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
                    </div>
                  ),
                },
                {
                  key: '5',
                  label: 'Ссылки',
                  children: (
                    <div style={{ padding: 16 }}>
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
                                  links: {
                                    ...settings.links,
                                    thickness: v || 1,
                                  },
                                })
                              }
                              min={1}
                              style={{ width: '100%' }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item label="Цвет подчеркивания">
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
                  ),
                },
                {
                  key: '6',
                  label: 'Фавикон',
                  children: (
                    <div style={{ padding: 16 }}>
                      <Form.Item label="Фавикон">
                        <Upload
                          accept="image/*,.ico"
                          showUploadList={false}
                          customRequest={handleFaviconUpload}
                        >
                          <Button icon={<UploadOutlined />}>
                            {settings.faviconUrl
                              ? 'Изменить фавикон'
                              : 'Загрузить фавикон'}
                          </Button>
                        </Upload>
                        {settings.faviconUrl && (
                          <div style={{ marginTop: 16 }}>
                            <img
                              src={settings.faviconUrl}
                              alt="Favicon preview"
                              style={{
                                width: 32,
                                height: 32,
                                objectFit: 'contain',
                                border: '1px solid #d9d9d9',
                                borderRadius: 4,
                              }}
                            />
                            <Button
                              danger
                              type="text"
                              size="small"
                              onClick={() => setSettings({ ...settings, faviconUrl: null })}
                              style={{ marginLeft: 8 }}
                            >
                              Удалить
                            </Button>
                          </div>
                        )}
                      </Form.Item>
                    </div>
                  ),
                },
                {
                  key: '7',
                  label: 'Шрифты',
                  children: (
                    <div style={{ padding: 16 }}>
                      <div style={{ marginBottom: 16 }}>
                        <Text strong>Google Fonts (приоритетный способ)</Text>
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
                        <Divider style={{ margin: '16px 0' }} />
                      </div>

                      <Upload
                        customRequest={handleFontUpload}
                        showUploadList={false}
                      >
                        <Button icon={<UploadOutlined />}>
                          Загрузить шрифт (.ttf, .otf, .woff)
                        </Button>
                      </Upload>
                      <List
                        style={{ marginTop: 16 }}
                        dataSource={fonts}
                        renderItem={(item) => (
                          // format === 'google' (or url includes fonts.googleapis.com) => show Google icon
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
                                    <GoogleGIcon />
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
                  ),
                },
              ]}
            />
          </Card>
        </div>
      </div>
    </Layout>
  );
}

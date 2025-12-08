'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Layout,
  Card,
  Form,
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
  Slider,
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
  adminUploadFont,
  adminDeleteFont,
  DesignSettings,
  Font,
  TypographyConfig,
} from '@/lib/adminClient';

const { Text } = Typography;

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
  const handleChange = (key: keyof TypographyConfig, val: any) => {
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
              onChange={(c, hex) => handleChange('color', hex)}
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
  const [loading, setLoading] = useState(true);
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

  const handleFontUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    try {
      const res = await adminUploadFont(file, {
        family: file.name.split('.')[0],
      });
      if (res.success) {
        message.success('Шрифт загружен');
        loadData(); // Reload to get updated list
        onSuccess(res.data);
      } else {
        onError(new Error('Upload failed'));
      }
    } catch (e) {
      onError(e);
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

  // --- Preview Logic ---
  const previewStyle = useMemo(() => {
    const s = settings;
    return {
      '--body-size': s.typography.body.size,
      '--body-line-height': s.typography.body.lineHeight / 100,
      '--body-letter-spacing': `${s.typography.body.letterSpacing / 100}em`,
      '--body-color': s.typography.body.color,
      '--font-family-body': `'${s.typography.body.family}'`,

      '--heading-small-size': s.typography.headingSmall.size,
      '--heading-small-line-height': s.typography.headingSmall.lineHeight / 100,
      '--heading-small-letter-spacing': `${s.typography.headingSmall.letterSpacing / 100}em`,
      '--heading-small-color': s.typography.headingSmall.color,
      '--font-family-heading-small': `'${s.typography.headingSmall.family}'`,

      '--heading-large-size': s.typography.headingLarge.size,
      '--heading-large-line-height': s.typography.headingLarge.lineHeight / 100,
      '--heading-large-letter-spacing': `${s.typography.headingLarge.letterSpacing / 100}em`,
      '--heading-large-color': s.typography.headingLarge.color,
      '--font-family-heading-large': `'${s.typography.headingLarge.family}'`,

      '--color-bg-page': s.colors.background,
      '--color-bg-card': s.colors.card,

      '--link-offset': `${s.links.offset}px`,
      '--link-thickness': `${s.links.thickness || 1}px`,
      '--link-color': s.links.color,

      '--card-radius': `${s.cards.borderRadius}px`,
      '--card-padding': `${s.cards.padding}px`,
      '--card-height': s.cards.height ? `${s.cards.height}px` : 'auto',

      '--grid-margin': `${s.grid.margin}px`,
      '--grid-gutter': `${s.grid.gutter}px`,
      '--case-text-columns': s.grid.textColumns || 8,
      '--case-text-align': s.grid.textAlign || 'left',
      '--case-block-align': s.grid.blockAlign || 'center',

      '--base-gap': `${s.spacing.baseGap}px`,

      // Scale emulation for preview (fixed scale 1)
      '--scale': 1,
    } as React.CSSProperties;
  }, [settings]);

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

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        {/* LEFT COLUMN: EDITOR */}
        <div style={{ flex: 1, maxWidth: 600 }}>
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
                          onChange={(c, hex) =>
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
                          onChange={(c, hex) =>
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
                          onChange={(c, hex) =>
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
                          customRequest={async (options: any) => {
                            const { file, onSuccess, onError } = options;
                            try {
                              const formData = new FormData();
                              formData.append('file', file);
                              const res = await fetch('/api/admin/upload', {
                                method: 'POST',
                                body: formData,
                                credentials: 'include',
                              });
                              const data = await res.json();
                              if (data.data?.url) {
                                setSettings({
                                  ...settings,
                                  faviconUrl: data.data.url,
                                });
                                message.success('Фавикон загружен');
                                onSuccess(data.data);
                              } else {
                                onError(new Error('Upload failed'));
                              }
                            } catch (e) {
                              onError(e);
                            }
                          }}
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
                              onClick={() =>
                                setSettings({ ...settings, faviconUrl: null })
                              }
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
                              title={item.name}
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

        {/* RIGHT COLUMN: PREVIEW */}
        <div style={{ flex: 1, position: 'sticky', top: 24 }}>
          <Card
            title="Live Preview"
            bodyStyle={{ padding: 0, overflow: 'hidden' }}
          >
            <div
              style={{
                ...previewStyle,
                backgroundColor: 'var(--color-bg-page)',
                padding: 'var(--grid-margin)',
                minHeight: 600,
                fontFamily: 'var(--font-family-body)',
                color: 'var(--body-color)',
              }}
            >
              {/* Large Heading Preview */}
              <div style={{ marginBottom: 'calc(var(--base-gap) * 5)' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-family-heading-large)',
                    fontSize: 'calc(var(--scale) * var(--heading-large-size))',
                    lineHeight: 'var(--heading-large-line-height)',
                    letterSpacing: 'var(--heading-large-letter-spacing)',
                    color: 'var(--heading-large-color)',
                    fontWeight: 500,
                  }}
                >
                  Я коммуникационный дизайнер
                </div>
              </div>

              {/* Grid Preview with Cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'var(--grid-gutter)',
                  marginBottom: 'calc(var(--base-gap) * 5)',
                }}
              >
                {/* Card 1 */}
                <div
                  style={{
                    background: 'var(--color-bg-card)',
                    borderRadius: 'var(--card-radius)',
                    padding: 'var(--card-padding)',
                    height: 'var(--card-height)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--base-gap)',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: 200,
                      flex: '1 0 auto',
                      background: '#ddd',
                      borderRadius:
                        'max(0px, calc(var(--card-radius) - var(--card-padding)))',
                    }}
                  ></div>
                  <div
                    style={{
                      fontFamily: 'var(--font-family-body)',
                      fontSize: 'calc(var(--scale) * var(--body-size))',
                      lineHeight: 'var(--body-line-height)',
                      letterSpacing: 'var(--body-letter-spacing)',
                      color: 'var(--body-color)',
                      fontWeight: 500,
                      marginTop: 'auto',
                    }}
                  >
                    Нейрофестиваль
                  </div>
                </div>

                {/* Card 2 */}
                <div
                  style={{
                    background: 'var(--color-bg-card)',
                    borderRadius: 'var(--card-radius)',
                    padding: 'var(--card-padding)',
                    height: 'var(--card-height)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--base-gap)',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: 200,
                      flex: '1 0 auto',
                      background: '#ddd',
                      borderRadius:
                        'max(0px, calc(var(--card-radius) - var(--card-padding)))',
                    }}
                  ></div>
                  <div
                    style={{
                      fontFamily: 'var(--font-family-body)',
                      fontSize: 'calc(var(--scale) * var(--body-size))',
                      lineHeight: 'var(--body-line-height)',
                      letterSpacing: 'var(--body-letter-spacing)',
                      color: 'var(--body-color)',
                      fontWeight: 500,
                      marginTop: 'auto',
                    }}
                  >
                    Аида
                  </div>
                </div>
              </div>

              {/* Small Heading / Links Preview */}
              <div style={{ marginBottom: 'calc(var(--base-gap) * 3)' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-family-heading-small)',
                    fontSize: 'calc(var(--scale) * var(--heading-small-size))',
                    lineHeight: 'var(--heading-small-line-height)',
                    letterSpacing: 'var(--heading-small-letter-spacing)',
                    color: 'var(--heading-small-color)',
                    fontWeight: 500,
                    marginBottom: 'var(--base-gap)',
                  }}
                >
                  Контакты
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'calc(var(--base-gap) * 0.5)',
                  }}
                >
                  <a
                    href="#"
                    style={{
                      fontFamily: 'var(--font-family-body)',
                      fontSize: 'calc(var(--scale) * var(--body-size))',
                      textDecoration: 'underline',
                      textDecorationColor: 'var(--link-color)',
                      textUnderlineOffset: 'var(--link-offset)',
                      textDecorationThickness: 'var(--link-thickness)',
                      color: 'inherit',
                      width: 'fit-content',
                    }}
                  >
                    Telegram
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

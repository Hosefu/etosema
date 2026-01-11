/**
 * Admin Case Edit Page
 */

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Form,
  Input,
  InputNumber,
  Switch,
  Button,
  Card,
  Space,
  Upload,
  message,
  Select,
  Popconfirm,
  ColorPicker,
  Radio,
  Tabs,
  Row,
  Col,
} from 'antd';
import {
  SaveOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
  UpOutlined,
  DownOutlined,
  DeleteOutlined,
  FileImageOutlined,
  FontSizeOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import {
  adminGetCase,
  adminUpdateCase,
  adminUploadFile,
  adminCreateBlock,
  adminUpdateBlock,
  adminDeleteBlock,
  adminCreateMedia,
  adminUpdateMedia,
  adminDeleteMedia,
  adminGetDesign,
  Block,
  Font,
} from '@/lib/adminClient';

const { TextArea } = Input;

export default function AdminCaseEditPage() {
  const params = useParams();
  const router = useRouter();
  const caseId = params.id as string;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  // const [caseData, setCaseData] = useState<Case | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [uploadingBlockId, setUploadingBlockId] = useState<string | null>(null);
  const [availableFonts, setAvailableFonts] = useState<Font[]>([]);

  useEffect(() => {
    loadCase();
    loadFonts();
  }, [caseId]);

  const loadFonts = async () => {
    try {
      const res = await adminGetDesign();
      if (res.success && res.data) {
        setAvailableFonts(res.data.fonts);
      }
    } catch (e) {
      console.error('Failed to load fonts');
    }
  };

  const loadCase = async () => {
    setLoading(true);
    try {
      const response = await adminGetCase(caseId);
      if (response.success && response.data) {
        // setCaseData(response.data);
        setBlocks(response.data.blocks);

        const settings = response.data.settings
          ? JSON.parse(response.data.settings)
          : {};

        form.setFieldsValue({
          title: response.data.title,
          shortTitle: response.data.shortTitle,
          slug: response.data.slug,
          year: response.data.year,
          summary: response.data.summary,
          isNda: response.data.isNda,
          seoTitle: (response.data as any).seoTitle,
          seoDescription: (response.data as any).seoDescription,
          backgroundColor: response.data.backgroundColor,
          textColor: response.data.textColor,
          fontFamily: response.data.fontFamily,
          useCustomDesign: response.data.useCustomDesign,
          titleAlignment: settings.titleAlignment || 'left',
          headingColor: settings.headingColor,
          headingFontFamily: settings.headingFontFamily,
          // New layout settings
          textColumns: settings.textColumns,
          textAlign: settings.textAlign,
          blockAlign: settings.blockAlign,
        });
      }
    } catch (error) {
      message.error('Ошибка загрузки кейса');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      // Extract special settings fields
      const {
        titleAlignment,
        headingColor,
        headingFontFamily,
        textColumns,
        textAlign,
        blockAlign,
        useCustomDesign,
        ...mainValues
      } = values;

      const settings = JSON.stringify({
        titleAlignment,
        headingColor:
          typeof headingColor === 'string'
            ? headingColor
            : headingColor?.toHexString?.(),
        headingFontFamily,
        textColumns,
        textAlign,
        blockAlign,
      });

      // Ensure colors are strings
      if (
        mainValues.backgroundColor &&
        typeof mainValues.backgroundColor !== 'string'
      ) {
        mainValues.backgroundColor = mainValues.backgroundColor.toHexString();
      }
      if (mainValues.textColor && typeof mainValues.textColor !== 'string') {
        mainValues.textColor = mainValues.textColor.toHexString();
      }

      const response = await adminUpdateCase(caseId, {
        ...mainValues,
        useCustomDesign,
        settings,
      });

      if (response.success) {
        message.success('Кейс сохранен');
      }
    } catch (error) {
      message.error('Ошибка сохранения');
    }
  };

  const useCustomDesign = Form.useWatch('useCustomDesign', form);

  const handleResetDesign = () => {
    form.setFieldsValue({
      backgroundColor: undefined,
      textColor: undefined,
      fontFamily: undefined,
      titleAlignment: 'left',
      headingColor: undefined,
      headingFontFamily: undefined,
      textColumns: 8,
      textAlign: undefined,
      blockAlign: undefined,
      useCustomDesign: false,
    });
    message.info('Настройки сброшены');
  };

  const handleAddBlock = async (type: 'MEDIA' | 'TEXT') => {
    try {
      const response = await adminCreateBlock({
        caseId,
        type,
        layout: type === 'MEDIA' ? 'FULL' : 'FULL', // Default layout
        orderRank: `${blocks.length + 1}`,
        settings: type === 'TEXT' ? JSON.stringify({}) : undefined,
      });
      if (response.success && response.data) {
        setBlocks([...blocks, response.data]);
        message.success('Блок добавлен');
      }
    } catch (error) {
      message.error('Ошибка добавления блока');
    }
  };

  const handleMoveBlock = async (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newBlocks.length) return;

    [newBlocks[index], newBlocks[targetIndex]] = [
      newBlocks[targetIndex],
      newBlocks[index],
    ];

    try {
      await Promise.all([
        adminUpdateBlock(newBlocks[index].id, { orderRank: `${index + 1}` }),
        adminUpdateBlock(newBlocks[targetIndex].id, {
          orderRank: `${targetIndex + 1}`,
        }),
      ]);
      setBlocks(newBlocks);
      message.success('Блок перемещен');
    } catch (error) {
      message.error('Ошибка перемещения блока');
    }
  };

  const handleDeleteBlock = async (blockId: string) => {
    try {
      await adminDeleteBlock(blockId);
      setBlocks(blocks.filter((b) => b.id !== blockId));
      message.success('Блок удален');
    } catch (error) {
      message.error('Ошибка удаления блока');
    }
  };

  const handleUpdateBlockContent = async (blockId: string, content: string) => {
    // Note: For production, debounce this or save on blur
    try {
      await adminUpdateBlock(blockId, { content });
      setBlocks(blocks.map((b) => (b.id === blockId ? { ...b, content } : b)));
    } catch (e) {
      // Silent fail or toast
    }
  };

  // ... Media helpers ...
  const getMediaUrl = (url: string) => {
    if (url.startsWith('http') || url.startsWith('https')) return url;
    return `http://localhost:3001${url}`;
  };

  const handleUpdateMediaAspectRatio = async (
    mediaId: string,
    aspectRatio: string
  ) => {
    try {
      await adminUpdateMedia(mediaId, { aspectRatio });
      const newBlocks = blocks.map((block) => ({
        ...block,
        medias: block.medias.map((media) =>
          media.id === mediaId ? { ...media, aspectRatio } : media
        ),
      }));
      setBlocks(newBlocks);
      message.success('Пропорции обновлены');
    } catch (error) {
      message.error('Ошибка обновления пропорций');
      loadCase();
    }
  };

  const handleUploadMedia = async (
    file: File,
    blockId: string,
    position: number
  ) => {
    setUploadingBlockId(`${blockId}-${position}`);
    try {
      const uploadResponse = await adminUploadFile(file);
      if (uploadResponse.data) {
        const mediaResponse = await adminCreateMedia({
          blockId,
          url: uploadResponse.data.url,
          type: file.type.startsWith('video') ? 'VIDEO' : 'IMAGE',
          position,
          alt: file.name,
          aspectRatio: '16:9',
        });

        if (mediaResponse.success) {
          await loadCase();
          message.success('Файл загружен');
        }
      }
    } catch (error) {
      message.error('Ошибка загрузки файла');
    } finally {
      setUploadingBlockId(null);
    }
  };

  const handleDeleteMedia = async (mediaId: string) => {
    try {
      await adminDeleteMedia(mediaId);
      loadCase();
      message.success('Медиа удалено');
    } catch (error) {
      message.error('Ошибка удаления медиа');
    }
  };

  // Renderers
  const renderMediaSlot = (block: Block, slotIndex: number) => {
    const media = block.medias.find((m) => m.position === slotIndex);
    const isUploading = uploadingBlockId === `${block.id}-${slotIndex}`;

    if (media) {
      return (
        <div
          style={{
            position: 'relative',
            height: '100%',
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div
            style={{
              position: 'relative',
              flex: 1,
              overflow: 'hidden',
              borderRadius: 4,
              background: '#f0f0f0',
            }}
          >
            {media.type === 'VIDEO' ? (
              <video
                src={getMediaUrl(media.url)}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                controls
              />
            ) : (
              <img
                src={getMediaUrl(media.url)}
                alt={media.alt || ''}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
            <Popconfirm
              title="Удалить?"
              onConfirm={() => handleDeleteMedia(media.id)}
              okText="Да"
              cancelText="Нет"
            >
              <Button
                danger
                size="small"
                icon={<DeleteOutlined />}
                style={{ position: 'absolute', top: 8, right: 8 }}
              />
            </Popconfirm>
          </div>
          <Select
            size="small"
            value={media.aspectRatio}
            onChange={(val) => handleUpdateMediaAspectRatio(media.id, val)}
            style={{ width: '100%' }}
          >
            <Select.Option value="16:9">16:9</Select.Option>
            <Select.Option value="4:3">4:3</Select.Option>
            <Select.Option value="1:1">1:1</Select.Option>
            <Select.Option value="9:16">9:16</Select.Option>
          </Select>
        </div>
      );
    }

    return (
      <Upload
        beforeUpload={(file) => {
          handleUploadMedia(file, block.id, slotIndex);
          return false;
        }}
        showUploadList={false}
        accept="image/*,video/*"
        disabled={!!uploadingBlockId}
      >
        <div
          style={{
            height: 200,
            border: '2px dashed #d9d9d9',
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: uploadingBlockId ? 'not-allowed' : 'pointer',
            backgroundColor: isUploading ? '#f5f5f5' : '#fafafa',
            transition: 'all 0.3s',
          }}
        >
          {isUploading ? (
            <div style={{ color: '#999' }}>Загрузка...</div>
          ) : (
            <>
              <FileImageOutlined style={{ fontSize: 32, color: '#999' }} />
              <div style={{ marginTop: 8, color: '#999' }}>Загрузить</div>
            </>
          )}
        </div>
      </Upload>
    );
  };

  const renderTextBlock = (block: Block) => {
    return (
      <div style={{ padding: 16 }}>
        <TextArea
          rows={6}
          value={block.content || ''}
          onChange={(e) => {
            // Update local state first for responsiveness
            const newContent = e.target.value;
            setBlocks(
              blocks.map((b) =>
                b.id === block.id ? { ...b, content: newContent } : b
              )
            );
          }}
          onBlur={(e) => handleUpdateBlockContent(block.id, e.target.value)}
          placeholder="Markdown text..."
        />
      </div>
    );
  };

  const fontOptions = [
    { label: 'По умолчанию', value: '' },
    { label: 'Inter', value: 'Inter' },
    ...availableFonts.map((f) => ({ label: f.name, value: f.family })),
  ];

  return (
    <Form form={form} layout="vertical">
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push('/admin/cases')}
          >
            Назад
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
            loading={loading}
          >
            Сохранить
          </Button>
        </Space>
      </div>

      <Tabs
        defaultActiveKey="content"
        items={[
          {
            key: 'content',
            label: 'Контент',
            children: (
              <>
                <Card title="Основная информация" style={{ marginBottom: 24 }}>
                  <Row gutter={16}>
                    <Col span={16}>
                      <Form.Item
                        label="Название"
                        name="title"
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Год"
                        name="year"
                        rules={[{ required: true }]}
                      >
                        <InputNumber style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label="Короткое название" name="shortTitle">
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Slug"
                    name="slug"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item label="Описание" name="summary">
                    <TextArea rows={3} />
                  </Form.Item>
                  <Form.Item label="NDA" name="isNda" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                </Card>

                <div
                  style={{
                    marginBottom: 16,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <h2 style={{ margin: 0 }}>Блоки</h2>
                  <Space>
                    <Button
                      type="dashed"
                      icon={<FontSizeOutlined />}
                      onClick={() => handleAddBlock('TEXT')}
                    >
                      Текст
                    </Button>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => handleAddBlock('MEDIA')}
                    >
                      Медиа
                    </Button>
                  </Space>
                </div>

                {blocks.map((block, index) => (
                  <Card
                    key={block.id}
                    title={`Блок ${index + 1} (${block.type === 'TEXT' ? 'Текст' : 'Медиа'})`}
                    style={{ marginBottom: 16 }}
                    extra={
                      <Space>
                        {block.type !== 'TEXT' && (
                          <Select
                            value={block.layout}
                            onChange={async (value) => {
                              await adminUpdateBlock(block.id, {
                                layout: value,
                              });
                              loadCase();
                            }}
                            style={{ width: 140 }}
                            size="small"
                          >
                            <Select.Option value="FULL">
                              Полный (1)
                            </Select.Option>
                            <Select.Option value="HALF">
                              Половинный (2)
                            </Select.Option>
                          </Select>
                        )}
                        <Button
                          size="small"
                          icon={<UpOutlined />}
                          disabled={index === 0}
                          onClick={() => handleMoveBlock(index, 'up')}
                        />
                        <Button
                          size="small"
                          icon={<DownOutlined />}
                          disabled={index === blocks.length - 1}
                          onClick={() => handleMoveBlock(index, 'down')}
                        />
                        <Popconfirm
                          title="Удалить блок?"
                          onConfirm={() => handleDeleteBlock(block.id)}
                          okText="Да"
                          cancelText="Нет"
                        >
                          <Button
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                          />
                        </Popconfirm>
                      </Space>
                    }
                  >
                    {block.type === 'TEXT' ? (
                      renderTextBlock(block)
                    ) : block.layout === 'FULL' ? (
                      <div style={{ width: '100%' }}>
                        {renderMediaSlot(block, 0)}
                      </div>
                    ) : (
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: 16,
                        }}
                      >
                        {renderMediaSlot(block, 0)}
                        {renderMediaSlot(block, 1)}
                      </div>
                    )}
                  </Card>
                ))}
              </>
            ),
          },
          {
            key: 'seo',
            label: 'SEO',
            children: (
              <Card title="SEO" style={{ marginBottom: 24 }}>
                <Form.Item
                  label="SEO Title (если пусто — возьмём название кейса)"
                  name="seoTitle"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="SEO Description (если пусто — возьмём summary)"
                  name="seoDescription"
                >
                  <TextArea rows={4} />
                </Form.Item>
              </Card>
            ),
          },
          {
            key: 'appearance',
            label: 'Внешний вид',
            children: (
              <Card
                title="Настройки страницы кейса"
                extra={
                  <Space>
                    <Form.Item
                      name="useCustomDesign"
                      valuePropName="checked"
                      noStyle
                    >
                      <Switch
                        checkedChildren="Custom On"
                        unCheckedChildren="Custom Off"
                      />
                    </Form.Item>
                    <Button
                      icon={<ReloadOutlined />}
                      onClick={handleResetDesign}
                    >
                      Сбросить
                    </Button>
                  </Space>
                }
              >
                <Row gutter={24}>
                  <Col span={8}>
                    <h4 style={{ marginBottom: 16 }}>Глобальные цвета</h4>
                    <Form.Item
                      label="Цвет фона страницы"
                      name="backgroundColor"
                    >
                      <ColorPicker showText disabled={!useCustomDesign} />
                    </Form.Item>
                    <Form.Item label="Цвет текста (основной)" name="textColor">
                      <ColorPicker showText disabled={!useCustomDesign} />
                    </Form.Item>
                    <Form.Item label="Шрифт (основной)" name="fontFamily">
                      <Select
                        options={fontOptions}
                        showSearch
                        disabled={!useCustomDesign}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <h4 style={{ marginBottom: 16 }}>Заголовок кейса</h4>
                    <Form.Item
                      label="Выравнивание заголовка"
                      name="titleAlignment"
                    >
                      <Radio.Group disabled={!useCustomDesign}>
                        <Radio.Button value="left">Left</Radio.Button>
                        <Radio.Button value="center">Center</Radio.Button>
                        <Radio.Button value="right">Right</Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Цвет заголовка" name="headingColor">
                      <ColorPicker showText disabled={!useCustomDesign} />
                    </Form.Item>
                    <Form.Item label="Шрифт заголовка" name="headingFontFamily">
                      <Select
                        options={fontOptions}
                        showSearch
                        disabled={!useCustomDesign}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <h4 style={{ marginBottom: 16 }}>Layout (Текст)</h4>
                    <Form.Item label="Ширина текста" name="textColumns">
                      <Radio.Group
                        buttonStyle="solid"
                        disabled={!useCustomDesign}
                      >
                        <Radio.Button value={6}>Narrow</Radio.Button>
                        <Radio.Button value={8}>Medium</Radio.Button>
                        <Radio.Button value={12}>Wide</Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Флаг текста (Align)" name="textAlign">
                      <Radio.Group
                        buttonStyle="solid"
                        disabled={!useCustomDesign}
                      >
                        <Radio.Button value="left">L</Radio.Button>
                        <Radio.Button value="center">C</Radio.Button>
                        <Radio.Button value="right">R</Radio.Button>
                        <Radio.Button value="justify">J</Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Положение блока" name="blockAlign">
                      <Radio.Group
                        buttonStyle="solid"
                        disabled={!useCustomDesign}
                      >
                        <Radio.Button value="left">Left</Radio.Button>
                        <Radio.Button value="center">Center</Radio.Button>
                        <Radio.Button value="right">Right</Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ),
          },
        ]}
      />
    </Form>
  );
}

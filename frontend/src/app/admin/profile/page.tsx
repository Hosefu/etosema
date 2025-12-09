'use client';

import { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  message,
  Card,
  Upload,
  Divider,
  Row,
  Col,
} from 'antd';
import {
  SaveOutlined,
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { DividerProps } from 'antd';
import {
  adminGetProfile,
  adminUpdateProfile,
  adminUploadFile,
  LinkBlock,
  LinkItem,
} from '@/lib/adminClient';

// Component for editing a block of links
const LinksBlockEditor = ({
  value = { title: '', items: [] },
  onChange,
}: {
  value?: LinkBlock;
  onChange?: (val: LinkBlock) => void;
}) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({ ...value, title: e.target.value });
  };

  const handleItemChange = (
    index: number,
    field: keyof LinkItem,
    text: string
  ) => {
    const newItems = [...value.items];
    newItems[index] = { ...newItems[index], [field]: text };
    onChange?.({ ...value, items: newItems });
  };

  const handleAddItem = () => {
    onChange?.({ ...value, items: [...value.items, { label: '', url: '' }] });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = value.items.filter((_, i) => i !== index);
    onChange?.({ ...value, items: newItems });
  };

  return (
    <div
      style={{
        background: '#fafafa',
        padding: 16,
        borderRadius: 8,
        border: '1px solid #f0f0f0',
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>
          Заголовок блока
        </div>
        <Input
          value={value.title}
          onChange={handleTitleChange}
          placeholder="Например: Контакты"
          style={{ fontWeight: 500 }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {value.items.map((item, index) => (
          <div key={index} style={{ display: 'flex', gap: 8 }}>
            <Input
              placeholder="Название"
              value={item.label}
              onChange={(e) => handleItemChange(index, 'label', e.target.value)}
              style={{ flex: 1 }}
            />
            <Input
              placeholder="Ссылка (URL)"
              value={item.url}
              onChange={(e) => handleItemChange(index, 'url', e.target.value)}
              style={{ flex: 2 }}
            />
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleRemoveItem(index)}
            />
          </div>
        ))}

        <Button
          type="dashed"
          onClick={handleAddItem}
          icon={<PlusOutlined />}
          block
        >
          Добавить ссылку
        </Button>
      </div>
    </div>
  );
};

export default function AdminProfilePage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const response = await adminGetProfile();
      if (response.success && response.data) {
        const data = response.data;
        // Parse JSON fields to objects for the form
        form.setFieldsValue({
          ...data,
          contacts: parseJsonSafely(data.contactsJson, {
            title: 'Контакты',
            items: [],
          }),
          projects: parseJsonSafely(data.projectsJson, {
            title: 'Проекты',
            items: [],
          }),
          socials: parseJsonSafely(data.socialsJson, {
            title: 'Соцсети',
            items: [],
          }),
        });
      }
    } catch (error) {
      message.error('Ошибка загрузки профиля');
    } finally {
      setLoading(false);
    }
  };

  const parseJsonSafely = (json: string, fallback: LinkBlock): LinkBlock => {
    try {
      const parsed = JSON.parse(json);
      // Check if it has the new structure
      if (parsed && typeof parsed === 'object' && 'items' in parsed) {
        return parsed;
      }
      // If it's the old array structure (for projects/socials)
      if (Array.isArray(parsed)) {
        return { ...fallback, items: parsed };
      }
      // If it's the old object structure (for contacts)
      if (
        parsed &&
        typeof parsed === 'object' &&
        ('telegram' in parsed || 'email' in parsed)
      ) {
        const items = [];
        if (parsed.telegram)
          items.push({
            label: parsed.telegram,
            url: `https://t.me/${parsed.telegram.replace('@', '')}`,
          });
        if (parsed.email)
          items.push({ label: parsed.email, url: `mailto:${parsed.email}` });
        return { ...fallback, items };
      }
      return fallback;
    } catch (e) {
      return fallback;
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      // Stringify objects back to JSON for API
      const payload = {
        ...values,
        contactsJson: JSON.stringify(values.contacts),
        projectsJson: JSON.stringify(values.projects),
        socialsJson: JSON.stringify(values.socials),
      };

      // Remove temporary object fields
      delete payload.contacts;
      delete payload.projects;
      delete payload.socials;

      const response = await adminUpdateProfile(payload);
      if (response.success) {
        message.success('Профиль сохранен');
      }
    } catch (error) {
      message.error('Ошибка сохранения');
    }
  };

  const handleUploadLogo = async (file: File) => {
    try {
      const response = await adminUploadFile(file);
      if (response.success && response.data) {
        form.setFieldsValue({ logoUrl: response.data.url });
        message.success('Логотип загружен');
      }
    } catch (error) {
      message.error('Ошибка загрузки файла');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={handleSave}
          loading={loading}
        >
          Сохранить изменения
        </Button>
      </div>

      <Row gutter={24}>
        <Col span={16}>
          <Form form={form} layout="vertical">
            <Card
              title="Основная информация"
              loading={loading}
              style={{ marginBottom: 24 }}
            >
              <Form.Item
                label="Заголовок (на странице Обо мне)"
                name="title"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Описание" name="description">
                <Input.TextArea rows={6} />
              </Form.Item>

              <Form.Item
                label="Сообщение для закрытых кейсов (Markdown)"
                name="lockedCaseMessage"
                help="Например: Напишите мне в [Телеграм](...)"
              >
                <Input.TextArea rows={3} />
              </Form.Item>

              <Divider orientation={'left' as DividerProps['orientation']}>
                Логотип
              </Divider>
              <Form.Item label="URL Логотипа (S3)" name="logoUrl">
                <Input
                  addonAfter={
                    <Upload
                      beforeUpload={(file) => {
                        handleUploadLogo(file);
                        return false;
                      }}
                      showUploadList={false}
                      accept="image/svg+xml,image/png,image/jpeg"
                    >
                      <UploadOutlined style={{ cursor: 'pointer' }} />
                    </Upload>
                  }
                />
              </Form.Item>
              <Form.Item
                label="Текст логотипа (если нет картинки)"
                name="logoText"
              >
                <Input placeholder="сёма" />
              </Form.Item>
            </Card>

            <Card title="Ссылки и Контакты" loading={loading}>
              <Form.Item label="Блок 1 (Контакты)" name="contacts">
                <LinksBlockEditor />
              </Form.Item>

              <Form.Item label="Блок 2 (Проекты)" name="projects">
                <LinksBlockEditor />
              </Form.Item>

              <Form.Item label="Блок 3 (Соцсети)" name="socials">
                <LinksBlockEditor />
              </Form.Item>
            </Card>
          </Form>
        </Col>

        <Col span={8}>
          <Card
            title="Предпросмотр Лого"
            loading={loading}
            style={{ position: 'sticky', top: 24 }}
          >
            <Form.Item
              noStyle
              shouldUpdate={(prev, curr) =>
                prev.logoUrl !== curr.logoUrl || prev.logoText !== curr.logoText
              }
            >
              {() => {
                const url = form.getFieldValue('logoUrl');
                const text = form.getFieldValue('logoText') || 'сёма';

                const src = url?.startsWith('http')
                  ? url
                  : url
                    ? `http://localhost:3001${url}`
                    : null;

                return (
                  <div
                    style={{
                      border: '1px dashed #ddd',
                      padding: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#fff',
                      minHeight: 100,
                    }}
                  >
                    {src ? (
                      <img
                        src={src}
                        alt="Logo"
                        style={{ maxWidth: '100%', maxHeight: 60 }}
                      />
                    ) : (
                      <span style={{ fontSize: 24, fontWeight: 'bold' }}>
                        {text}
                      </span>
                    )}
                  </div>
                );
              }}
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

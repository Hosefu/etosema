'use client';

import { useEffect, useState } from 'react';
import { Card, Form, Input, Switch, DatePicker, Select, Button, Table, message, Tag, Space, Divider } from 'antd';
import { SaveOutlined, ArrowLeftOutlined, CopyOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { adminGetPin, adminUpdatePin, adminGetCases, PinCode, Case, PinUsage } from '@/lib/adminClient';
import dayjs from 'dayjs';

export default function PinDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pin, setPin] = useState<PinCode | null>(null);
  const [allCases, setAllCases] = useState<Case[]>([]);
  const [form] = Form.useForm();
  
  const accessAll = Form.useWatch('accessAll', form);

  useEffect(() => {
    loadData();
  }, [params.id]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pinRes, casesRes] = await Promise.all([
        adminGetPin(params.id),
        adminGetCases()
      ]);

      if (casesRes.success && casesRes.data) {
        setAllCases(casesRes.data);
      }

      if (pinRes.success && pinRes.data) {
        setPin(pinRes.data);
        form.setFieldsValue({
          label: pinRes.data.label,
          accessAll: pinRes.data.accessAll,
          expiresAt: pinRes.data.expiresAt ? dayjs(pinRes.data.expiresAt) : null,
          caseIds: pinRes.data.cases?.map(c => c.id) || []
        });
      } else {
        message.error('Пин-код не найден');
        router.push('/admin/pins');
      }
    } catch (error) {
      message.error('Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const values = await form.validateFields();
      
      const response = await adminUpdatePin(params.id, {
        ...values,
        expiresAt: values.expiresAt ? values.expiresAt.toISOString() : null,
      });

      if (response.success) {
        message.success('Сохранено');
        loadData(); // Reload to refresh data
      }
    } catch (error) {
      message.error('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const handleCopyLink = () => {
    if (pin?.shortCode) {
      const url = `${window.location.origin}/${pin.shortCode}`;
      navigator.clipboard.writeText(url);
      message.success('Ссылка скопирована');
    }
  };

  const usageColumns = [
    {
      title: 'Дата/Время',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('DD.MM.YYYY HH:mm:ss'),
      width: 180,
    },
    {
      title: 'IP Адрес',
      dataIndex: 'ip',
      key: 'ip',
      width: 150,
    },
    {
      title: 'Статус',
      dataIndex: 'success',
      key: 'success',
      render: (success: boolean) => (
        <Tag color={success ? 'green' : 'red'}>
          {success ? 'Успех' : 'Отказ'}
        </Tag>
      ),
      width: 100,
    },
    {
      title: 'Действие/Страница',
      dataIndex: 'path',
      key: 'path',
      render: (path: string | null) => {
        if (!path) return <span style={{ color: '#999' }}>Вход (Login)</span>;
        if (path === '/cases') return 'Главная (Список кейсов)';
        if (path.startsWith('/cases/')) return `Просмотр кейса: ${path.replace('/cases/', '')}`;
        return path;
      }
    },
    {
      title: 'User Agent',
      dataIndex: 'userAgent',
      key: 'userAgent',
      ellipsis: true,
      render: (ua: string) => <span style={{ fontSize: 12, color: '#888' }} title={ua}>{ua}</span>
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => router.push('/admin/pins')}
          style={{ marginRight: 16 }}
        >
          Назад
        </Button>
        <span style={{ fontSize: 20, fontWeight: 600 }}>
          Редактирование Пин-кода
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 24 }}>
        <div>
          <Card 
            title="Настройки доступа" 
            loading={loading}
            extra={
              pin?.shortCode && (
                <Button type="text" icon={<CopyOutlined />} onClick={handleCopyLink}>
                  Скопировать ссылку
                </Button>
              )
            }
          >
            {pin?.code && (
              <div style={{ marginBottom: 24, padding: '16px', background: '#f9f9f9', borderRadius: '8px', textAlign: 'center', border: '1px dashed #d9d9d9' }}>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px', textTransform: 'uppercase' }}>Пин-код</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', letterSpacing: '2px', fontFamily: 'monospace' }}>{pin.code}</div>
              </div>
            )}

            <Form form={form} layout="vertical">
              <Form.Item label="Метка (Описание)" name="label">
                <Input placeholder="Например: Клиент Яндекс" />
              </Form.Item>
              
              <Form.Item label="Доступ ко всем кейсам" name="accessAll" valuePropName="checked">
                <Switch />
              </Form.Item>
              
              {!accessAll && (
                <Form.Item label="Доступные кейсы" name="caseIds">
                  <Select 
                    mode="multiple" 
                    placeholder="Выберите кейсы"
                    filterOption={(input, option) => 
                      (option?.children as unknown as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {allCases.filter(c => c.isNda).map(c => (
                      <Select.Option key={c.id} value={c.id}>{c.title}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}

              <Form.Item label="Срок действия" name="expiresAt">
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>

              <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} loading={saving} block>
                Сохранить изменения
              </Button>
            </Form>
          </Card>
        </div>

        <div>
          <Card title="История использования (последние 100 записей)" loading={loading}>
            <Table
              dataSource={pin?.usages || []}
              columns={usageColumns}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              size="small"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}


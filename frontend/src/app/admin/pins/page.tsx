'use client';

import { useEffect, useState } from 'react';
import { Table, Button, Space, Popconfirm, message, Tag, Modal, Form, Input, Switch, DatePicker, Select } from 'antd';
import { PlusOutlined, DeleteOutlined, EyeOutlined, CopyOutlined } from '@ant-design/icons';
import { adminGetPins, adminCreatePin, adminDeletePin, adminGetCases, PinCode, Case } from '@/lib/adminClient';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

export default function AdminPinsPage() {
  const router = useRouter();
  const [pins, setPins] = useState<PinCode[]>([]);
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form] = Form.useForm();
  
  // Watch accessAll field to toggle case selector
  const accessAll = Form.useWatch('accessAll', form);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pinsRes, casesRes] = await Promise.all([
        adminGetPins(),
        adminGetCases()
      ]);
      
      if (pinsRes.success && pinsRes.data) {
        setPins(pinsRes.data);
      }
      if (casesRes.success && casesRes.data) {
        setCases(casesRes.data);
      }
    } catch (error) {
      message.error('Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await adminDeletePin(id);
      if (response.success) {
        message.success('Пин-код удален');
        loadData();
      }
    } catch (error) {
      message.error('Ошибка удаления');
    }
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      setCreating(true);
      const response = await adminCreatePin({
        ...values,
        expiresAt: values.expiresAt ? values.expiresAt.toISOString() : null,
      });

      if (response.success) {
        message.success('Пин-код создан');
        setIsModalOpen(false);
        form.resetFields();
        loadData();
      }
    } catch (error) {
      message.error('Ошибка создания');
    } finally {
      setCreating(false);
    }
  };

  const columns = [
    {
      title: 'Метка',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
      render: (val: string) => val ? <Tag style={{ fontSize: 14, fontWeight: 'bold' }}>{val}</Tag> : <span style={{ color: '#999' }}>Скрыт</span>,
    },
    {
      title: 'Ссылка',
      key: 'link',
      render: (record: PinCode) => record.shortCode ? (
        <Button size="small" icon={<CopyOutlined />} onClick={() => {
          const url = `${window.location.origin}/${record.shortCode}`;
          navigator.clipboard.writeText(url);
          message.success('Ссылка скопирована');
        }}>
          Копировать
        </Button>
      ) : '-',
    },
    {
      title: 'Доступ',
      dataIndex: 'accessAll',
      key: 'accessAll',
      render: (val: boolean) => (
        <Tag color={val ? 'green' : 'blue'}>{val ? 'Все кейсы' : 'Выборочно'}</Tag>
      ),
    },
    {
      title: 'Истекает',
      dataIndex: 'expiresAt',
      key: 'expiresAt',
      render: (date: string) => date ? dayjs(date).format('DD.MM.YYYY HH:mm') : 'Никогда',
    },
    {
      title: 'Создан',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('DD.MM.YYYY'),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (record: PinCode) => (
        <Space>
          <Button 
            type="link" 
            icon={<EyeOutlined />} 
            onClick={() => router.push(`/admin/pins/${record.id}`)}
          >
            Детали
          </Button>
          <Popconfirm
            title="Удалить пин-код?"
            onConfirm={() => handleDelete(record.id)}
            okText="Да"
            cancelText="Нет"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Удалить
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Управление Пин-кодами</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Создать Пин-код
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={pins}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title="Создать новый Пин-код"
        open={isModalOpen}
        onOk={handleCreate}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={creating}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Пин-код" name="code" rules={[{ required: true, message: 'Введите пин-код' }]}>
            <Input placeholder="Например: 1234" />
          </Form.Item>
          <Form.Item label="Метка (кому выдан)" name="label">
            <Input placeholder="Например: Клиент Яндекс" />
          </Form.Item>
          <Form.Item label="Доступ ко всем кейсам" name="accessAll" valuePropName="checked">
            <Switch />
          </Form.Item>
          
          {!accessAll && (
            <Form.Item label="Доступные кейсы" name="caseIds">
              <Select mode="multiple" placeholder="Выберите кейсы">
                {cases.filter(c => c.isNda).map(c => (
                  <Select.Option key={c.id} value={c.id}>{c.title}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item label="Срок действия" name="expiresAt">
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

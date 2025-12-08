/**
 * Admin Cases Page
 */

'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Space,
  Popconfirm,
  message,
  Tag,
  Modal,
  Form,
  Input,
  InputNumber,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  HolderOutlined,
} from '@ant-design/icons';
import {
  adminGetCases,
  adminDeleteCase,
  adminCreateCase,
  adminReorderCases,
  Case,
} from '@/lib/adminClient';
import { useRouter } from 'next/navigation';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row = ({ children, ...props }: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if ((child as React.ReactElement).key === 'sort') {
          return React.cloneElement(child as React.ReactElement, {
            children: (
              <HolderOutlined
                ref={setActivatorNodeRef}
                style={{ touchAction: 'none', cursor: 'move' }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

export default function AdminCasesPage() {
  const router = useRouter();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createForm] = Form.useForm();

  const loadCases = async () => {
    setLoading(true);
    try {
      const response = await adminGetCases();
      if (response.success && response.data) {
        setCases(response.data);
      }
    } catch (error) {
      message.error('Ошибка загрузки кейсов');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCases();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await adminDeleteCase(id);
      if (response.success) {
        message.success('Кейс удален');
        loadCases();
      }
    } catch (error) {
      message.error('Ошибка удаления');
    }
  };

  const handleCreate = async () => {
    try {
      const values = await createForm.validateFields();
      setCreating(true);
      const response = await adminCreateCase({
        ...values,
        orderRank: `${Date.now()}`, // Simple ordering
      });

      if (response.success && response.data) {
        message.success('Кейс создан');
        setIsCreateModalOpen(false);
        createForm.resetFields();
        router.push(`/admin/cases/${response.data.id}/edit`);
      }
    } catch (e) {
      message.error('Ошибка создания');
    } finally {
      setCreating(false);
    }
  };

  const onDragEnd = async ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = cases.findIndex((i) => i.id === active.id);
      const overIndex = cases.findIndex((i) => i.id === over?.id);

      const newCases = arrayMove(cases, activeIndex, overIndex);
      setCases(newCases);

      // Save new order to backend
      try {
        const caseIds = newCases.map((c) => c.id);
        await adminReorderCases(caseIds);
        message.success('Порядок сохранен');
      } catch (e) {
        message.error('Ошибка сохранения порядка');
        loadCases(); // Reload on error
      }
    }
  };

  const columns = [
    {
      key: 'sort',
      width: 50,
      render: () => null, // Drag handle will be injected by Row component
    },
    {
      title: 'Обложка',
      dataIndex: 'coverUrl',
      key: 'coverUrl',
      width: 100,
      render: (url: string) => {
        const src = url.startsWith('http')
          ? url
          : `http://localhost:3001${url}`;
        return (
          <img
            src={src}
            alt="Cover"
            style={{
              width: 60,
              height: 60,
              objectFit: 'cover',
              borderRadius: 4,
            }}
          />
        );
      },
    },
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Год',
      dataIndex: 'year',
      key: 'year',
      width: 80,
    },
    {
      title: 'NDA',
      dataIndex: 'isNda',
      key: 'isNda',
      width: 80,
      render: (isNda: boolean) => (
        <Tag color={isNda ? 'red' : 'green'}>{isNda ? 'Да' : 'Нет'}</Tag>
      ),
    },
    {
      title: 'Блоков',
      key: 'blocks',
      width: 80,
      render: (record: Case) => record.blocks?.length || 0,
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 150,
      render: (record: Case) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => router.push(`/admin/cases/${record.id}/edit`)}
          >
            Изменить
          </Button>
          <Popconfirm
            title="Удалить кейс?"
            description="Это действие нельзя отменить"
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
      <div
        style={{
          marginBottom: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ margin: 0 }}>Управление кейсами</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Создать кейс
        </Button>
      </div>

      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={cases.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            components={{
              body: {
                row: Row,
              },
            }}
            columns={columns}
            dataSource={cases}
            rowKey="id"
            loading={loading}
            pagination={false}
          />
        </SortableContext>
      </DndContext>

      <Modal
        title="Создать новый кейс"
        open={isCreateModalOpen}
        onOk={handleCreate}
        onCancel={() => setIsCreateModalOpen(false)}
        confirmLoading={creating}
      >
        <Form form={createForm} layout="vertical">
          <Form.Item
            label="Название"
            name="title"
            rules={[{ required: true, message: 'Введите название' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Slug (URL)"
            name="slug"
            rules={[{ required: true, message: 'Введите slug' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Год"
            name="year"
            rules={[{ required: true, message: 'Введите год' }]}
            initialValue={new Date().getFullYear()}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

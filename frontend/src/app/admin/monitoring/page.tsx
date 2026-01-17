'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Form, Input, InputNumber, Switch, message } from 'antd';
import {
  adminGetMonitoringSettings,
  adminSendMonitoringTest,
  adminUpdateMonitoringSettings,
} from '@/lib/adminClient';

const normalizeChatIds = (value: string): number[] => {
  return value
    .split(/[,\s]+/)
    .map((item) => Number(item.trim()))
    .filter((item) => Number.isFinite(item));
};

const formatChatIds = (ids: number[]) => ids.join(', ');

export default function AdminMonitoringPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await adminGetMonitoringSettings();
      if (res.success && res.data) {
        form.setFieldsValue({
          enabled: res.data.enabled,
          botToken: res.data.botToken || '',
          allowedChatIds: formatChatIds(res.data.allowedChatIds || []),
          dailySummaryHour: res.data.dailySummaryHour ?? 22,
          lastDailySummaryDate: res.data.lastDailySummaryDate || '',
        });
      }
    } catch {
      message.error('Ошибка загрузки настроек');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const values = await form.validateFields();
      const allowedChatIds = normalizeChatIds(values.allowedChatIds || '');
      const res = await adminUpdateMonitoringSettings({
        enabled: values.enabled,
        botToken: values.botToken || null,
        allowedChatIds,
        dailySummaryHour: values.dailySummaryHour,
      });
      if (res.success) {
        message.success('Настройки сохранены');
      }
    } catch {
      message.error('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    try {
      setTesting(true);
      const res = await adminSendMonitoringTest();
      if (res.success) {
        message.success('Тестовое сообщение отправлено');
      }
    } catch {
      message.error('Не удалось отправить тест');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', gap: 12 }}>
        <Button type="primary" onClick={handleSave} loading={saving}>
          Сохранить
        </Button>
        <Button onClick={handleTest} loading={testing}>
          Отправить тест
        </Button>
      </div>

      <Card title="Telegram мониторинг" loading={loading}>
        <Form form={form} layout="vertical">
          <Form.Item label="Включено" name="enabled" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item
            label="Токен бота"
            name="botToken"
            extra="Можно заменить токен, если создадите нового бота."
          >
            <Input.Password placeholder="123456789:ABCDEF..." />
          </Form.Item>

          <Form.Item
            label="ID пользователей (через запятую)"
            name="allowedChatIds"
            extra="Только эти ID получают уведомления и могут писать боту команды."
          >
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
          </Form.Item>

          <Form.Item
            label="Ежедневная сводка (час, МСК)"
            name="dailySummaryHour"
          >
            <InputNumber min={0} max={23} style={{ width: 120 }} />
          </Form.Item>

          <Form.Item label="Последняя отправка (служебное поле)" name="lastDailySummaryDate">
            <Input disabled />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

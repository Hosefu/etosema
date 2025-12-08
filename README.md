# Etosema Portfolio

Полноценное портфолио для коммуникационной дизайнерки Сёмы. Сайт с работами, системой доступа к NDA-кейсам через PIN-коды, и админ-панелью для управления контентом.

## 📋 Описание проекта

### Основные возможности

- **Портфолио работ**: Сетка кейсов с превью и детальным просмотром
- **Система NDA**: PIN-коды для доступа к закрытым проектам
- **О себе**: Страница с контактами и социальными ссылками
- **Админ-панель**: Простое управление кейсами, блоками и PIN-кодами
- **Адаптивность**: Полная поддержка мобильных и десктопных устройств
- **SPA**: Плавные переходы без перезагрузки страницы

### Технологии

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- SCSS с системой скейлинга
- Атомарная архитектура компонентов

**Backend:**
- Node.js + Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- AdminJS

## 🚀 Быстрый старт

### Требования

- Node.js >= 18
- PostgreSQL
- npm или pnpm

### 1. Клонирование и установка

```bash
# Клонируйте репозиторий
git clone <repository-url>
cd etosema

# Установите зависимости для бэкенда
cd backend
npm install

# Установите зависимости для фронтенда
cd ../frontend
npm install
```

### 2. Настройка бэкенда

```bash
cd backend

# Создайте .env из примера
cp .env.example .env

# Отредактируйте .env и заполните:
# - DATABASE_URL (подключение к PostgreSQL)
# - Секреты (PIN_SESSION_SECRET, JWT_SECRET, SESSION_SECRET)
# - Данные для админки (ADMIN_EMAIL, ADMIN_PASSWORD)

# Настройте базу данных
npm run prisma:generate
npm run prisma:migrate

# Заполните тестовыми данными (опционально)
npm run prisma:seed
```

### 3. Настройка фронтенда

```bash
cd ../frontend

# Создайте .env.local из примера
cp .env.local.example .env.local

# Отредактируйте .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Запуск в dev-режиме

**Терминал 1 - Бэкенд:**
```bash
cd backend
npm run dev
```

**Терминал 2 - Фронтенд:**
```bash
cd frontend
npm run dev
```

### 5. Откройте в браузере

- **Сайт**: http://localhost:3000
- **API**: http://localhost:3001/api/public
- **Админка**: http://localhost:3001/admin

### Тестовые PIN-коды (после seed)

- `1234` - доступ к конкретному NDA-кейсу
- `9999` - полный доступ ко всем NDA-кейсам

## 📁 Структура проекта

```
etosema/
├── backend/               # Backend API + AdminJS
│   ├── src/
│   │   ├── modules/      # Модули (cases, pin, profile, security)
│   │   ├── admin/        # Конфигурация AdminJS
│   │   ├── config/       # Настройки окружения
│   │   ├── db/           # Prisma клиент
│   │   └── types/        # TypeScript типы
│   ├── prisma/
│   │   ├── schema.prisma # Схема базы данных
│   │   └── seed.ts       # Тестовые данные
│   └── package.json
│
└── frontend/             # Next.js фронтенд
    ├── src/
    │   ├── app/          # Страницы (App Router)
    │   ├── components/   # Компоненты (atoms/molecules/organisms)
    │   ├── lib/          # API клиент, хуки, утилиты
    │   └── styles/       # SCSS токены и глобальные стили
    └── package.json
```

## 📚 Документация

Подробная документация для каждой части проекта:

- **[Backend README](./backend/README.md)** - API, база данных, безопасность
- **[Frontend README](./frontend/README.md)** - Компоненты, стили, хуки

## 🎨 Основные концепции

### Система скейлинга

Все размеры адаптируются под viewport:

```scss
// В компонентах
.element {
  padding: s(24);  // Масштабируется от 375px (mobile) до 1440px (desktop)
}
```

### Сетка 12 колонок

```scss
.container {
  @include page-grid;  // 12-колоночная сетка

  .item {
    @include grid-span(6);  // Занимает 6 колонок
  }
}
```

### PIN-коды для NDA

1. Создаете PIN в админке
2. Привязываете к нужным кейсам (или даёте доступ ко всем)
3. Передаёте PIN клиенту
4. Клиент использует: `https://yoursite.com/?pin=1234`

## 🔐 Безопасность

### PIN-коды

- Хранятся как bcrypt-хэши (не в открытом виде)
- Сессия в httpOnly cookie
- Rate limiting: 8 попыток в час с одного IP

### Данные

- Все NDA-кейсы закрыты по умолчанию
- API проверяет права доступа для каждого запроса
- Логирование всех попыток ввода PIN

## 📱 Адаптивность

### Брейкпоинты

- **Mobile**: < 768px (базовая шкала 375px)
- **Tablet**: 768px - 1279px
- **Desktop**: >= 1280px (базовая шкала 1440px)

### Поведение

- Сетка кейсов: 1 колонка (mobile) → 2 колонки (desktop)
- HALF-блоки: вертикально (mobile) → горизонтально (desktop)
- Навигация: sticky header с плавными переходами

## 🛠 Разработка

### Добавление нового кейса

1. Откройте админку: http://localhost:3001/admin
2. Войдите (email/пароль из .env)
3. Создайте Case (название, slug, год, обложка)
4. Добавьте CaseBlock'и (FULL или HALF)
5. Добавьте медиа в блоки (изображения/видео)

### Создание PIN-кода

1. В админке: Access Control → Pin Codes → New
2. Заполните:
   - Label (название для себя)
   - Plain PIN (4-значный код) - покажется только раз!
   - Access All (доступ ко всем NDA) или привяжите к конкретным кейсам
   - Expiration (опционально)

### Просмотр статистики

1. В админке: Analytics → Pin Usages
2. Смотрите IP, успешность попыток, timestamp

## 🚀 Деплой

### Backend

```bash
cd backend
npm run build
npm start
```

Нужно:
- PostgreSQL база
- Правильные переменные окружения в production

### Frontend

```bash
cd frontend
npm run build
npm start
```

Или деплой на Vercel (рекомендуется для Next.js).

### Nginx

Пример конфигурации для reverse proxy:

```nginx
server {
  listen 80;
  server_name yoursite.com;

  # Frontend
  location / {
    proxy_pass http://localhost:3000;
  }

  # Backend API
  location /api {
    proxy_pass http://localhost:3001;
  }

  # Admin panel
  location /admin {
    proxy_pass http://localhost:3001;
  }
}
```

## 📝 Типичные задачи

### Изменить профиль (страница "Обо мне")

1. Админка → Content → Profiles → Edit
2. Измените текст, контакты, проекты, соцсети (JSON формат)
3. Сохраните

### Изменить порядок кейсов

1. В админке отредактируйте поле `orderRank`
2. Используйте строки для сортировки (например, `a0`, `a1`, `a2`, ...)
3. Для вставки между `a1` и `a2` используйте `a1a`

### Сбросить базу данных

```bash
cd backend
npx prisma migrate reset  # ВНИМАНИЕ: удалит все данные!
npm run prisma:seed       # Восстановит тестовые данные
```

## 🐛 Частые проблемы

**База данных не подключается**
- Проверьте `DATABASE_URL` в `.env`
- Убедитесь, что PostgreSQL запущен
- Проверьте права доступа

**CORS ошибки**
- Проверьте `FRONTEND_URL` в backend `.env`
- Убедитесь, что фронтенд и бэк запущены на правильных портах

**PIN не работает**
- Проверьте, что сессионные секреты одинаковые
- Очистите cookies браузера
- Проверьте логи в AdminJS → Pin Usages

## 📄 Лицензия

MIT

## 👥 Контакты

Для вопросов и предложений:
- Telegram: @sema_tsekh
- Email: iam@etosema.ru

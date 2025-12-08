# Инструкция по запуску проекта Etosema Portfolio

Пошаговое руководство для первого запуска проекта.

## Предварительные требования

Перед началом убедитесь, что у вас установлено:

- ✅ **Node.js** версии 18 или выше ([скачать](https://nodejs.org/))
- ✅ **PostgreSQL** ([скачать](https://www.postgresql.org/download/))
- ✅ **npm** (устанавливается вместе с Node.js)

Проверить версии:
```bash
node --version  # должно быть >= 18
npm --version
psql --version
```

---

## Шаг 1: Создание базы данных PostgreSQL

### Вариант 1: Через командную строку

```bash
# Войдите в PostgreSQL
psql -U postgres

# Создайте базу данных
CREATE DATABASE etosema_db;

# Создайте пользователя (опционально)
CREATE USER etosema_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE etosema_db TO etosema_user;

# Выйдите
\q
```

### Вариант 2: Через GUI (pgAdmin, TablePlus и т.д.)

Создайте новую базу данных с названием `etosema_db`.

---

## Шаг 2: Установка зависимостей

### Backend

```bash
cd backend
npm install
```

Это установит все необходимые пакеты для бэкенда (~50 пакетов).

### Frontend

```bash
cd ../frontend
npm install
```

Это установит зависимости для фронтенда.

---

## Шаг 3: Настройка переменных окружения

### Backend (.env)

```bash
cd ../backend
cp .env.example .env
```

Откройте `backend/.env` и заполните:

```bash
# База данных
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/etosema_db?schema=public"

# Сервер
PORT=3001
NODE_ENV=development

# Админка (ваши данные для входа)
ADMIN_EMAIL=admin@etosema.ru
ADMIN_PASSWORD=your_secure_password

# Секреты (сгенерируйте случайные строки)
PIN_SESSION_SECRET=generate_random_string_here_1
JWT_SECRET=generate_random_string_here_2
SESSION_SECRET=generate_random_string_here_3

# CORS
FRONTEND_URL=http://localhost:3000
```

**Как сгенерировать секреты:**

```bash
# Способ 1: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Способ 2: OpenSSL
openssl rand -hex 32

# Способ 3: Онлайн генератор
# https://www.random.org/strings/
```

### Frontend (.env.local)

```bash
cd ../frontend
cp .env.local.example .env.local
```

Откройте `frontend/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Шаг 4: Инициализация базы данных

```bash
cd ../backend

# Генерируем Prisma клиент
npm run prisma:generate

# Применяем миграции (создаём таблицы)
npm run prisma:migrate

# Заполняем тестовыми данными
npm run prisma:seed
```

После успешного выполнения вы увидите:

```
✅ Seeding completed successfully!

Созданы:
- 1 профиль
- 2 кейса (1 публичный, 1 NDA)
- 2 PIN-кода:
  - 1234 (доступ к конкретному кейсу)
  - 9999 (полный доступ)
```

---

## Шаг 5: Запуск проектов

Откройте **два терминала**.

### Терминал 1 - Backend

```bash
cd backend
npm run dev
```

Вы увидите:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Etosema Portfolio Backend
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Environment:  development
  Server:       http://localhost:3001
  API:          http://localhost:3001/api/public
  Admin Panel:  http://localhost:3001/admin

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Терминал 2 - Frontend

```bash
cd frontend
npm run dev
```

Вы увидите:

```
  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Network:      http://192.168.1.x:3000

 ✓ Ready in 2.5s
```

---

## Шаг 6: Проверка работы

### 1. Откройте сайт

Перейдите по адресу: **http://localhost:3000**

Вы должны увидеть:
- Навигацию: "Работы" / "Обо мне"
- Сетку с 2 кейсами
- Один кейс открыт, другой с замком (NDA)

### 2. Протестируйте PIN

**Способ 1: Через URL**

Перейдите: `http://localhost:3000/?pin=1234`

PIN автоматически применится, и NDA-кейс разблокируется.

**Способ 2: Через карточку**

1. Кликните на NDA-карточку с замком
2. Появится поле ввода PIN
3. Введите `1234`
4. Карточка разблокируется

### 3. Откройте админку

Перейдите: **http://localhost:3001/admin**

Войдите с данными из `.env`:
- Email: `admin@etosema.ru` (или ваш)
- Password: ваш пароль из `ADMIN_PASSWORD`

В админке вы увидите:
- **Portfolio**: Cases, Case Blocks, Case Block Medias
- **Access Control**: Pin Codes, Pin Code Cases
- **Analytics**: Pin Usages
- **Content**: Profiles

---

## Шаг 7: Работа с проектом

### Добавить новый кейс

1. Админка → **Cases** → **Create New**
2. Заполните:
   - Title: "Мой новый проект"
   - Slug: "my-new-project" (будет в URL)
   - Year: 2024
   - Cover URL: ссылка на изображение
   - Is NDA: true/false
   - Order Rank: "a3" (для сортировки)
3. **Save**

4. Добавьте блоки:
   - **Case Blocks** → **Create New**
   - Выберите ваш кейс
   - Layout: FULL или HALF
   - Order Rank: "a0", "a1", ...

5. Добавьте медиа:
   - **Case Block Medias** → **Create New**
   - Выберите блок
   - Type: IMAGE или VIDEO
   - URL: ссылка на медиа
   - Position: 0 (для FULL) или 0/1 (для HALF)

### Создать PIN-код

1. Админка → **Pin Codes** → **Create New**
2. Заполните:
   - Label: "Клиент XYZ"
   - Plain PIN: "5678" (покажется только сейчас!)
   - Access All: false (или true для доступа ко всем)
   - Expires At: дата истечения (опционально)
3. **Save**

4. Свяжите с кейсами:
   - **Pin Code Cases** → **Create New**
   - Выберите PIN и кейс
   - **Save**

5. Передайте клиенту ссылку: `https://yoursite.com/?pin=5678`

### Изменить профиль (страницу "Обо мне")

1. Админка → **Profiles** → **Edit**
2. Отредактируйте JSON поля:

```json
// contactsJson
{
  "telegram": "@yourname",
  "email": "you@example.com"
}

// projectsJson
[
  { "label": "Проект 1", "url": "https://..." },
  { "label": "Проект 2", "url": "https://..." }
]

// socialsJson
[
  { "label": "Instagram", "url": "https://..." },
  { "label": "Telegram канал", "url": "https://..." }
]
```

3. **Save**

---

## Полезные команды

### Backend

```bash
# Разработка
npm run dev

# Production build
npm run build
npm start

# База данных
npm run prisma:studio      # Открыть GUI для БД
npm run prisma:migrate     # Применить миграции
npm run prisma:seed        # Заполнить данными
npx prisma migrate reset   # СБРОС БАЗЫ (удалит все!)

# Создать новую миграцию
npx prisma migrate dev --name migration_name
```

### Frontend

```bash
# Разработка
npm run dev

# Production build
npm run build
npm start

# Проверка типов
npm run type-check

# Линтинг
npm run lint
```

---

## Частые проблемы и решения

### ❌ "Cannot connect to database"

**Проблема:** Backend не может подключиться к PostgreSQL.

**Решение:**
1. Убедитесь, что PostgreSQL запущен: `pg_isready`
2. Проверьте `DATABASE_URL` в `.env`
3. Проверьте пароль и имя базы
4. Попробуйте подключиться вручную: `psql -U postgres -d etosema_db`

### ❌ "CORS error"

**Проблема:** Фронтенд не может обращаться к бэкенду.

**Решение:**
1. Проверьте, что backend запущен на порту 3001
2. Проверьте `FRONTEND_URL` в backend `.env`
3. Проверьте `NEXT_PUBLIC_API_URL` в frontend `.env.local`

### ❌ "PIN doesn't work"

**Проблема:** PIN не применяется или не открывает кейсы.

**Решение:**
1. Очистите cookies браузера
2. Проверьте в админке: Analytics → Pin Usages
3. Убедитесь, что PIN связан с кейсом через Pin Code Cases
4. Проверьте `PIN_SESSION_SECRET` в `.env`

### ❌ "AdminJS not loading"

**Проблема:** Админка не открывается.

**Решение:**
1. Проверьте, что backend запущен
2. Попробуйте другой браузер
3. Проверьте email/password в `.env`
4. Посмотрите логи в терминале backend

### ❌ "Module not found"

**Проблема:** Ошибка импорта модуля.

**Решение:**
```bash
# Переустановите зависимости
rm -rf node_modules package-lock.json
npm install

# Для TypeScript
npx tsc --noEmit
```

---

## Следующие шаги

После успешного запуска:

1. ✅ Изучите структуру проекта в `README.md`
2. ✅ Прочитайте документацию:
   - [Backend README](./backend/README.md)
   - [Frontend README](./frontend/README.md)
3. ✅ Добавьте свои кейсы через админку
4. ✅ Настройте профиль (страницу "Обо мне")
5. ✅ Протестируйте PIN-коды
6. ✅ Подготовьте к деплою (см. главный README.md)

---

## Поддержка

Если возникли проблемы:

1. Проверьте логи в терминалах
2. Откройте DevTools в браузере (F12) → Console
3. Проверьте документацию в README файлах
4. Проверьте GitHub Issues (если проект там размещён)

---

**Удачи с проектом! 🚀**

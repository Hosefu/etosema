# Deploy (production) — Etosema

Этот документ описывает **текущую прод-схему** на сервере и **как деплоить** актуальную версию.

## Текущая схема на сервере

- **Сервер**: `89.111.131.199`
- **Пользователь**: `root`
- **Nginx**: установлен **на хосте** (systemd), слушает `80/443`
- **TLS сертификаты**: через **lego**, лежат в:
  - `/etc/lego/etosema/certificates/etosema.ru.fullchain.crt`
  - `/etc/lego/etosema/certificates/etosema.ru.key`
- **Проксирование**:
  - `https://etosema.ru/` → прокси на `http://127.0.0.1:3000`
  - `https://etosema.ru/api/...` → прокси на `http://127.0.0.1:3001/api...`
- **Приложение**: запускается через **Docker Compose** (на сервере)
- **Папка деплоя на сервере**: `/opt/etosema/etosema`

## Nginx конфиг

- Основной конфиг: `/etc/nginx/nginx.conf`
- Vhost’ы:
  - `/etc/nginx/sites-available/*`
  - `/etc/nginx/sites-enabled/*`
- Конфиг домена:
  - `/etc/nginx/sites-available/etosema.ru`
  - (симлинк) `/etc/nginx/sites-enabled/etosema.ru`

Важно: upstream должен быть **`127.0.0.1`**, не `localhost`, чтобы не ловить IPv6/connection issues.

Проверка и перезагрузка:

```bash
nginx -t
systemctl reload nginx
```

## Docker Compose (prod)

### Порты

В проде сервисы биндятся на loopback:
- `127.0.0.1:3000 -> frontend`
- `127.0.0.1:3001 -> backend`
- `127.0.0.1:5432 -> postgres` (не торчит наружу)

Это сделано намеренно: наружу отдаёт только nginx.

### Важный нюанс: PORT во frontend

В `.env` есть `PORT=3001` для backend. Чтобы Next.js не стартовал на этом же порту,
в `docker-compose.yml` для `frontend` задано:

- `environment: PORT=3000`

## Переменные окружения (prod)

Локально:
- `prod.compose.env` — **пресет для прода** (секреты внутри, gitignored)
- при деплое он копируется на сервер как `compose.env`

На сервере:
- `/opt/etosema/etosema/compose.env` — **боевой** env, который читает `docker compose`

## Деплой

### Быстрый деплой одной командой (с твоего компа)

Используй:

```bash
./scripts/deploy-prod.sh
```

Что делает скрипт:
- создаёт папку на сервере (если нет): `/opt/etosema/etosema`
- копирует `prod.compose.env` → `/opt/etosema/etosema/compose.env`
- rsync’ом заливает проект (без `.git`, `node_modules`, билд-артефактов и т.п.)
- выполняет на сервере: `docker compose up -d --build`
- делает быстрый чек ответа nginx

### Ручной деплой на сервере (если надо)

```bash
cd /opt/etosema/etosema
set -a
. ./compose.env
set +a
docker compose up -d --build
```

Проверка контейнеров:

```bash
docker compose ps
docker compose logs --tail=200 backend
docker compose logs --tail=200 frontend
```

## Где искать логин/пароль от админки

Админка берёт креды из переменных окружения:
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Где они лежат:
- **локально**: в файле `prod.compose.env` (который ты используешь для прода)
- **на сервере**: в `/opt/etosema/etosema/compose.env`

Важно: при первом поднятии/сиде эти значения используются для создания/обновления админа в базе.

## Траблшутинг

### 502 от nginx
1) Проверить, что контейнеры подняты и слушают loopback:

```bash
ss -lntp | grep -E ':(3000|3001|5432)\\b'
docker compose ps
```

2) Проверить nginx error log:

```bash
tail -n 100 /var/log/nginx/error.log
```

3) Проверить, что в `/etc/nginx/sites-available/etosema.ru` стоит `proxy_pass http://127.0.0.1:3000;` и `proxy_pass http://127.0.0.1:3001;`

### Сброс базы “с чистого листа”

Внимание: удалит данные.

```bash
cd /opt/etosema/etosema
docker compose down -v
docker compose up -d --build
```

## Безопасность

- Папка `access/` (SSH ключи) должна быть **gitignored** и не попадать в репозиторий.
- `prod.compose.env` / `compose.env` содержат секреты — не коммитить и не шарить публично.


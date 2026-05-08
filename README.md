# Лаборатория профилактики и качества движения

Статическая первая страница сайта по референсу из макета: hero-блок, направления, блок экспертизы и нижний CTA.

## Структура

```text
.
├── index.html
├── styles.css
├── app.js
├── assets/
├── scripts/check-local-assets.js
├── vercel.json
├── netlify.toml
└── .nojekyll
```

## Локальный запуск

Windows:

```bash
npm run dev:win
```

macOS/Linux:

```bash
npm run dev
```

Откройте в браузере: `http://localhost:5173`.

## Проверка

```bash
npm run check
```

Проверяет, что все локальные SVG-ассеты, подключенные в HTML/CSS, существуют.

## Деплой

### GitHub Pages

1. Создать новый репозиторий, например `lab-movement-site`.
2. Загрузить содержимое этой папки в корень репозитория.
3. В GitHub: Settings → Pages → Deploy from a branch → `main` → `/root`.

### Vercel

Импортировать репозиторий в Vercel. Build command можно оставить пустым. Output directory: `.`.

### Netlify

Импортировать репозиторий в Netlify. Publish directory: `.`.

## Что заменить перед продакшеном

- `mailto:hello@example.ru` заменить на реальный адрес или форму записи.
- SVG-иллюстрации заменить на утвержденные фото/рендеры клиники и специалистов.
- Добавить реальные страницы разделов: услуги, продукты, врачи, блог, контакты.

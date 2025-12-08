# Etosema Portfolio - Frontend

Frontend application for Sema's portfolio website. Built with Next.js, TypeScript, and SCSS.

## 🏗 Architecture

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS with custom scaling system
- **Component Structure**: Atomic Design (atoms, molecules, organisms)
- **State Management**: React hooks + API client

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout with fonts
│   │   ├── page.tsx             # Works page (home)
│   │   ├── about/
│   │   │   └── page.tsx         # About page
│   │   └── cases/
│   │       └── [slug]/
│   │           └── page.tsx     # Individual case page
│   ├── components/
│   │   ├── atoms/               # Basic components
│   │   │   ├── Text/
│   │   │   ├── Heading/
│   │   │   ├── Button/
│   │   │   └── IconLock/
│   │   ├── molecules/           # Composite components
│   │   │   ├── PinInput/        # 4-digit PIN input
│   │   │   └── CaseCard/        # Case grid card
│   │   ├── organisms/           # Complex components
│   │   │   ├── CasesGrid/       # Grid of cases
│   │   │   └── CaseViewer/      # Full case display
│   │   └── layout/
│   │       └── MainLayout/      # Main layout with nav
│   ├── lib/
│   │   ├── apiClient/           # API communication
│   │   │   ├── types.ts         # TypeScript types
│   │   │   ├── client.ts        # HTTP client
│   │   │   └── index.ts         # API functions
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── usePinAccess.ts  # PIN state management
│   │   │   └── useHorizontalScroll.ts
│   │   └── utils/
│   └── styles/
│       ├── tokens.scss          # Design tokens & functions
│       └── globals.scss         # Global styles
├── package.json
├── tsconfig.json
├── next.config.js
└── .env.local.example
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- Backend API running (see [backend README](../backend/README.md))

### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables**:

   Copy `.env.local.example` to `.env.local`:

   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## 🎨 Design System

### Scaling System

All sizes use a responsive scaling function that adapts to viewport width:

```scss
@import '@/styles/tokens.scss';

.myComponent {
  padding: s(24);        // Scales from 24 units
  width: cap(200px, s(400), 600px); // With min/max bounds
}
```

**Breakpoints:**
- Mobile: 375px baseline
- Desktop: 1440px baseline
- Switch point: 1280px

### Typography

Pre-defined mixins for consistent typography:

```scss
@include text-body;           // Running text
@include text-heading-large;  // Large headings
@include text-heading-small;  // Small headings
@include text-card-title;     // Card titles
@include text-small;          // Small text
```

**Font:** Inter Display (loaded in `app/layout.tsx`)

### Grid System

12-column grid with responsive behavior:

```scss
.container {
  @include page-grid;  // Creates 12-column grid

  .item {
    @include grid-span(6);  // Spans 6 columns (50%)

    @include mobile {
      @include grid-span(12); // Full width on mobile
    }
  }
}
```

**Grid properties:**
- Columns: 12
- Gutter: 40 (scaled)
- Margin: 80 (scaled)

### Colors

```scss
$color-bg-page      // Page background (5% black)
$color-bg-card      // Card background (white)
$color-text-primary // Primary text (almost black)
$color-text-secondary // Secondary text (gray)
$color-border-light // Light borders
```

## 🔐 PIN Access System

### usePinAccess Hook

Manages PIN authentication state:

```tsx
const pinAccess = usePinAccess();

// Check access
pinAccess.isCaseAccessible(slug);

// Apply PIN
await pinAccess.applyPinCode('1234');

// Current state
pinAccess.hasSession;
pinAccess.accessAll;
pinAccess.caseSlugs;
```

### PIN Flow

1. **URL-based PIN**: `?pin=1234` auto-applies on page load
2. **Card input**: Enter PIN directly in locked case card
3. **Case page**: Enter PIN when accessing NDA case
4. **Session**: Stored in httpOnly cookie, persists across pages

## 📡 API Integration

All API calls use the typed client:

```tsx
import { getCases, getCaseBySlug, getProfile, applyPin } from '@/lib/apiClient';

// Get all cases
const { data, error } = await getCases();

// Get single case
const { data, error } = await getCaseBySlug('case-slug');

// Apply PIN
const { data, error } = await applyPin('1234');
```

## 🧩 Component Usage

### Basic Components

```tsx
import { Text, Heading, Button } from '@/components/atoms';

<Heading variant="large" level="h1">Title</Heading>
<Text variant="body">Content</Text>
<Button variant="primary">Click me</Button>
```

### PIN Input

```tsx
import { PinInput } from '@/components/molecules/PinInput';

<PinInput
  onComplete={(pin) => handlePin(pin)}
  error={errorMessage}
  disabled={loading}
/>
```

### Case Card

```tsx
import { CaseCard } from '@/components/molecules/CaseCard';

<CaseCard
  case={caseData}
  onPinSubmit={async (pin) => {
    const result = await applyPin(pin);
    return { success: !result.error, error: result.error?.message };
  }}
/>
```

## 🎯 Pages

### Works (Home) - `/`

- Displays grid of all portfolio cases
- Handles locked NDA cases with PIN input
- Supports PIN from URL query parameter
- Auto-refreshes when PIN applied

### About - `/about`

- Shows profile information
- Contacts, projects, social links
- Responsive grid layout

### Case - `/cases/[slug]`

- Full case display with blocks
- NDA protection with PIN screen
- FULL and HALF layout blocks
- Image and video support

## 🛠 Development

### Component Development

Follow atomic design principles:

1. **Atoms**: Basic building blocks (Button, Text, Icon)
2. **Molecules**: Simple combinations (PinInput, CaseCard)
3. **Organisms**: Complex sections (CasesGrid, CaseViewer)

Each component should have:
- TypeScript interface for props
- SCSS module for styles (using tokens)
- Clear single responsibility

### Styling Guidelines

✅ **DO:**
- Use `s()` function for all sizes
- Use design tokens for colors
- Use typography mixins
- Follow mobile-first approach
- Use SCSS modules for component styles

❌ **DON'T:**
- Use pixel values directly
- Hardcode colors
- Mix inline styles
- Use global class names

### Adding New Features

1. Create types in `lib/apiClient/types.ts`
2. Add API function in `lib/apiClient/index.ts`
3. Create components following atomic structure
4. Add page in `app/` directory
5. Update routing if needed

## 📱 Responsive Behavior

### Breakpoint Mixins

```scss
@include mobile { ... }        // < 768px
@include tablet { ... }        // 768px - 1279px
@include desktop { ... }       // >= 1280px
@include tablet-and-up { ... } // >= 768px
```

### Grid Behavior

- **Mobile**: 1 column layout
- **Desktop**: 2 column layout for cases grid
- **Blocks**: HALF blocks stack on mobile

## 🔗 Related

- [Backend Documentation](../backend/README.md)
- [Design System](./src/styles/tokens.scss)
- [API Types](./src/lib/apiClient/types.ts)

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | http://localhost:3001 |

## 🚧 Future Enhancements

Potential improvements (not implemented):

- [ ] Inline case preview on hover (desktop)
- [ ] Horizontal scroll for preview frames
- [ ] Image lazy loading optimization
- [ ] Skeleton loaders
- [ ] Error boundaries
- [ ] Analytics integration
- [ ] SEO optimization with metadata
- [ ] Share functionality

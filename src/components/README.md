# Components

This folder contains reusable UI components that can be used across different parts of the application.

## Structure
- Each component should have its own file (.tsx)
- Include TypeScript interfaces for props
- Use PascalCase for component names
- Export all components from `index.ts`

## Available Components

### Layout
**`Layout.tsx`** - Main layout wrapper component
- Combines Header, Navbar, and MobileNavbar
- Provides consistent structure across pages
- Handles responsive behavior

**Usage:**
```typescript
import { Layout } from '@/components';

function MyPage() {
  return (
    <Layout>
      <div>Your page content here</div>
    </Layout>
  );
}
```

### Header
**`Header.tsx`** - Top navigation header
- Shows application branding
- Contains navigation links
- Displays user authentication status
- Provides login/logout functionality

**Features:**
- Responsive design (desktop/mobile)
- Authentication state integration
- User profile display
- Sign in/Sign up buttons

### Navbar
**`Navbar.tsx`** - Desktop sidebar navigation
- Feature-specific navigation menu
- Badge notifications
- Active state indicators
- Only visible when user is authenticated

**Features:**
- Job search related navigation items
- Visual badges for notifications
- Responsive (hidden on mobile)
- Redux state integration

### MobileNavbar
**`MobileNavbar.tsx`** - Mobile slide-out navigation
- Hamburger menu for mobile devices
- Same navigation items as desktop
- Smooth slide animations
- Overlay backdrop

**Features:**
- Fixed position hamburger button
- Slide-out animation
- Touch-friendly design
- Auto-close on item selection

## Redux Integration

All navigation components use Redux for:
- Authentication state (`isAuthenticated`, `user`)
- Navigation state management
- User actions (login/logout)

## Responsive Design

The components follow a mobile-first approach:
- **Mobile**: MobileNavbar with hamburger menu
- **Desktop**: Header + Navbar sidebar layout
- **Tablet**: Adapts between mobile and desktop layouts

## Example Usage

```typescript
// Using individual components
import { Header, Navbar, MobileNavbar } from '@/components';

// Using the Layout wrapper (recommended)
import { Layout } from '@/components';

function App() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Your app content */}
      </div>
    </Layout>
  );
}
```

## Styling

All components use Tailwind CSS with:
- Consistent color scheme (blue/gray palette)
- Hover effects and transitions
- Shadow and border styling
- Responsive breakpoints

## Example
```
components/
├── Button/
│   ├── Button.tsx
│   ├── Button.module.css
│   └── Button.test.tsx
└── Header/
    ├── Header.tsx
    └── Header.module.css
``` 
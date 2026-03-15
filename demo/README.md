# LinkCard Demo - React Component Showcase

A modern Next.js 15 application demonstrating the interactive **LinkCard** component built with:
- **React 19** - Latest React with hooks
- **Next.js 15** - App Router, Server Components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations

## Project Structure

```
demo/
├── app/
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Demo page with LinkCard examples
│   └── globals.css       # Global Tailwind styles
├── components/
│   └── ui/
│       └── link-card.tsx # The LinkCard component
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── postcss.config.mjs
```

## Component: LinkCard

An interactive card component that displays a title, description, and decorative image. Features:

- **Smooth hover animations** - Scales up and lifts on hover using Framer Motion
- **Responsive design** - Works on mobile, tablet, and desktop
- **Accessible** - Semantic HTML, ARIA labels, focus states
- **Type-safe** - Full TypeScript support
- **Customizable** - Accepts all `<a>` tag attributes via props

### Props

```typescript
interface LinkCardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;           // Card title
  description: string;     // Card subtitle/description
  imageUrl: string;        // Image URL (right-aligned, scaled on hover)
  href: string;            // Link destination
}
```

### Usage Example

```tsx
import { LinkCard } from '@/components/ui/link-card';

export default function Home() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <LinkCard
        title="My Portfolio"
        description="Check out my latest work and projects"
        imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400"
        href="https://praveenkumar.dev"
      />
    </div>
  );
}
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd demo
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the demo.

### Build for Production

```bash
npm run build
npm start
```

## Dependencies

- **framer-motion** - Animation library for smooth transitions
- **clsx** - Utility for conditional class names
- **tailwind-merge** - Merge Tailwind classes without conflicts
- **react** - React library
- **next** - Next.js framework

## Features

✅ **Type-Safe** - Full TypeScript support
✅ **Accessible** - WCAG 2.1 compliant with focus management
✅ **Responsive** - Mobile-first responsive design
✅ **Performant** - Uses React 19 and Next.js optimizations
✅ **Animated** - Smooth Framer Motion animations
✅ **Styled** - Tailwind CSS for rapid development

## Next Steps

- Customize colors and spacing in `tailwind.config.ts`
- Add more variants to the LinkCard component
- Integrate with your design system
- Export and reuse in other Next.js projects

## License

MIT - Feel free to use this component in your projects!

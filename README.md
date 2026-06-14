# Jack - 3D Creator Portfolio

A modern, interactive portfolio landing page built with React, TypeScript, Tailwind CSS, Framer Motion, and Lucide React.

## Features

- **Responsive Design**: Mobile-first approach with seamless scaling from mobile to ultra-wide screens
- **Smooth Animations**: Framer Motion-powered scroll reveals, fade-ins, and interactive effects
- **Magnetic Hover Effects**: Mouse-following magnetic effect on hero image
- **Scroll-Driven Effects**: 
  - Character-by-character text animations
  - Marquee section with parallax scrolling
  - Card stacking effect with dynamic scaling
- **Modern Styling**: Dark theme with gradient text, smooth transitions
- **Optimized Performance**: Lazy loading, passive scroll listeners, will-change optimizations

## Sections

1. **Hero Section** - Navigation, main heading, hero portrait with magnetic effect
2. **Marquee Section** - Scrollable grid of animated GIFs
3. **About Section** - Bio with character-level scroll animation
4. **Services Section** - 5 key services with staggered animations
5. **Projects Section** - 3 showcase cards with sticky stacking effect

## Tech Stack

- **React 18.3.1** - UI framework
- **TypeScript** - Type-safe code
- **Tailwind CSS 3.4.1** - Utility-first styling
- **Framer Motion 12.38.0** - Advanced animations
- **Lucide React 0.344.0** - Icons
- **Vite** - Build tool
- **Google Fonts (Kanit)** - Typography

## Installation

```bash
# Clone or extract the project
cd jack-3d-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs on `http://localhost:5173`

## Project Structure

```
jack-3d-portfolio/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    └── components/
        ├── HeroSection.tsx
        ├── MarqueeSection.tsx
        ├── AboutSection.tsx
        ├── ServicesSection.tsx
        ├── ProjectsSection.tsx
        ├── ContactButton.tsx
        ├── LiveProjectButton.tsx
        ├── FadeIn.tsx
        ├── Magnet.tsx
        └── AnimatedText.tsx
```

## Customization

### Colors
Edit `src/index.css` and `tailwind.config.ts` to change the color scheme.

### Typography
The site uses Google Fonts "Kanit" (weights 300-900). Modify the font in `index.html` to use a different font.

### Content
Update text content in each section component (`src/components/*.tsx`).

### Images
Replace image URLs in the section components:
- Hero portrait in `HeroSection.tsx`
- Marquee GIFs in `MarqueeSection.tsx`
- Decorative images in `AboutSection.tsx`
- Project images in `ProjectsSection.tsx`

## Performance Tips

- Images are lazy-loaded
- Scroll listeners use passive event handling
- CSS animations use `will-change` for performance
- Consider using WebP format for images
- Optimize image sizes before deployment

## Browser Support

Modern browsers with ES2020 support (Chrome, Firefox, Safari, Edge)

## License

MIT

## Created from Prompt

This portfolio was created from a detailed design specification for motionsites.ai

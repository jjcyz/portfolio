# Jessica Zhou Portfolio

A modern, accessible, and performant portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Performance Optimized**: Image optimization, code splitting, lazy loading
- **Accessibility First**: WCAG AA compliant, keyboard navigation, screen reader support
- **SEO Optimized**: Structured data, meta tags, sitemap generation
- **Modern Animations**: Framer Motion micro-interactions
- **Responsive Design**: Mobile-first approach with clean, modern UI
- **Dark Theme**: Beautiful dark theme with purple accent colors

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/jjcyz/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

### Manual Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── sitemap.ts         # Sitemap generation
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── About.tsx          # About section
│   ├── Skills.tsx         # Skills section
│   ├── Projects.tsx       # Projects showcase
│   ├── Experience.tsx     # Experience timeline
│   ├── Contact.tsx        # Contact form
│   └── Footer.tsx         # Footer
├── lib/                   # Utilities and data
│   ├── data.ts            # Portfolio data
│   └── structured-data.ts # SEO structured data
├── types/                 # TypeScript type definitions
│   └── index.ts
├── public/                # Static assets
│   ├── images/            # Project images
│   ├── robots.txt         # SEO robots file
│   └── manifest.json      # PWA manifest
└── styles/                # Additional styles
```

## 🎨 Customization

### Colors
The color scheme is defined in `tailwind.config.js`. The primary color is purple (`#7c3aed`) with a dark theme.

### Content
Update the data in `lib/data.ts` to customize:
- Personal information
- Projects
- Experience
- Skills
- Education

### Styling
Modify `app/globals.css` for global styles and component-specific styles in individual component files.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 📱 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **Code Splitting**: Automatic code splitting and lazy loading
- **Bundle Size**: Optimized bundle with tree shaking

## ♿ Accessibility

- **WCAG AA Compliant**: Meets accessibility standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators
- **Color Contrast**: High contrast ratios for readability

## 🔍 SEO

- **Structured Data**: JSON-LD schema markup
- **Meta Tags**: Comprehensive meta tags and Open Graph
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine optimization
- **Performance**: Fast loading times for better rankings

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/jjcyz/portfolio/issues).

## 📞 Contact

Jessica Zhou - [jess.c.zhou@gmail.com](mailto:jess.c.zhou@gmail.com)

Project Link: [https://github.com/jjcyz/portfolio](https://github.com/jjcyz/portfolio)

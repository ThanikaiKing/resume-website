# 🚀 Resume Website

A modern, accessible, and performant single-page resume website built with Next.js 15, TypeScript, and Tailwind CSS. Features comprehensive accessibility compliance (WCAG AA), excellent performance scores, and a complete CI/CD pipeline.

## ✨ Features

- **🎯 Performance First**: Lighthouse scores ≥95 on all metrics
- **♿ Accessibility**: WCAG AA compliant with comprehensive a11y features
- **📱 Mobile-First**: Responsive design from 360px to 2xl screens
- **🎨 Modern Design**: Beautiful UI with dark/light theme support
- **🔍 SEO Optimized**: Dynamic OG images, structured data, sitemap
- **📝 Data-Driven**: All content managed via JSON configuration
- **🧪 Fully Tested**: Unit, E2E, and visual regression tests
- **🚀 CI/CD Ready**: Automated testing, building, and deployment

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with custom design system
- **UI Components**: shadcn/ui with Radix UI primitives
- **Animations**: Framer Motion with reduced motion support
- **Testing**: Jest, Testing Library, Playwright
- **Deployment**: Vercel with GitHub Actions CI/CD

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd resume-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📝 Content Management

### Edit Your Resume Data

All content is managed through the `/src/content/resume.json` file. Update this single file to change all content across the site.

```json
{
  "name": "Your Name",
  "title": "Your Professional Title",
  "summary": "Your professional summary...",
  "contacts": {
    "email": "your.email@example.com",
    "phone": "+1234567890",
    "location": "Your City, Country",
    "links": [
      {"label": "LinkedIn", "url": "https://linkedin.com/in/yourprofile"},
      {"label": "GitHub", "url": "https://github.com/yourusername"}
    ]
  },
  "skills": {
    "Languages": ["JavaScript", "TypeScript", "Python"],
    "Frameworks": ["React", "Next.js", "Node.js"],
    "Tools": ["Git", "Docker", "AWS"]
  },
  "experience": [
    {
      "company": "Company Name",
      "role": "Your Role",
      "period": "Jan 2020 – Present",
      "highlights": [
        "Achievement with quantifiable impact",
        "Another significant accomplishment"
      ]
    }
  ],
  "education": [
    {
      "degree": "Your Degree",
      "org": "University Name",
      "period": "2016–2020",
      "details": "GPA 3.8/4.0"
    }
  ],
  "meta": {
    "ogTitle": "Your Name — Professional Title",
    "ogDesc": "Brief description for social sharing",
    "keywords": ["keyword1", "keyword2", "keyword3"]
  },
  "settings": {
    "showPhone": true
  }
}
```

### Adding Your Files

1. **Resume PDF**: Add your resume to `/public/resume.pdf`
2. **Transcript**: Add your transcript to `/public/transcript.pdf`
3. **Profile Photo**: Add your photo and update the Hero component

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Contact Form (Formspree)
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id

# SEO & Analytics
GOOGLE_SITE_VERIFICATION=your-google-verification-code

# Optional: Cloudflare Turnstile for spam protection
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=your-turnstile-site-key
CLOUDFLARE_TURNSTILE_SECRET_KEY=your-turnstile-secret-key
```

### Setting Up Services

#### Formspree (Contact Form)
1. Go to [Formspree.io](https://formspree.io)
2. Create a new form
3. Copy the form endpoint to `NEXT_PUBLIC_FORMSPREE_ENDPOINT`

#### Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your domain
3. Copy verification code to `GOOGLE_SITE_VERIFICATION`

#### Cloudflare Turnstile (Optional)
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to Turnstile
3. Create a new site key
4. Add both site key and secret key to environment variables

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy!

3. **Set up GitHub Secrets** (for CI/CD)
   ```bash
   VERCEL_TOKEN=your-vercel-token
   VERCEL_ORG_ID=your-vercel-org-id
   VERCEL_PROJECT_ID=your-vercel-project-id
   ```

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Deploy static files**
   ```bash
   npm run build
   # Upload contents of .next/static/ and public/ to your CDN
   ```

## 🧪 Testing

### Unit Tests
```bash
npm run test              # Run tests once
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Generate coverage report
```

### End-to-End Tests
```bash
npm run test:e2e          # Run Playwright tests
npm run test:e2e:ui       # Run with Playwright UI
npm run test:e2e:headed   # Run in headed mode
```

### Visual Regression Tests
```bash
npm run test:visual       # Run visual regression tests
```

### Performance Audit
```bash
npm run lighthouse        # Run Lighthouse audit
```

## 🎨 Customization

### Design System

The site uses a comprehensive design system defined in `/src/styles/globals.css`:

- **Colors**: Semantic color tokens with dark/light theme support
- **Typography**: Fluid responsive typography with custom fonts
- **Spacing**: Consistent spacing scale
- **Components**: Reusable component patterns

### Tailwind Configuration

Customize the design system in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add your brand colors
      },
      fontFamily: {
        // Add your custom fonts
      }
    }
  }
}
```

### Adding Sections

1. Create a new component in `/src/components/sections/`
2. Add the section data to `/src/content/resume.json`
3. Import and use in `/src/app/page.tsx`
4. Update navigation in `/src/components/layout/site-header.tsx`

## 📈 Performance Optimization

### Current Optimizations

- **Fonts**: Preloaded with display swap
- **Images**: Next.js Image with lazy loading
- **Code Splitting**: Automatic with Next.js
- **Bundle Analysis**: Built-in optimization
- **Critical CSS**: Inlined for faster rendering

### Monitoring

- **Core Web Vitals**: Built-in Next.js analytics
- **Lighthouse CI**: Automated performance testing
- **Bundle Analyzer**: `npm run analyze` (if configured)

## ♿ Accessibility Features

### Implemented Features

- **WCAG AA Compliance**: 4.5:1 color contrast
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects user preferences
- **Touch Targets**: 44px minimum size

### Testing Accessibility

```bash
# Manual testing
npm run dev
# Use keyboard navigation (Tab, Enter, Arrow keys)
# Test with screen reader (NVDA, JAWS, VoiceOver)

# Automated testing
npm run test              # Includes a11y tests
npm run lighthouse        # Includes a11y audit
```

## 🔧 Development Scripts

```bash
# Development
npm run dev               # Start development server
npm run build             # Build for production
npm run start             # Start production server

# Code Quality
npm run lint              # Run ESLint
npm run lint:fix          # Fix ESLint issues
npm run format            # Format with Prettier
npm run format:check      # Check Prettier formatting

# Testing
npm run test              # Unit tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
npm run test:e2e          # E2E tests
npm run test:visual       # Visual regression tests

# Performance
npm run lighthouse        # Lighthouse audit
npm run analyze           # Bundle analysis (if configured)
```

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── api/             # API routes (OG images, sitemap, robots)
│   ├── layout.tsx       # Root layout with providers
│   └── page.tsx         # Homepage
├── components/
│   ├── layout/          # Header, Footer, Navigation
│   ├── sections/        # Hero, About, Experience, etc.
│   ├── ui/              # shadcn/ui components
│   └── providers/       # Theme, context providers
├── content/             # resume.json data
├── lib/                 # Utilities, helpers
├── styles/              # Global CSS, design system
└── types/               # TypeScript definitions

tests/
└── e2e/                 # Playwright tests

.github/
└── workflows/           # CI/CD pipeline
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm run test`
5. Commit changes: `git commit -m "Description"`
6. Push to branch: `git push origin feature-name`
7. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

### Common Issues

**Build Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**TypeScript Errors**
```bash
# Check types
npx tsc --noEmit
```

**Styling Issues**
```bash
# Regenerate Tailwind
npm run build
```

### Getting Help

- 📚 [Next.js Documentation](https://nextjs.org/docs)
- 🎨 [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- ♿ [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- 🧪 [Testing Library Documentation](https://testing-library.com/)

## 🙏 Acknowledgments

- **Design System**: Inspired by modern design principles
- **Accessibility**: Built with inclusive design in mind
- **Performance**: Optimized for Core Web Vitals
- **Testing**: Comprehensive test coverage

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
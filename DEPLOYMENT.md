# 🚀 Deployment Guide

This guide walks you through deploying your resume website to production.

## 📋 Pre-Deployment Checklist

### Content Preparation
- [ ] Update `/src/content/resume.json` with your information
- [ ] Add your resume PDF to `/public/resume.pdf`
- [ ] Add your transcript to `/public/transcript.pdf` (optional)
- [ ] Add profile photo and update Hero component (optional)
- [ ] Test all links and contact information

### Environment Setup
- [ ] Configure environment variables
- [ ] Set up contact form (Formspree)
- [ ] Configure domain and SEO settings
- [ ] Test in both light and dark themes

### Quality Assurance
- [ ] Run `npm run test` - All tests pass
- [ ] Run `npm run test:e2e` - E2E tests pass
- [ ] Run `npm run lighthouse` - Performance ≥95
- [ ] Manual accessibility testing
- [ ] Cross-browser testing

## 🔧 Environment Variables Setup

### Required Variables

Create these environment variables in your deployment platform:

```bash
# Production URL
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Contact form endpoint
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id

# SEO verification
GOOGLE_SITE_VERIFICATION=your-google-verification-code
```

### Optional Variables

```bash
# Cloudflare Turnstile (spam protection)
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=your-site-key
CLOUDFLARE_TURNSTILE_SECRET_KEY=your-secret-key

# Analytics (if using)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 🌐 Vercel Deployment (Recommended)

### Option 1: Automatic Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy: Ready for production"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure environment variables
   - Deploy!

3. **Configure Custom Domain** (Optional)
   - In Vercel dashboard, go to your project
   - Navigate to "Settings" → "Domains"
   - Add your custom domain
   - Update DNS records as instructed

### Option 2: Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_SITE_URL
   vercel env add NEXT_PUBLIC_FORMSPREE_ENDPOINT
   # Add other variables as needed
   ```

## 🚀 Alternative Deployment Options

### Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 20

2. **Environment Variables**
   - Add all required environment variables in Netlify dashboard

3. **Deploy**
   ```bash
   # Option 1: Git-based deployment
   git push origin main

   # Option 2: Manual deployment
   npm run build
   # Upload .next folder via Netlify dashboard
   ```

### AWS Amplify

1. **Connect Repository**
   - Connect your GitHub repository
   - Configure build settings

2. **Build Configuration**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:20-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM node:20-alpine AS runner
   WORKDIR /app
   COPY --from=builder /app/.next ./.next
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/package*.json ./
   RUN npm ci --only=production
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and Deploy**
   ```bash
   docker build -t resume-site .
   docker run -p 3000:3000 resume-site
   ```

## ⚡ Performance Optimization

### Before Deployment

1. **Optimize Images**
   ```bash
   # Ensure all images use next/image
   # Add proper alt text and sizes
   ```

2. **Bundle Analysis**
   ```bash
   npm run build
   # Check for large dependencies
   ```

3. **Performance Testing**
   ```bash
   npm run lighthouse
   # Ensure scores ≥95
   ```

### After Deployment

1. **Core Web Vitals Monitoring**
   - Set up Real User Monitoring (RUM)
   - Monitor Core Web Vitals metrics
   - Set up alerts for performance degradation

2. **CDN Configuration**
   - Ensure static assets are cached
   - Configure appropriate cache headers
   - Use compression (gzip/brotli)

## 🔒 Security Checklist

### Headers and Security

- [ ] Security headers configured (see `vercel.json`)
- [ ] HTTPS enforced
- [ ] Content Security Policy (CSP) configured
- [ ] No sensitive data in client-side code

### Dependencies

```bash
# Check for vulnerabilities
npm audit

# Update dependencies
npm update

# Check for outdated packages
npm outdated
```

## 📊 Monitoring and Analytics

### Performance Monitoring

1. **Vercel Analytics** (Built-in)
   - Automatic Core Web Vitals tracking
   - Real User Monitoring

2. **Google PageSpeed Insights**
   - Regular performance audits
   - Mobile and desktop testing

3. **Lighthouse CI**
   - Automated performance testing
   - Performance budgets

### Error Tracking

1. **Sentry** (Optional)
   ```bash
   npm install @sentry/nextjs
   # Configure error tracking
   ```

2. **Vercel Error Tracking**
   - Built-in error logging
   - Function logs and metrics

## 🔄 CI/CD Pipeline

### GitHub Actions (Already Configured)

The project includes a complete CI/CD pipeline:

- ✅ **Lint & Type Check**: Code quality validation
- ✅ **Unit Tests**: Component and logic testing
- ✅ **E2E Tests**: End-to-end functionality
- ✅ **Build**: Production build verification
- ✅ **Deploy**: Automatic deployment to Vercel

### Required GitHub Secrets

Add these secrets to your GitHub repository:

```bash
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-vercel-org-id
VERCEL_PROJECT_ID=your-vercel-project-id

# Optional
CODECOV_TOKEN=your-codecov-token
SNYK_TOKEN=your-snyk-token
LHCI_GITHUB_APP_TOKEN=your-lighthouse-token
```

## 📱 Post-Deployment Testing

### Manual Testing Checklist

- [ ] **Mobile Responsiveness**: Test on various device sizes
- [ ] **Cross-Browser**: Chrome, Firefox, Safari, Edge
- [ ] **Performance**: Load time, Core Web Vitals
- [ ] **Accessibility**: Screen reader, keyboard navigation
- [ ] **Forms**: Contact form submission and validation
- [ ] **Links**: All internal and external links work
- [ ] **SEO**: Meta tags, structured data, sitemap

### Automated Testing

```bash
# Run full test suite against production
npm run test:e2e -- --base-url=https://your-domain.com
```

## 🔧 Troubleshooting

### Common Issues

**Build Failures**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Environment Variable Issues**
```bash
# Verify variables are set correctly
echo $NEXT_PUBLIC_SITE_URL
```

**Performance Issues**
```bash
# Analyze bundle size
npm run build
# Check for large dependencies
```

### Getting Help

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **GitHub Actions**: [docs.github.com/actions](https://docs.github.com/actions)

## 📈 Scaling and Optimization

### Traffic Growth

1. **CDN Optimization**
   - Vercel Edge Network (automatic)
   - Image optimization (automatic)

2. **Database** (If adding dynamic features)
   - Consider Vercel Storage solutions
   - Implement caching strategies

3. **Monitoring**
   - Set up performance alerts
   - Monitor error rates
   - Track Core Web Vitals

---

**🎉 Congratulations! Your resume website is now live and optimized for performance, accessibility, and SEO!**

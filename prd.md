# Product Requirements Document (PRD)
## Product: Thanikaivelan — Resume Website

### Vision
Create a single-page (multi-section) resume website that looks premium, loads fast on mobile, and clearly communicates Thanikaivelan’s skills and impact.

### Primary User
Recruiters and hiring managers scanning on mobile first; engineers and leaders evaluating deeper on desktop.

### Success Metrics
- Lighthouse: Performance ≥95 (mobile), Accessibility ≥95, Best Practices ≥95, SEO ≥95
- Time-to-content (LCP) < 2.0s on 4G mid-tier device
- Bounce rate reduction via clear CTAs (contact, download resume)

### In-Scope (MVP)
- Sections: Hero, About, Experience, Skills, Education, Contact
- Data-driven content via `/content/resume.json`
- Dark/light theme with a11y-compliant contrast
- Mobile-first responsive design (360px → 2xl)
- Contact form without backend (Formspree)
- SEO: Metadata API, OG image, sitemap, robots, JSON-LD Person

### Out-of-Scope (MVP)
- Blog, CMS, multi-language
- Complex analytics beyond basic pageview (optional later)

### Functional Requirements
1. **Content Model**: Single JSON file typed with TS; site renders only from this data.
2. **Navigation**: Sticky header, skip link, keyboard reachable, mobile drawer.
3. **Hero**: Name, title, summary, primary CTAs (PDF download & contact).
4. **About**: Expanded summary + strengths.
5. **Experience**: Timeline with role, company, period, 3–6 highlights each; impact metrics highlighted.
6. **Skills**: Grouped badges; tooltips/captions on hover/focus.
7. **Education**: Degree, org, period, CGPA.
8. **Contact**: Form (success/error states), direct chips (mailto/tel), spam protection.

### Non-Functional Requirements
- **Performance**: Optimize images; avoid layout shifts; minimal JS; tree-shake and code-split.
- **Accessibility**: WCAG AA contrast; focus rings; semantic landmarks; reduced motion.
- **Security/Privacy**: Hide phone via setting flag; obfuscate email; rate-limit form (service-side).
- **Reliability**: CI with lint/type/test/build; Playwright visual checks at breakpoints.

### Tech Choices
- **Next.js + TypeScript** for structure, SEO, images
- **Tailwind + shadcn/ui** for design system and accessible components
- **Framer Motion** for animation
- **Formspree** for forms
- **Vercel** for hosting

### Risks & Mitigations
- Over-animating → stick to reduced-motion variants; limit to entry/hover.
- Free form service limits → provide mailto fallback.
- Content drift → central JSON; unit tests validate required fields.

### Milestones
- M1 (Day 1): Bootstrap, design system, data model
- M2 (Day 2): Layout + all sections wired to data
- M3 (Day 3): SEO/a11y/perf passes, tests, CI, deploy

### Acceptance Criteria
- Site renders correctly and beautifully at 360, 768, 1024, 1440, 1920 widths without overflow or layout break.
- Lighthouse mobile scores meet targets.
- Keyboard tab order is logical; escape closes mobile drawer; focus is trapped when open.
- JSON change (e.g., new skill) reflects on UI without code edits.

# Contributing to Resume Website

Thank you for your interest in contributing! This document provides guidelines and information for contributors.

## 🚀 Quick Start for Contributors

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/resume-site.git
   cd resume-site
   npm install
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes and Test**
   ```bash
   npm run dev          # Test your changes
   npm run test         # Run unit tests
   npm run test:e2e     # Run E2E tests
   npm run lint         # Check code quality
   ```

4. **Commit and Push**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request**

## 🎯 Development Guidelines

### Code Standards

- **TypeScript**: All code must be properly typed
- **ESLint**: Follow the configured ESLint rules
- **Prettier**: Code must be formatted with Prettier
- **Accessibility**: Maintain WCAG AA compliance
- **Performance**: Keep Lighthouse scores ≥95

### Component Guidelines

1. **File Structure**
   ```typescript
   // MyComponent.tsx
   "use client"; // Only if needed
   
   import { ComponentProps } from 'react';
   import { cn } from '@/lib/utils';
   
   interface MyComponentProps {
     // Props with proper types
   }
   
   export function MyComponent({ ...props }: MyComponentProps) {
     // Implementation
   }
   ```

2. **Styling**
   - Use Tailwind CSS classes
   - Follow the design system patterns
   - Ensure responsive design (360px → 2xl)
   - Test in both light and dark themes

3. **Accessibility**
   - Include proper ARIA attributes
   - Ensure keyboard navigation
   - Meet contrast requirements
   - Test with screen readers

### Testing Requirements

- **Unit Tests**: Test component behavior and accessibility
- **E2E Tests**: Test user flows and interactions
- **Visual Tests**: Prevent visual regressions
- **Performance**: Maintain performance benchmarks

```bash
# Run all tests before submitting
npm run test:coverage  # Should maintain >80% coverage
npm run test:e2e       # All E2E tests should pass
npm run test:visual    # No visual regressions
npm run lighthouse     # Performance scores ≥95
```

## 🧪 Testing Guidelines

### Unit Tests (Jest + Testing Library)

```typescript
// Component.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('renders with proper accessibility attributes', () => {
    render(<MyComponent />)
    
    const component = screen.getByRole('button')
    expect(component).toBeInTheDocument()
    expect(component).toHaveAttribute('aria-label', 'Expected label')
  })
  
  it('handles keyboard interaction', async () => {
    const user = userEvent.setup()
    render(<MyComponent />)
    
    const button = screen.getByRole('button')
    await user.tab()
    expect(button).toHaveFocus()
  })
})
```

### E2E Tests (Playwright)

```typescript
// feature.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Feature', () => {
  test('works on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 })
    await page.goto('/')
    
    // Test mobile-specific behavior
    await expect(page.getByRole('button')).toBeVisible()
  })
})
```

## 🎨 Design System

### Colors

Follow the semantic color system defined in `globals.css`:

```css
/* Use semantic tokens */
.my-component {
  background: var(--background);
  color: var(--foreground);
  border: 1px solid var(--border);
}
```

### Typography

Use the fluid typography system:

```jsx
<h1 className="fluid-h1">Main Heading</h1>
<h2 className="fluid-h2">Section Heading</h2>
<p className="text-base">Body text</p>
```

### Spacing

Follow the consistent spacing scale:

```jsx
<div className="p-4 mb-6 space-y-8">
  {/* Content */}
</div>
```

## 📝 Commit Guidelines

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(contact): add form validation
fix(header): resolve mobile menu focus trap
docs(readme): update deployment instructions
test(hero): add accessibility tests
style(global): update color contrast ratios
```

## 🔧 Tools and Scripts

### Development

```bash
npm run dev              # Development server
npm run build            # Production build
npm run start            # Production server
```

### Code Quality

```bash
npm run lint             # ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Prettier formatting
npm run format:check     # Check formatting
```

### Testing

```bash
npm run test             # Unit tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
npm run test:e2e         # E2E tests
npm run test:visual      # Visual regression
```

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Exact steps to trigger the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: Browser, OS, screen size
6. **Screenshots**: Visual evidence if applicable

### Bug Report Template

```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- Browser: Chrome 118
- OS: macOS Sonoma
- Screen size: 1440x900
- Device: Desktop

## Screenshots
If applicable, add screenshots
```

## ✨ Feature Requests

For feature requests, please include:

1. **Use Case**: Why is this feature needed?
2. **Description**: What should the feature do?
3. **Acceptance Criteria**: How do we know it's complete?
4. **Mockups**: Visual representation if applicable

## 🎯 Pull Request Guidelines

### Before Submitting

- [ ] Tests pass (`npm run test`)
- [ ] E2E tests pass (`npm run test:e2e`)
- [ ] Linting passes (`npm run lint`)
- [ ] TypeScript compiles (`npx tsc --noEmit`)
- [ ] Performance maintained (`npm run lighthouse`)
- [ ] Accessibility preserved (manual testing)

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed
- [ ] Accessibility tested

## Screenshots
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors
```

## 🌟 Recognition

Contributors will be recognized in:

- GitHub contributors list
- README acknowledgments
- Release notes for significant contributions

## 📞 Getting Help

- **Documentation**: Check README.md first
- **Issues**: Search existing issues before creating new ones
- **Discussions**: Use GitHub Discussions for questions
- **Code Review**: All PRs receive thorough review

## 📜 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/). By participating, you agree to uphold this code.

---

Thank you for contributing to make this resume website better! 🚀

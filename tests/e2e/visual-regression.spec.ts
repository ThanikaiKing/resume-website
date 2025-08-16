import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    // Wait for any animations to complete
    await page.waitForTimeout(1000);
  });

  test('Homepage - Full page screenshot', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    
    // Scroll to top to ensure consistent starting position
    await page.evaluate(() => window.scrollTo(0, 0));
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot(`homepage-${projectName.toLowerCase().replace(/\s+/g, '-')}.png`, {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('Header navigation - Above fold', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    
    // Focus on header area
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Take screenshot of header
    await expect(header).toHaveScreenshot(`header-${projectName.toLowerCase().replace(/\s+/g, '-')}.png`, {
      animations: 'disabled',
    });
  });

  test('Hero section - Above fold', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    
    // Take viewport screenshot to capture above-the-fold content
    await expect(page).toHaveScreenshot(`hero-section-${projectName.toLowerCase().replace(/\s+/g, '-')}.png`, {
      animations: 'disabled',
      clip: { x: 0, y: 0, width: 1920, height: 800 }, // Adjust height based on viewport
    });
  });

  test('About section - Layout', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    
    // Scroll to about section
    await page.locator('#about').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Take screenshot of about section
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toHaveScreenshot(`about-section-${projectName.toLowerCase().replace(/\s+/g, '-')}.png`, {
      animations: 'disabled',
    });
  });

  test('Experience section - Timeline layout', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    
    // Scroll to experience section
    await page.locator('#experience').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Take screenshot of experience section
    const experienceSection = page.locator('#experience');
    await expect(experienceSection).toHaveScreenshot(`experience-section-${projectName.toLowerCase().replace(/\s+/g, '-')}.png`, {
      animations: 'disabled',
    });
  });

  test('Skills section - Grid layout', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    
    // Scroll to skills section
    await page.locator('#skills').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Take screenshot of skills section
    const skillsSection = page.locator('#skills');
    await expect(skillsSection).toHaveScreenshot(`skills-section-${projectName.toLowerCase().replace(/\s+/g, '-')}.png`, {
      animations: 'disabled',
    });
  });

  test('Contact section - Form layout', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    
    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Take screenshot of contact section
    const contactSection = page.locator('#contact');
    await expect(contactSection).toHaveScreenshot(`contact-section-${projectName.toLowerCase().replace(/\s+/g, '-')}.png`, {
      animations: 'disabled',
    });
  });

  test('Footer - Layout', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    
    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Take screenshot of footer
    const footer = page.locator('footer');
    await expect(footer).toHaveScreenshot(`footer-${projectName.toLowerCase().replace(/\s+/g, '-')}.png`, {
      animations: 'disabled',
    });
  });
});

test.describe('Mobile Navigation Tests', () => {
  test('Mobile menu - Open state', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    
    // Only run on mobile viewports
    if (!projectName.includes('360px')) {
      test.skip();
    }
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Open mobile menu
    const menuButton = page.getByRole('button', { name: 'Open navigation menu' });
    await menuButton.click();
    
    // Wait for menu animation
    await page.waitForTimeout(500);
    
    // Take screenshot of open mobile menu
    await expect(page).toHaveScreenshot(`mobile-menu-open-${projectName.toLowerCase().replace(/\s+/g, '-')}.png`, {
      animations: 'disabled',
    });
  });
});

test.describe('Dark Mode Tests', () => {
  test('Dark mode - Homepage', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Switch to dark mode
    const themeToggle = page.getByRole('button').filter({ hasText: /theme/i }).first();
    await themeToggle.click();
    
    // Wait for theme transition
    await page.waitForTimeout(1000);
    
    // Take screenshot in dark mode
    await expect(page).toHaveScreenshot(`homepage-dark-${projectName.toLowerCase().replace(/\s+/g, '-')}.png`, {
      fullPage: true,
      animations: 'disabled',
    });
  });
});

test.describe('Accessibility Tests', () => {
  test('Focus states - Navigation', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Tab through navigation items and capture focus states
    await page.keyboard.press('Tab'); // Skip to content link
    await page.keyboard.press('Tab'); // Logo/name
    await page.keyboard.press('Tab'); // First nav item
    
    // Take screenshot showing focus state
    await expect(page).toHaveScreenshot(`focus-navigation-${projectName.toLowerCase().replace(/\s+/g, '-')}.png`, {
      animations: 'disabled',
    });
  });

  test('High contrast mode simulation', async ({ page }, testInfo) => {
    const projectName = testInfo.project.name;
    
    // Only test on one viewport to avoid too many screenshots
    if (!projectName.includes('1024px')) {
      test.skip();
    }
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Simulate high contrast mode with CSS
    await page.addStyleTag({
      content: `
        @media (prefers-contrast: high) {
          * {
            border-color: CanvasText !important;
          }
        }
        
        /* Force high contrast styles for testing */
        body {
          filter: contrast(2) !important;
        }
      `
    });
    
    await page.waitForTimeout(500);
    
    // Take screenshot of high contrast mode
    await expect(page).toHaveScreenshot(`high-contrast-${projectName.toLowerCase().replace(/\s+/g, '-')}.png`, {
      fullPage: true,
      animations: 'disabled',
    });
  });
});

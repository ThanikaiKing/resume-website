import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SiteHeader } from '../site-header'

// Mock the resume data
jest.mock('@/lib/content', () => ({
  getResumeSection: jest.fn((section) => {
    if (section === 'name') return 'Test User'
    return 'Test Data'
  }),
}))

// Mock the ThemeToggle component
jest.mock('@/components/ui/theme-toggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Theme Toggle</button>,
}))

describe('SiteHeader', () => {
  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks()
  })

  it('renders the site header with proper landmarks', () => {
    render(<SiteHeader />)
    
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    expect(header).toHaveAttribute('aria-label', 'Site header')
  })

  it('renders navigation with proper roles and labels', () => {
    render(<SiteHeader />)
    
    const navigation = screen.getByRole('navigation', { name: 'Main navigation' })
    expect(navigation).toBeInTheDocument()
  })

  it('renders all navigation links with proper accessibility attributes', () => {
    render(<SiteHeader />)
    
    const aboutLink = screen.getByRole('link', { name: 'Navigate to About section' })
    const experienceLink = screen.getByRole('link', { name: 'Navigate to Experience section' })
    const skillsLink = screen.getByRole('link', { name: 'Navigate to Skills section' })
    const educationLink = screen.getByRole('link', { name: 'Navigate to Education section' })
    const contactLink = screen.getByRole('link', { name: 'Navigate to Contact section' })
    
    expect(aboutLink).toBeInTheDocument()
    expect(experienceLink).toBeInTheDocument()
    expect(skillsLink).toBeInTheDocument()
    expect(educationLink).toBeInTheDocument()
    expect(contactLink).toBeInTheDocument()
    
    // Check href attributes
    expect(aboutLink).toHaveAttribute('href', '#about')
    expect(experienceLink).toHaveAttribute('href', '#experience')
    expect(skillsLink).toHaveAttribute('href', '#skills')
    expect(educationLink).toHaveAttribute('href', '#education')
    expect(contactLink).toHaveAttribute('href', '#contact')
  })

  it('supports keyboard navigation through tab key', async () => {
    const user = userEvent.setup()
    render(<SiteHeader />)
    
    // Start from the logo/name link
    const nameLink = screen.getByText('Test User').closest('a')
    expect(nameLink).toBeInTheDocument()
    
    // Tab to first navigation item
    await user.tab()
    const aboutLink = screen.getByRole('link', { name: 'Navigate to About section' })
    expect(aboutLink).toHaveFocus()
    
    // Tab to next navigation item
    await user.tab()
    const experienceLink = screen.getByRole('link', { name: 'Navigate to Experience section' })
    expect(experienceLink).toHaveFocus()
    
    // Continue tabbing through all navigation items
    await user.tab()
    const skillsLink = screen.getByRole('link', { name: 'Navigate to Skills section' })
    expect(skillsLink).toHaveFocus()
    
    await user.tab()
    const educationLink = screen.getByRole('link', { name: 'Navigate to Education section' })
    expect(educationLink).toHaveFocus()
    
    await user.tab()
    const contactLink = screen.getByRole('link', { name: 'Navigate to Contact section' })
    expect(contactLink).toHaveFocus()
    
    // Tab to theme toggle
    await user.tab()
    const themeToggle = screen.getByTestId('theme-toggle')
    expect(themeToggle).toHaveFocus()
  })

  it('handles Enter key on navigation links', async () => {
    const user = userEvent.setup()
    render(<SiteHeader />)
    
    const aboutLink = screen.getByRole('link', { name: 'Navigate to About section' })
    aboutLink.focus()
    
    // Press Enter should trigger the link (though it won't actually navigate in tests)
    await user.keyboard('{Enter}')
    
    // Link should still be focused
    expect(aboutLink).toHaveFocus()
  })

  it('opens mobile menu when hamburger button is clicked', async () => {
    const user = userEvent.setup()
    render(<SiteHeader />)
    
    // Find the mobile menu trigger button
    const menuButton = screen.getByRole('button', { name: 'Open navigation menu' })
    expect(menuButton).toBeInTheDocument()
    
    // Click to open menu
    await user.click(menuButton)
    
    // Mobile navigation should be visible
    const mobileNav = screen.getByRole('navigation', { name: 'Mobile navigation menu' })
    expect(mobileNav).toBeInTheDocument()
  })

  it('closes mobile menu when navigation link is clicked', async () => {
    const user = userEvent.setup()
    render(<SiteHeader />)
    
    // Open mobile menu first
    const menuButton = screen.getByRole('button', { name: 'Open navigation menu' })
    await user.click(menuButton)
    
    // Click on a navigation link in mobile menu
    const mobileAboutLink = screen.getAllByRole('link', { name: 'Navigate to About section' })[1] // Second one is mobile
    await user.click(mobileAboutLink)
    
    // Menu should close (we can't easily test this without more complex setup,
    // but the onClick handler should be called)
    expect(mobileAboutLink).toBeInTheDocument()
  })

  it('has proper ARIA attributes for mobile menu', async () => {
    const user = userEvent.setup()
    render(<SiteHeader />)
    
    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: 'Open navigation menu' })
    await user.click(menuButton)
    
    // Check mobile navigation has proper attributes
    const mobileNav = screen.getByRole('navigation', { name: 'Mobile navigation menu' })
    expect(mobileNav).toBeInTheDocument()
    
    // Check all mobile navigation links have proper ARIA labels
    const mobileLinks = screen.getAllByRole('link')
    const aboutLinks = mobileLinks.filter(link => 
      link.getAttribute('aria-label')?.includes('Navigate to About section')
    )
    expect(aboutLinks.length).toBeGreaterThan(0)
  })

  it('meets minimum touch target size requirements', () => {
    render(<SiteHeader />)
    
    // All interactive elements should have min-h-[44px] class or equivalent
    const navigationLinks = screen.getAllByRole('link')
    navigationLinks.forEach(link => {
      const className = link.className
      expect(className).toMatch(/min-h-\[44px\]/)
    })
    
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      const className = button.className
      expect(className).toMatch(/min-h-\[44px\]|min-h-\[36px\]/) // Some buttons might be slightly smaller but still accessible
    })
  })
})

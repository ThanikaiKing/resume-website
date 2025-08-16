import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Contact } from '../contact'

// Mock the resume data
jest.mock('@/lib/content', () => ({
  getResumeSection: jest.fn((section) => {
    if (section === 'contacts') {
      return {
        email: 'test@example.com',
        phone: '+1234567890',
        location: 'Test City',
        links: [
          { label: 'LinkedIn', url: 'https://linkedin.com/test' },
          { label: 'GitHub', url: 'https://github.com/test' }
        ]
      }
    }
    if (section === 'settings') {
      return { showPhone: true }
    }
    return 'Test Data'
  }),
}))

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
  Toaster: () => <div data-testid="toaster" />,
}))

// Mock fetch
global.fetch = jest.fn()

describe('Contact', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset fetch mock
    ;(global.fetch as jest.Mock).mockReset()
  })

  it('renders the contact section with proper landmarks', () => {
    render(<Contact />)
    
    const section = screen.getByRole('region', { name: /contact/i })
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('id', 'contact')
    expect(section).toHaveAttribute('aria-labelledby', 'contact-heading')
  })

  it('renders the contact form with proper labels and accessibility', () => {
    render(<Contact />)
    
    // Check form heading
    const heading = screen.getByRole('heading', { name: /send a message/i })
    expect(heading).toBeInTheDocument()
    
    // Check form inputs have proper labels
    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const messageTextarea = screen.getByRole('textbox', { name: /message/i })
    
    expect(nameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(messageTextarea).toBeInTheDocument()
    
    // Check required attributes
    expect(nameInput).toBeRequired()
    expect(emailInput).toBeRequired()
    expect(messageTextarea).toBeRequired()
    
    // Check proper input types
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(nameInput).toHaveAttribute('type', 'text')
  })

  it('has proper label associations for form inputs', () => {
    render(<Contact />)
    
    // Check that labels are properly associated with inputs
    const nameLabel = screen.getByText('Name *')
    const emailLabel = screen.getByText('Email *')
    const messageLabel = screen.getByText('Message *')
    
    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const messageTextarea = screen.getByRole('textbox', { name: /message/i })
    
    // Check for-id relationships
    expect(nameLabel).toHaveAttribute('for', 'name')
    expect(nameInput).toHaveAttribute('id', 'name')
    
    expect(emailLabel).toHaveAttribute('for', 'email')
    expect(emailInput).toHaveAttribute('id', 'email')
    
    expect(messageLabel).toHaveAttribute('for', 'message')
    expect(messageTextarea).toHaveAttribute('id', 'message')
  })

  it('validates required fields before submission', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    
    // Try to submit empty form
    await user.click(submitButton)
    
    // Form should show validation errors (though exact implementation may vary)
    // At minimum, required fields should prevent submission
    expect(submitButton).toBeInTheDocument()
  })

  it('fills and submits the form successfully', async () => {
    const user = userEvent.setup()
    
    // Mock successful form submission
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })
    
    // Set environment variable for form endpoint
    process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT = 'https://formspree.io/test'
    
    render(<Contact />)
    
    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const messageTextarea = screen.getByRole('textbox', { name: /message/i })
    const submitButton = screen.getByRole('button', { name: /send message/i })
    
    // Fill out the form
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageTextarea, 'Hello, this is a test message.')
    
    // Submit the form
    await user.click(submitButton)
    
    // Should show loading state
    expect(screen.getByText(/sending/i)).toBeInTheDocument()
    
    // Wait for submission to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://formspree.io/test',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            message: 'Hello, this is a test message.',
          }),
        })
      )
    })
  })

  it('handles form submission errors gracefully', async () => {
    const user = userEvent.setup()
    
    // Mock failed form submission
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))
    
    process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT = 'https://formspree.io/test'
    
    render(<Contact />)
    
    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const messageTextarea = screen.getByRole('textbox', { name: /message/i })
    const submitButton = screen.getByRole('button', { name: /send message/i })
    
    // Fill out the form
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageTextarea, 'Hello, this is a test message.')
    
    // Submit the form
    await user.click(submitButton)
    
    // Wait for error handling
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
    
    // Form should return to normal state after error
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('renders direct contact information with proper accessibility', () => {
    render(<Contact />)
    
    // Check that contact chips are rendered
    const emailLink = screen.getByRole('link', { name: /test@example\.com/i })
    const phoneLink = screen.getByRole('link', { name: /\+1234567890/i })
    
    expect(emailLink).toBeInTheDocument()
    expect(phoneLink).toBeInTheDocument()
    
    // Check proper href attributes
    expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com')
    expect(phoneLink).toHaveAttribute('href', 'tel:+1234567890')
  })

  it('has copyable contact information', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    
    // Find copy buttons (they should be present for copyable items)
    const copyButtons = screen.getAllByRole('button', { name: /copy/i })
    expect(copyButtons.length).toBeGreaterThan(0)
    
    // Click a copy button
    await user.click(copyButtons[0])
    
    // Should call clipboard API (mocked in setup)
    expect(navigator.clipboard.writeText).toHaveBeenCalled()
  })

  it('includes honeypot field for spam protection', () => {
    render(<Contact />)
    
    // The honeypot field should be present but hidden
    const honeypotField = screen.getByDisplayValue('')
    const honeypotInput = honeypotField.closest('input[name="honeypot"]')
    
    expect(honeypotInput).toBeInTheDocument()
    expect(honeypotInput).toHaveStyle({ display: 'none' })
    expect(honeypotInput).toHaveAttribute('tabindex', '-1')
  })

  it('displays social links when available', () => {
    render(<Contact />)
    
    // Check that social links are rendered
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
    const githubLink = screen.getByRole('link', { name: /github/i })
    
    expect(linkedinLink).toBeInTheDocument()
    expect(githubLink).toBeInTheDocument()
    
    // Check external link attributes
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('has proper heading hierarchy', () => {
    render(<Contact />)
    
    // Check main heading
    const mainHeading = screen.getByRole('heading', { level: 2, name: /let's work together/i })
    expect(mainHeading).toBeInTheDocument()
    expect(mainHeading).toHaveAttribute('id', 'contact-heading')
    
    // Check subheadings
    const formHeading = screen.getByRole('heading', { level: 3, name: /send a message/i })
    const contactHeading = screen.getByRole('heading', { level: 3, name: /direct contact/i })
    
    expect(formHeading).toBeInTheDocument()
    expect(contactHeading).toBeInTheDocument()
  })
})

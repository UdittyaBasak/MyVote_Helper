import { render, screen } from '@testing-library/react'
import Navigation from '../Navigation'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('Navigation Component', () => {
  it('renders navigation links when logged in', () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'Test User' } },
      status: 'authenticated',
    })
    ;(usePathname as jest.Mock).mockReturnValue('/general-info')

    render(<Navigation />)

    expect(screen.getByText('Ask AI')).toBeInTheDocument()
    expect(screen.getByText('General Info')).toBeInTheDocument()
    expect(screen.getByText('Essentials')).toBeInTheDocument()
  })

  it('renders Sign In button when logged out', () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    })
    ;(usePathname as jest.Mock).mockReturnValue('/')

    render(<Navigation />)

    // Note: The Navigation component hides on the homepage ('/') per your current logic
    // So we test it on a different page while logged out
    ;(usePathname as jest.Mock).mockReturnValue('/login')
    render(<Navigation />)
    
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })
})

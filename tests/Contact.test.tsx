import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '../src/pages/Contact';
import { AppRoutes } from '../src/lib/common/AppRoutes';

describe('Contact page', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the main title and correct CSS classes', () => {
    const { container } = render(<Contact />);
    expect(screen.getByText(AppRoutes.CONTACT.title)).toBeInTheDocument();
    expect(screen.getByText('Get in touch')).toBeInTheDocument();
    const form = container.querySelector('form');
    expect(form).toHaveClass('contact-form');
    expect(screen.getByText("Send message")).toBeInTheDocument();
  });

  it('submits the contact form and shows success message', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ ok: true })
      })
    ) as jest.Mock;
    render(<Contact />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there!' } });
    fireEvent.click(screen.getByText('Send message'));
    await waitFor(() => {
      expect(screen.getByText("Thanks! We'll get back to you.")).toBeInTheDocument();
    });
  });

  it('shows error message on empty name', async () => {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there!' } });
    fireEvent.click(screen.getByText('Send message'));
    await waitFor(() => {
      expect(screen.getByText("Required fields missing.")).toBeInTheDocument();
    });
  });

  it('shows error message on empty email', async () => {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there!' } });
    fireEvent.click(screen.getByText('Send message'));
    await waitFor(() => {
      expect(screen.getByText("Required fields missing.")).toBeInTheDocument();
    });
  });

  it('shows error message on empty message', async () => {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: '' } });
    fireEvent.click(screen.getByText('Send message'));
    await waitFor(() => {
      expect(screen.getByText("Required fields missing.")).toBeInTheDocument();
    });
  });

  it('shows error message on invalid email', async () => {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there!' } });
    fireEvent.click(screen.getByText('Send message'));
    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email.")).toBeInTheDocument();
    });
  });

  it('shows error message on failure', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ ok: false })
      })
    ) as jest.Mock;
    const { container } = render(<Contact />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there!' } });
    fireEvent.click(screen.getByText('Send message'));
    await waitFor(() => {
      const errorElement = container.querySelector('.hint.error');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent("Failed to send");
    });
  });
});

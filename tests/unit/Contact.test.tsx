import '@testing-library/jest-dom';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '../../src/pages/Contact';
import { AppRoutes } from '../../src/lib/common/AppRoutes';
import { server } from '../../src/mocks/server-test';
import { http, HttpResponse } from 'msw';
import { renderWithLoadingProvider } from './utils/renderWithProviders';

describe('Contact page', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the main title and correct CSS classes', () => {
    const { container } = renderWithLoadingProvider(<Contact />);
    expect(screen.getByText(AppRoutes.CONTACT.title)).toBeInTheDocument();
    const form = container.querySelector('form');
    expect(form).toHaveClass('contact-form');
    expect(screen.getByText("Send")).toBeInTheDocument();
  });

  it('submits the contact form and shows success message', async () => {
    const { container } = renderWithLoadingProvider(<Contact />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there!' } });
    fireEvent.click(screen.getByText('Send'));
    await waitFor(() => {
      const successElement = container.querySelector('.hint.success');
      expect(successElement).toBeInTheDocument();
      expect(successElement).toHaveTextContent("Thanks! We'll get back to you.");
    });
  });

  it('shows error message on empty name', async () => {
    const { container } = renderWithLoadingProvider(<Contact />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there!' } });
    fireEvent.click(screen.getByText('Send'));
    await waitFor(() => {
      const errorElement = container.querySelector('.hint.error');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent("Required fields missing.");
    });
  });

  it('shows error message on empty email', async () => {
    const { container } = renderWithLoadingProvider(<Contact />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there!' } });
    fireEvent.click(screen.getByText('Send'));
    await waitFor(() => {
      const errorElement = container.querySelector('.hint.error');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent("Required fields missing.");
    });
  });

  it('shows error message on empty message', async () => {
    const { container } = renderWithLoadingProvider(<Contact />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: '' } });
    fireEvent.click(screen.getByText('Send'));
    await waitFor(() => {
      const errorElement = container.querySelector('.hint.error');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent("Required fields missing.");
    });
  });

  it('shows error message on invalid email', async () => {
    const { container } = renderWithLoadingProvider(<Contact />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there!' } });
    fireEvent.click(screen.getByText('Send'));
    await waitFor(() => {
      const errorElement = container.querySelector('.hint.error');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent("Please enter a valid email.");
    });
  });

  it('shows error message on failure', async () => {
    server.use(
      http.post("/api/contact", () => {
        return HttpResponse.json({ ok: false, message: "Forced failure" });
      })
    );
    const { container } = renderWithLoadingProvider(<Contact />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there!' } });
    fireEvent.click(screen.getByText('Send'));
    await waitFor(() => {
      const errorElement = container.querySelector('.hint.error');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent("Failed to send");
    });
  });

  it('tests honeypot', async () => {
    // Even though the api returns false, we see still see a success message since the honeypot field is filled
    server.use(
      http.post("/api/contact", () => {
        return HttpResponse.json({ ok: false, message: "Forced failure" });
      })
    );
    const { container } = renderWithLoadingProvider(<Contact />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there!' } });
    fireEvent.change(screen.getByLabelText(/Company/i), { target: { value: 'Any Value' } });
    fireEvent.click(screen.getByText('Send'));
    await waitFor(() => {
      const successElement = container.querySelector('.hint.success');
      expect(successElement).toBeInTheDocument();
      expect(successElement).toHaveTextContent("Thanks! We'll get back to you.");
    });
  });
});

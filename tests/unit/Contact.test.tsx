import '@testing-library/jest-dom';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '../../src/pages/Contact';
import { AppRoutes } from '../../src/lib/common/AppRoutes';
import { server } from '../../src/mocks/server-test';
import { http, HttpResponse } from 'msw';
import { renderWithToastProvider } from './utils/renderWithProviders';

describe('Contact page', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the main title and correct CSS classes', () => {
    const { container } = renderWithToastProvider(<Contact />);
    expect(screen.getByText(AppRoutes.CONTACT.title)).toBeInTheDocument();
    const form = container.querySelector('form');
    expect(form).toHaveClass('contact-form');
    expect(screen.getByText("Send")).toBeInTheDocument();
  });

  it('submits the contact form and shows success toast', async () => {
    renderWithToastProvider(<Contact />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there!' } });
    fireEvent.click(screen.getByText('Send'));
    await waitFor(() => {
      expect(screen.getByText("Thanks! We'll get back to you.")).toBeInTheDocument();
    });
  });

  it('shows error toast on empty name', async () => {
    renderWithToastProvider(<Contact />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there!' } });
    fireEvent.click(screen.getByText('Send'));
    await waitFor(() => {
      expect(screen.getByText("Required fields missing.")).toBeInTheDocument();
    });
  });

  it('shows error toast on empty email', async () => {
    renderWithToastProvider(<Contact />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there!' } });
    fireEvent.click(screen.getByText('Send'));
    await waitFor(() => {
      expect(screen.getByText("Required fields missing.")).toBeInTheDocument();
    });
  });

  it('shows error toast on empty message', async () => {
    renderWithToastProvider(<Contact />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: '' } });
    fireEvent.click(screen.getByText('Send'));
    await waitFor(() => {
      expect(screen.getByText("Required fields missing.")).toBeInTheDocument();
    });
  });

  it('shows error toast on invalid email', async () => {
    renderWithToastProvider(<Contact />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there!' } });
    fireEvent.click(screen.getByText('Send'));
    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email.")).toBeInTheDocument();
    });
  });

  it('shows error toast on failure', async () => {
    server.use(
      http.post("/api/contact", () => {
        return HttpResponse.json({ ok: false, message: "Forced failure" });
      })
    );
    renderWithToastProvider(<Contact />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there!' } });
    fireEvent.click(screen.getByText('Send'));
    await waitFor(() => {
      expect(screen.getByText("Failed to send")).toBeInTheDocument();
    });
  });

  it('tests honeypot with success toast', async () => {
    // Even though the api returns false, we see still see a success message since the honeypot field is filled
    server.use(
      http.post("/api/contact", () => {
        return HttpResponse.json({ ok: false, message: "Forced failure" });
      })
    );
    renderWithToastProvider(<Contact />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there!' } });
    fireEvent.change(screen.getByLabelText(/Company/i), { target: { value: 'Any Value' } });
    fireEvent.click(screen.getByText('Send'));
    await waitFor(() => {
      expect(screen.getByText("Thanks! We'll get back to you.")).toBeInTheDocument();
    });
  });
});

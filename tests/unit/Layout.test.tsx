import App from '../../src/App';
import userEvent from '@testing-library/user-event';
import { screen, fireEvent } from '@testing-library/react';
import { AppRoutes } from '../../src/lib/common/AppRoutes';
import { renderWithLoadingProvider, renderLayoutWithProviders } from './utils/renderWithProviders';

describe('Layout components', () => {
  it('renders navigation', () => {
    renderWithLoadingProvider(<App />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders navigation sub menu', async () => {
    renderWithLoadingProvider(<App />);
    const orientationLink = screen.getByRole('link', { name: /orientation/i });
    fireEvent.mouseEnter(orientationLink);
    const vision = screen.getByRole('link', { name: /vision/i });
    expect(vision).toBeInTheDocument();
  });

  it('renders footer', () => {
    renderWithLoadingProvider(<App />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});

describe("Navigation", () => {
  it("renders Contact page directly when initial path is /contact", () => {
    renderLayoutWithProviders("/contact");
    expect(
      screen.getByRole("heading", { level: 1, name: AppRoutes.CONTACT.title })
    ).toBeInTheDocument();
  });

  it("renders Vision page directly when initial path is /orientation/vision", () => {
    renderLayoutWithProviders("/orientation/vision");
    expect(
      screen.getByRole("heading", { level: 1, name: AppRoutes.VISION.title })
    ).toBeInTheDocument();
  });
});


describe('Theme toggle button', () => {
  it('toggles between dark and light theme', async () => {
    renderWithLoadingProvider(<App />);
    // Initially, theme should be dark
    expect(document.documentElement).toHaveClass('theme-dark');
    // Click theme toggle button
    const themeButton = screen.getByRole('button', { name: /switch to light theme/i });
    await userEvent.click(themeButton);
    expect(document.documentElement).toHaveClass('theme-light');
    // Click again to switch back to dark
    const themeButtonDark = screen.getByRole('button', { name: /switch to dark theme/i });
    await userEvent.click(themeButtonDark);
    expect(document.documentElement).toHaveClass('theme-dark');
  });
});

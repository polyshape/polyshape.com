import App from '../../src/App';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import {AppRoutes} from '../../src/lib/common/AppRoutes';
import { renderWithLoadingProvider } from './utils/renderWithProviders';

describe('Layout components', () => {
  it('renders navigation', () => {
    renderWithLoadingProvider(<App />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders footer', () => {
    renderWithLoadingProvider(<App />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});

describe('Navigation', () => {
  it('navigates to Contact page when Contact link is clicked', async () => {
    renderWithLoadingProvider(<App />);
    const contactLink = screen.getByRole('link', { name: /contact/i });
    await userEvent.click(contactLink);
    const contactTitle = screen.getByRole('heading', { level: 1, name: AppRoutes.CONTACT.title });
    expect(contactTitle).toBeInTheDocument();
  });
  
  it('navigates to Vision page via menu', async () => {
    renderWithLoadingProvider(<App />);
    // Get all Orientation links and click the first one
    const orientationLinks = screen.getAllByRole('link', { name: /orientation/i });
    await userEvent.click(orientationLinks[0]);
    // Click the Vision submenu link
    const statementLink = screen.getByRole('link', { name: /vision/i });
    await userEvent.click(statementLink);
    // Assert Vision page content is rendered
    const statementTitle = screen.getByRole('heading', { level: 1, name: AppRoutes.VISION.title });
    expect(statementTitle).toBeInTheDocument();
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

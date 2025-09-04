import App from '../../src/App';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import {AppRoutes} from '../../src/lib/common/AppRoutes';
import { renderWithProviders } from './utils/renderWithProviders';

describe('Layout components', () => {
  it('renders navigation', () => {
    renderWithProviders(<App />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders footer', () => {
    renderWithProviders(<App />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});

describe('Navigation', () => {
  it('navigates to Contact page when Contact link is clicked', async () => {
    renderWithProviders(<App />);
    const contactLink = screen.getByRole('link', { name: /contact/i });
    await userEvent.click(contactLink);
    const contactTitle = screen.getByRole('heading', { level: 1, name: AppRoutes.CONTACT.title });
    expect(contactTitle).toBeInTheDocument();
  });
  
  it('navigates to Mission Statement page via menu', async () => {
    renderWithProviders(<App />);
    // Get all Mission links and click the first one
    const missionLinks = screen.getAllByRole('link', { name: /mission/i });
    await userEvent.click(missionLinks[0]);
    // Click the Mission Statement submenu link
    const statementLink = screen.getByRole('link', { name: /mission statement/i });
    await userEvent.click(statementLink);
    // Assert Mission Statement page content is rendered
    const statementTitle = screen.getByRole('heading', { level: 1, name: AppRoutes.STATEMENT.title });
    expect(statementTitle).toBeInTheDocument();
  });
});

describe('Theme toggle button', () => {
  it('toggles between dark and light theme', async () => {
    renderWithProviders(<App />);
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

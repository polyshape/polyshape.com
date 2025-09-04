import App from '../../src/App';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Layout from '../../src/lib/common/ui/Layout';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '../../src/lib/common/ui/theme/ThemeProvider';
import {AppRoutes} from '../../src/lib/common/AppRoutes';

describe('Layout components', () => {
  it('renders navigation', () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<div />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<div />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});

describe('Navigation', () => {
  it('navigates to Contact page when Contact link is clicked', async () => {
    render(<App />);
    const contactLink = screen.getByRole('link', { name: /contact/i });
    await userEvent.click(contactLink);
    const contactTitle = screen.getByRole('heading', { level: 1, name: AppRoutes.CONTACT.title });
    expect(contactTitle).toBeInTheDocument();
  });
  
  it('navigates to Vision page via menu', async () => {
    render(<App />);
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
    render(<App />);
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

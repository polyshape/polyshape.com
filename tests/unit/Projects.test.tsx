import '@testing-library/jest-dom';
import Projects from '../../src/pages/portfolio/Projects';
import { AppRoutes } from '../../src/lib/common/AppRoutes';
import { renderWithRouterAndThemeProviders } from './utils/renderWithProviders';

describe('Projects page', () => {
  it('renders the main title', () => {
    const { getByText } = renderWithRouterAndThemeProviders(<Projects />);
    expect(getByText(AppRoutes.PROJECTS.title)).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = renderWithRouterAndThemeProviders(<Projects />);
    expect(container.querySelector('.prose')).toBeInTheDocument();
    expect(container.querySelector('.hero__title')).toBeInTheDocument();
  });
});

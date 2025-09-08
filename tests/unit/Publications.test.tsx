import '@testing-library/jest-dom';
import Publications from '../../src/pages/r_n_d/Publications';
import { AppRoutes } from '../../src/lib/common/AppRoutes';
import {renderWithRouterAndThemeProviders} from './utils/renderWithProviders';

describe('Publications page', () => {
  it('renders the main title', () => {
    const { getByText } = renderWithRouterAndThemeProviders(<Publications />);
    expect(getByText(AppRoutes.PUBLICATIONS.title)).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = renderWithRouterAndThemeProviders(<Publications />);
    expect(container.querySelector('.prose')).toBeInTheDocument();
    expect(container.querySelector('.hero__title')).toBeInTheDocument();
  });
});

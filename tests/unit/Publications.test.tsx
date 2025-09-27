import { vi } from 'vitest';
import Publications from '../../src/pages/r_n_d/Publications';
import { AppRoutes } from '../../src/lib/common/AppRoutes';
import {renderWithRouterAndLoadingProviders} from './utils/renderWithProviders';

vi.mock('../../src/lib/publications', () => import('./__mocks__/publications'));

describe('Publications page', () => {
  it('renders the main title', () => {
    const { getByText } = renderWithRouterAndLoadingProviders(<Publications />);
    expect(getByText(AppRoutes.PUBLICATIONS.title)).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = renderWithRouterAndLoadingProviders(<Publications />);
    expect(container.querySelector('.prose')).toBeInTheDocument();
    expect(container.querySelector('.hero__title')).toBeInTheDocument();
  });
});

import '@testing-library/jest-dom';
import Home from '../../src/pages/Home';
import { renderWithRouterAndLoadingProviders } from './utils/renderWithProviders';

describe('Home page', () => {
  it('renders the main title and subtitle', () => {
    const { getByText } = renderWithRouterAndLoadingProviders(<Home />);
    expect(getByText(/Compositional multi-agent learning systems that advance/i)).toBeInTheDocument();
    expect(getByText(/PolyShape builds modular systems on mathematical foundations/i)).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = renderWithRouterAndLoadingProviders(<Home />);
    expect(container.querySelector('.hero')).toBeInTheDocument();
    expect(container.querySelector('.hero__content')).toBeInTheDocument();
    expect(container.querySelector('.hero__title')).toBeInTheDocument();
    expect(container.querySelector('.hero__subtitle')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { container } = renderWithRouterAndLoadingProviders(<Home />);
    expect(container).toMatchSnapshot();
  });
});

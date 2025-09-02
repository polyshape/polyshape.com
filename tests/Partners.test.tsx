import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Partners from '../src/pages/portfolio/Partners';
import { AppRoutes } from '../src/lib/common/AppRoutes';

describe('Partners page', () => {
  it('renders the main title', () => {
    const { getByText } = render(<Partners />);
    expect(getByText(AppRoutes.PARTNERS.title)).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<Partners />);
    expect(container.querySelector('.prose')).toBeInTheDocument();
    expect(container.querySelector('.hero__title')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { container } = render(<Partners />);
    expect(container).toMatchSnapshot();
  });
});

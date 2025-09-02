import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Publications from '../src/pages/r_n_d/Publications';
import { AppRoutes } from '../src/lib/common/AppRoutes';

describe('Publications page', () => {
  it('renders the main title', () => {
    const { getByText } = render(<Publications />);
    expect(getByText(AppRoutes.PUBLICATIONS.title)).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<Publications />);
    expect(container.querySelector('.prose')).toBeInTheDocument();
    expect(container.querySelector('.hero__title')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { container } = render(<Publications />);
    expect(container).toMatchSnapshot();
  });
});

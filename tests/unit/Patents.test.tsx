import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Patents from '../../src/pages/r_n_d/Patents';
import { AppRoutes } from '../../src/lib/common/AppRoutes';

describe('Patents page', () => {
  it('renders the main title', () => {
    const { getByText } = render(<Patents />);
    expect(getByText(AppRoutes.PATENTS.title)).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<Patents />);
    expect(container.querySelector('.prose')).toBeInTheDocument();
    expect(container.querySelector('.hero__title')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { container } = render(<Patents />);
    expect(container).toMatchSnapshot();
  });
});

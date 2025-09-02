import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Software from '../src/pages/r_n_d/Software';
import { AppRoutes } from '../src/lib/common/AppRoutes';

describe('Software page', () => {
  it('renders the main title', () => {
    const { getByText } = render(<Software />);
    expect(getByText(AppRoutes.SOFTWARE.title)).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<Software />);
    expect(container.querySelector('.prose')).toBeInTheDocument();
    expect(container.querySelector('.hero__title')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { container } = render(<Software />);
    expect(container).toMatchSnapshot();
  });
});

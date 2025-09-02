import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Dissemination from '../src/pages/r_n_d/Dissemination';
import { AppRoutes } from '../src/lib/common/AppRoutes';

describe('Dissemination page', () => {
  it('renders the main title', () => {
    const { getByText } = render(<Dissemination />);
    expect(getByText(AppRoutes.DISSEMINATION.title)).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<Dissemination />);
    expect(container.querySelector('.prose')).toBeInTheDocument();
    expect(container.querySelector('.hero__title')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { container } = render(<Dissemination />);
    expect(container).toMatchSnapshot();
  });
});

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Journey from '../../src/pages/orientation/Journey';
import { AppRoutes } from '../../src/lib/common/AppRoutes';

describe('Journey page', () => {
  it('renders the main title', () => {
    const { getByText } = render(<Journey />);
    expect(getByText(AppRoutes.JOURNEY.title)).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<Journey />);
    expect(container.querySelector('.prose')).toBeInTheDocument();
    expect(container.querySelector('.hero__title')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { container } = render(<Journey />);
    expect(container).toMatchSnapshot();
  });
});

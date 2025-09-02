import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Statement from '../src/pages/mission/Statement';
import { AppRoutes } from '../src/lib/common/AppRoutes';

describe('Statement page', () => {
  it('renders the main title', () => {
    const { getByText } = render(<Statement />);
    expect(getByText(AppRoutes.STATEMENT.title)).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<Statement />);
    expect(container.querySelector('.prose')).toBeInTheDocument();
    expect(container.querySelector('.hero__title')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { container } = render(<Statement />);
    expect(container).toMatchSnapshot();
  });
});

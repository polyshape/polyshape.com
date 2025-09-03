import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import News from '../../src/pages/News';
import { AppRoutes } from '../../src/lib/common/AppRoutes';

describe('News page', () => {
  it('renders the main title', () => {
    const { getByText } = render(<News />);
    expect(getByText(AppRoutes.NEWS.title)).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<News />);
    expect(container.querySelector('.prose')).toBeInTheDocument();
    expect(container.querySelector('.hero__title')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { container } = render(<News />);
    expect(container).toMatchSnapshot();
  });
});

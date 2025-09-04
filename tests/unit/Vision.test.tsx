import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Vision from '../../src/pages/orientation/Vision';
import { AppRoutes } from '../../src/lib/common/AppRoutes';

describe('Vision page', () => {
  it('renders the main title', () => {
    const { getByText } = render(<Vision />);
    expect(getByText(AppRoutes.VISION.title)).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<Vision />);
    expect(container.querySelector('.prose')).toBeInTheDocument();
    expect(container.querySelector('.hero__title')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { container } = render(<Vision />);
    expect(container).toMatchSnapshot();
  });
});

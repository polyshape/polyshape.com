import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import WhyPolyshape from '../src/pages/mission/WhyPolyshape';
import { AppRoutes } from '../src/lib/common/AppRoutes';

describe('WhyPolyshape page', () => {
  it('renders the main title', () => {
    const { getByText } = render(<WhyPolyshape />);
    expect(getByText(AppRoutes.WHY_POLYSHAPE.title)).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<WhyPolyshape />);
    expect(container.querySelector('.prose')).toBeInTheDocument();
    expect(container.querySelector('.hero__title')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { container } = render(<WhyPolyshape />);
    expect(container).toMatchSnapshot();
  });
});

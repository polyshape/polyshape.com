import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Projects from '../src/pages/portfolio/Projects';
import { AppRoutes } from '../src/lib/common/AppRoutes';

describe('Projects page', () => {
  it('renders the main title', () => {
    const { getByText } = render(<Projects />);
    expect(getByText(AppRoutes.PROJECTS.title)).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<Projects />);
    expect(container.querySelector('.prose')).toBeInTheDocument();
    expect(container.querySelector('.hero__title')).toBeInTheDocument();
  });
});

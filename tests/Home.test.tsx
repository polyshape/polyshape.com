import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import Home from '../src/pages/Home';

describe('Home page', () => {
  it('renders the main title and subtitle', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Generalized Health Intelligence')).toBeInTheDocument();
    expect(getByText('Building the Intelligence that Safeguards Us!')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<Home />);
    expect(container.querySelector('.hero')).toBeInTheDocument();
    expect(container.querySelector('.hero__content')).toBeInTheDocument();
    expect(container.querySelector('.hero__title')).toBeInTheDocument();
    expect(container.querySelector('.hero__subtitle')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});

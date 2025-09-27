import { describe, it, expect } from 'vitest';
import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import PublicationDetails from '../../src/pages/r_n_d/PublicationDetails';
import { renderWithRouterAndLoadingProviders } from './utils/renderWithProviders';

vi.mock('../../src/lib/publications', () => import('./__mocks__/publications'));

const mockUseParams = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => mockUseParams(),
  };
});

describe('PublicationDetails', () => {
  describe('Loading and Error States', () => {
    it('displays publication not found when data is not available', () => {
      mockUseParams.mockReturnValue({ pid: 'nonexistent' });
      
      renderWithRouterAndLoadingProviders(<PublicationDetails />);
      
      // When pid doesn't exist, should show not found
      expect(screen.getByText('Publication not found.')).toBeInTheDocument();
    });

    it('displays normal content when data is available', () => {
      mockUseParams.mockReturnValue({ pid: '200001' });
      
      renderWithRouterAndLoadingProviders(<PublicationDetails />);
      
      // Test normal case
      expect(screen.getByText('Mock Publication 1')).toBeInTheDocument();
    });

    it('displays publication not found when pid does not exist', () => {
      mockUseParams.mockReturnValue({ pid: 'nonexistent' });
      
      renderWithRouterAndLoadingProviders(<PublicationDetails />);
      
      expect(screen.getByText('Publication not found.')).toBeInTheDocument();
      expect(screen.getByText('Back to publications')).toBeInTheDocument();
    });

    it('displays publication not found when no pid is provided', () => {
      mockUseParams.mockReturnValue({ pid: undefined });
      
      renderWithRouterAndLoadingProviders(<PublicationDetails />);
      
      expect(screen.getByText('Publication not found.')).toBeInTheDocument();
    });
  });

  describe('Successful Publication Rendering', () => {
    it('displays publication with all metadata and publication URL', () => {
      mockUseParams.mockReturnValue({ pid: '200001' });
      
      renderWithRouterAndLoadingProviders(<PublicationDetails />);
      
      // Check title
      expect(screen.getByText('Mock Publication 1')).toBeInTheDocument();
      
      // Check publication URL button
      const publicationButton = screen.getByRole('link', { name: /View publication/ });
      expect(publicationButton).toBeInTheDocument();
      expect(publicationButton).toHaveAttribute('href', 'https://example.com/paper1');
      expect(publicationButton).toHaveAttribute('target', '_blank');
      expect(publicationButton).toHaveClass('button__primary');
      
      // Check abstract section
      expect(screen.getByText('Abstract')).toBeInTheDocument();
      expect(screen.getByText('Abstract 1')).toBeInTheDocument();
      
      // Check authors section
      expect(screen.getByText('Authors')).toBeInTheDocument();
      expect(screen.getByText('John Doe, Jane Smith')).toBeInTheDocument();
      
      // Check venue section
      expect(screen.getByText('Venue')).toBeInTheDocument();
      expect(screen.getByText('Test Journal')).toBeInTheDocument();
    });

    it('displays publication with array content and partial metadata', () => {
      mockUseParams.mockReturnValue({ pid: '200002' });
      
      renderWithRouterAndLoadingProviders(<PublicationDetails />);
      
      // Check title
      expect(screen.getByText('Mock Publication 2')).toBeInTheDocument();
      
      // Check no publication URL button
      expect(screen.queryByRole('link', { name: /View publication/ })).not.toBeInTheDocument();
      
      // Check array content rendered as separate paragraphs
      expect(screen.getByText('First abstract paragraph')).toBeInTheDocument();
      expect(screen.getByText('Second abstract paragraph')).toBeInTheDocument();
      
      // Check authors section (single author)
      expect(screen.getByText('Authors')).toBeInTheDocument();
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      
      // Check venue section
      expect(screen.getByText('Conference Proceedings')).toBeInTheDocument();
    });

    it('displays publication with minimal metadata', () => {
      mockUseParams.mockReturnValue({ pid: '200003' });
      
      renderWithRouterAndLoadingProviders(<PublicationDetails />);
      
      // Check title
      expect(screen.getByText('Mock Publication 3')).toBeInTheDocument();
      
      // Check content
      expect(screen.getByText('Simple abstract')).toBeInTheDocument();
      
      // Check no authors section (not provided)
      expect(screen.queryByText('Authors')).not.toBeInTheDocument();
      
      // Check no venue section (not provided)
      expect(screen.queryByText('Venue')).not.toBeInTheDocument();
      
      // Check no publication URL button
      expect(screen.queryByRole('link', { name: /View publication/ })).not.toBeInTheDocument();
    });
  });

  describe('Content Rendering', () => {
    it('renders string content as single paragraph', () => {
      mockUseParams.mockReturnValue({ pid: '200001' });
      
      renderWithRouterAndLoadingProviders(<PublicationDetails />);
      
      const contentParagraphs = screen.getAllByText(/Abstract 1/);
      expect(contentParagraphs).toHaveLength(1);
    });

    it('renders array content as multiple paragraphs', () => {
      mockUseParams.mockReturnValue({ pid: '200002' });
      
      renderWithRouterAndLoadingProviders(<PublicationDetails />);
      
      expect(screen.getByText('First abstract paragraph')).toBeInTheDocument();
      expect(screen.getByText('Second abstract paragraph')).toBeInTheDocument();
      
      // Each should be in its own paragraph
      const paragraphs = screen.getAllByText(/paragraph/);
      expect(paragraphs).toHaveLength(2);
    });
  });

  describe('Authors Handling', () => {
    it('displays multiple authors joined with commas', () => {
      mockUseParams.mockReturnValue({ pid: '200001' });
      
      renderWithRouterAndLoadingProviders(<PublicationDetails />);
      
      expect(screen.getByText('John Doe, Jane Smith')).toBeInTheDocument();
    });

    it('displays single author', () => {
      mockUseParams.mockReturnValue({ pid: '200002' });
      
      renderWithRouterAndLoadingProviders(<PublicationDetails />);
      
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    });

    it('does not display authors section when no authors provided', () => {
      mockUseParams.mockReturnValue({ pid: '200003' });
      
      renderWithRouterAndLoadingProviders(<PublicationDetails />);
      
      expect(screen.queryByText('Authors')).not.toBeInTheDocument();
    });
  });

  describe('Publication URL Button', () => {
    it('displays publication button with correct attributes when URL provided', () => {
      mockUseParams.mockReturnValue({ pid: '200001' });
      
      renderWithRouterAndLoadingProviders(<PublicationDetails />);
      
      const button = screen.getByRole('link', { name: /View publication/ });
      expect(button).toHaveAttribute('href', 'https://example.com/paper1');
      expect(button).toHaveAttribute('target', '_blank');
      expect(button).toHaveAttribute('rel', 'noreferrer');
      
      // Check for icon
      const icon = button.querySelector('i.fa-solid.fa-arrow-up-right-from-square');
      expect(icon).toBeInTheDocument();
    });

    it('does not display publication button when no URL provided', () => {
      mockUseParams.mockReturnValue({ pid: '200002' });
      
      renderWithRouterAndLoadingProviders(<PublicationDetails />);
      
      expect(screen.queryByRole('link', { name: /View publication/ })).not.toBeInTheDocument();
    });
  });

  describe('Accessibility and Structure', () => {
    it('has proper semantic structure', () => {
      mockUseParams.mockReturnValue({ pid: '200001' });
      
      renderWithRouterAndLoadingProviders(<PublicationDetails />);
      
      // Should have main heading
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      
      // Should have section headings
      expect(screen.getByRole('heading', { name: 'Abstract' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Authors' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Venue' })).toBeInTheDocument();
      
      // Should have proper time element
      expect(screen.getByRole('time')).toBeInTheDocument();
      
      // External link should have proper attributes
      const externalLink = screen.getByRole('link', { name: /View publication/ });
      expect(externalLink).toHaveAttribute('rel', 'noreferrer');
    });

    it('has proper CSS classes for styling', () => {
      mockUseParams.mockReturnValue({ pid: '200001' });
      
      renderWithRouterAndLoadingProviders(<PublicationDetails />);
      
      // Check main container has prose class
      const proseContainer = screen.getByText('Mock Publication 1').closest('.prose');
      expect(proseContainer).toBeInTheDocument();
    });
  });
});
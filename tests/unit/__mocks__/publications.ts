export type Publication = {
  id: string;
  pid: string;
  title: string;
  content: string | string[];
  date: string;
  authors?: string[];
  venue?: string;
};

const mockData: Publication[] = [
  { id: 'pub1', pid: '200001', title: 'Mock Publication 1', content: 'Abstract 1', date: '2023-12-01' },
  { id: 'pub2', pid: '200002', title: 'Mock Publication 2', content: 'Abstract 2', date: '2022-05-01' },
];

export function usePublications() {
  return {
    data: mockData,
    loading: false,
    error: null,
    reload: () => {},
  } as const;
}

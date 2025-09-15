export type Project = {
  id: string;
  pid: string;
  title: string;
  content: string | string[];
  date: string;
  partner?: { name: string; url?: string };
};

const mockData: Project[] = [
  { id: 'mock1', pid: '100001', title: 'Mock Project 1', content: 'Summary 1', date: '2024-01-01' },
  { id: 'mock2', pid: '100002', title: 'Mock Project 2', content: 'Summary 2', date: '2023-06-01' },
];

export function useProjects() {
  return {
    data: mockData,
    loading: false,
    error: null,
    reload: () => {},
  } as const;
}

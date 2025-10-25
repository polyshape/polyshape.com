export type Publication = {
  id: string;
  pid: string;
  title: string;
  content: string | string[];
  date: string;
  authors?: string[];
  venue?: string;
  publicationUrl?: string;
};

const mockData: Publication[] = [
  { 
    id: "pub1", 
    pid: "200001", 
    title: "Mock Publication 1", 
    content: "Abstract 1", 
    date: "2023-12-01",
    authors: ["John Doe", "Jane Smith"],
    venue: "Test Journal",
    publicationUrl: "https://example.com/paper1"
  },
  { 
    id: "pub2", 
    pid: "200002", 
    title: "Mock Publication 2", 
    content: ["First abstract paragraph", "Second abstract paragraph"], 
    date: "2022-05",
    authors: ["Alice Johnson"],
    venue: "Conference Proceedings"
  },
  { 
    id: "pub3", 
    pid: "200003", 
    title: "Mock Publication 3", 
    content: "Simple abstract", 
    date: "2021-11-15"
  },
];

export function usePublications() {
  return {
    data: mockData,
    loading: false,
    error: null,
    reload: () => {},
  } as const;
}

export type Project = {
  id: string;
  pid: string;
  title: string;
  content: string | string[];
  date: string;
  partner?: { name: string; url?: string };
};

const mockData: Project[] = [
  { 
    id: "mock1", 
    pid: "100001", 
    title: "Mock Project 1", 
    content: "Summary 1", 
    date: "2024-01-01",
    partner: { name: "Test Partner", url: "https://example.com" }
  },
  { 
    id: "mock2", 
    pid: "100002", 
    title: "Mock Project 2", 
    content: ["First paragraph", "Second paragraph"], 
    date: "2023-06-15",
    partner: { name: "Partner Without URL" }
  },
  { 
    id: "mock3", 
    pid: "100003", 
    title: "Mock Project 3", 
    content: "Summary 3", 
    date: "2022-12"
  },
];

export function useProjects() {
  return {
    data: mockData,
    loading: false,
    error: null,
    reload: () => {},
  } as const;
}

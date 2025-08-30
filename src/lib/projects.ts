export type ProjectDoc = {
  title: string;
  content: string | string[];
  date?: string;
};

export type Project = ProjectDoc & {
  id: string;
};

export function loadProjects(): Project[] {
  const modules = import.meta.glob<{ default: ProjectDoc }>(
    '/src/content/projects/*.json',
    { eager: true }
  );

  const items: Project[] = Object.entries(modules).map(([path, mod]) => {
    const data = mod.default;
    const id = path.split('/').pop()!.replace(/\.json$/, '');
    return { id, ...data };
  });

  items.sort((a, b) => b.id.localeCompare(a.id));
  return items;
}

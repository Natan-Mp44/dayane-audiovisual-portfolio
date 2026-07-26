export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  coverImage: string;
  gallery: string[];
  description: string;
  role: string;
  tools: string[];
  videoUrl?: string;
  date: string;
  tags: string[];
  excerpt: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Skill {
  category: string;
  items: string[];
  icon: string;
}

export type CursorState = 'default' | 'hover' | 'click';

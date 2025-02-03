export interface Task {
  id: number;
  icon: string;
  type: string;
  title: string;
  category?: string;
  details: string;
  config: Record<string, any>;
  position: { x: number; y: number };
  connections: string[];
  folderId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Folder {
  id: number;
  name: string;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}
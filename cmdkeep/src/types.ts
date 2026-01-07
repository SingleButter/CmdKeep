export interface Command {
  id?: number;
  title: string;
  command: string;
  description: string;
  category: string;
  created_at?: string;
  updated_at?: string;
}

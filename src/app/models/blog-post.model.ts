export interface BlogPostContent {
  type: 'text' | 'image' | 'markdown' | 'html';
  value: string;
}

export interface BlogPost {
  id: number;
  title: string;
  content: BlogPostContent[];
  author: string;
  date: Date;
  summary: string;
}
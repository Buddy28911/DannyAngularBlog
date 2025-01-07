import { Injectable } from '@angular/core';
import { BlogPost } from './models/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogDataService {
  private blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Hello World!',
      content: 'This is my first blog post. Sup?',
      author: 'Danny Noe',
      date: new Date()
    }
  ];

  constructor() { }

  getBlogPosts(): BlogPost[] {
    return this.blogPosts;
  }

  getBlogPostById(id: number): BlogPost | undefined {
    return this.blogPosts.find(post => post.id === id);
  }
}

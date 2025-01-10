import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogPost, BlogPostContent } from './models/blog-post.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogDataService {
  private blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Hello World!',
      content: [
        { type: 'text', value: 'This is my first blog post. It uses my internal `text` type' }
      ],
      author: 'Danny Noe',
      date: new Date('2024-01-07T00:00:00Z'),
      summary: 'My first blog post, text only.'
    },
    
    {
      id: 2,
      title: 'First Markdown Blog Post!',
      content: [{ type: 'markdown', value: '/markdownposts/FirstMarkDownBlog.md' }],
      author: 'Danny Noe',
      date: new Date('2024-01-09T00:00:00Z'),
      summary: 'A smaller attempt at a blog post using markdown.'
    },
    {
      id: 5,
      title: 'Album of the Year 2024',
      content: [ { type: 'markdown', value: '/markdownposts/aoty2024.md' } ],
      author: 'Danny Noe',
      date: new Date('2024-01-10T00:00:00Z'),
      summary: 'My list of albums I heard in 2024, ranked.'
    }
  ];

  constructor(private http: HttpClient) { }

  getBlogPosts(): BlogPost[] {
    return this.blogPosts.sort((a, b) => b.id - a.id);
  }

  getBlogPostById(id: number): BlogPost | undefined {
    return this.blogPosts.find(post => post.id === id);
  }

  loadMarkdownFile(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'text' });
  }
}

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
        { type: 'text', value: 'This is my first blog post. Sup?' }
      ],
      author: 'Danny Noe',
      date: new Date(),
      summary: 'First post uwu'
    },
    {
      id: 2,
      title: 'Second Blog Post',
      content: [
        { type: 'text', value: 'This is the content of the second blog post.' }
      ],
      author: 'Danny Noe',
      date: new Date(),
      summary: 'Second post uwu'
    },
    {
      id: 3,
      title: 'Top 10 Favorite Albums',
      content: [
        { type: 'text', value: '**10** Favorite Album 10' },
        { type: 'image', value: 'assets/images/image01.jpg' },
        { type: 'text', value: 'My thoughts...' },
        { type: 'text', value: '**9** Favorite Album 9' },
        { type: 'image', value: 'assets/images/image02.jpg' },
        { type: 'text', value: 'Words' }
      ],
      author: 'Danny Noe',
      date: new Date(),
      summary: 'Top 10 Favorite Albums'
    },
    {
      id: 4,
      title: 'First Markdown Blog Post!',
      content: [{ type: 'markdown', value: '/markdownposts/FirstMarkDownBlog.md' }],
      author: 'Danny Noe',
      date: new Date(),
      summary: 'A smaller attempt at a blog post using markdown.'
    },
    {
      id: 5,
      title: 'Album of the Year 2024',
      content: [ { type: 'markdown', value: '/markdownposts/blogpostExample.md' } ],
      author: 'Danny Noe',
      date: new Date(),
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

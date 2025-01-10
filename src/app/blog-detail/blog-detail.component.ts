import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogDataService } from '../blog-data.service';
import { BlogPost, BlogPostContent } from '../models/blog-post.model';
import { marked } from 'marked';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from "rxjs";

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class BlogDetailComponent implements OnInit {
  blogPost: BlogPost | undefined;

  constructor(
    private route: ActivatedRoute,
    private blogDataService: BlogDataService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.blogPost = this.blogDataService.getBlogPostById(id);

    if (this.blogPost) {
      this.loadPost().then((contents) => (this.blogPost!.content = contents));
    }
  }

  async loadPost(): Promise<BlogPostContent[]> {
    return Promise.all(
      this.blogPost!.content.map(async (content) => {
        if (content.type === 'markdown') {
          return {
            type: 'html',
            value: await marked(
              await firstValueFrom(
                this.blogDataService.loadMarkdownFile(content.value),
              ),
            ),
          };
        }
        return content;
      }),
    );
  }
}

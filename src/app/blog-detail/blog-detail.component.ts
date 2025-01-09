import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogDataService } from '../blog-data.service';
import { BlogPost } from '../models/blog-post.model';
import { marked } from 'marked';
import { HttpClient } from '@angular/common/http';

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
      const markdownContents = this.blogPost.content.filter(content => content.type === 'markdown');

      markdownContents.forEach(markdownContent => {
        this.blogDataService.loadMarkdownFile(markdownContent.value).subscribe(content => {
          markdownContent.value = content[0].value;
          this.parseMarkdown(markdownContent.value).then(parsedContent => {
            markdownContent.value = parsedContent;
          });
        });
      });
    }
  }

  async parseMarkdown(content: string): Promise<string> {
    const result = marked(content);
    console.log('result', result);
    return result;
  }
}

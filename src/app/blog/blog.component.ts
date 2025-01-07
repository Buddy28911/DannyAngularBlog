import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogDataService } from '../blog-data.service';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class BlogComponent implements OnInit {
  blogPosts: BlogPost[] = [];

  constructor(private blogDataService: BlogDataService) { }

  ngOnInit(): void {
    this.blogPosts = this.blogDataService.getBlogPosts();
  }
}

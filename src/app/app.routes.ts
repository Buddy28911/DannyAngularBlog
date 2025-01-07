
import { Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

export const routes: Routes = [
  { path: '', component: BlogComponent },
  { path: 'blog/:id', component: BlogDetailComponent }
];

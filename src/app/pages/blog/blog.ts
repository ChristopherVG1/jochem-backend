import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BlogService, BlogPost } from './blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css'],
  providers: [DatePipe],
})
export class Blog implements OnInit {
  posts: BlogPost[] = [];
  paginatedPosts: BlogPost[] = [];
  showPopup = false;
  isLoading = true;

  // Pagination properties
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;

  constructor(
    private blogService: BlogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.isLoading = true;
    this.blogService.getPosts().subscribe({
      next: (posts) => {
        // Sort by most recent first
        this.posts = posts.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.totalPages = Math.ceil(this.posts.length / this.itemsPerPage);
        this.updatePaginatedPosts();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading posts:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  updatePaginatedPosts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPosts = this.posts.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedPosts();
    }
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  previousPage() {
    this.goToPage(this.currentPage - 1);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  addPost(event: any) {
    event.preventDefault();
    const form = event.target;
    const newPost: any = {
      author: form.author.value,
      characterName: form.character.value,
      text: form.text.value
    };

    this.blogService.addPost(newPost).subscribe({
      next: (post) => {
        this.posts.unshift(post);
        this.totalPages = Math.ceil(this.posts.length / this.itemsPerPage);
        this.currentPage = 1; // Go to first page to see new post
        this.updatePaginatedPosts();
        this.showPopup = false;
        form.reset();
        this.cdr.detectChanges();
        console.log('Post added:', post);
      },
      error: (err) => {
        console.error('Error adding post:', err);
      }
    });
  }
}

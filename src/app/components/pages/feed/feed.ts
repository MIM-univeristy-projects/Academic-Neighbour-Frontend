import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreatePostDto } from '../../../models/post.model';
import { PostService } from '../../../services/post.service';
import { CreatePostFormComponent } from './create-post-form/create-post-form';
import { FeedHeaderComponent } from './feed-header/feed-header';
import { PostComponent } from './post/post';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, PostComponent, CreatePostFormComponent, FeedHeaderComponent],
  templateUrl: './feed.html',
  styleUrl: './feed.css',
})
export class Feed {
  private postService = inject(PostService);

  // Signal-based state management
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  // Use service's cached posts for reactive updates
  readonly posts = this.postService.cachedPosts;

  // Computed signals
  readonly hasPosts = computed(() => this.posts().length > 0);
  readonly isEmpty = computed(() => !this.isLoading() && !this.hasPosts());
  readonly hasError = computed(() => !!this.errorMessage());

  constructor() {
    this.loadPosts();
  }

  loadPosts(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.postService.getPosts().subscribe({
      next: () => {
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.errorMessage.set('Nie udało się załadować postów. Spróbuj ponownie.');
        this.isLoading.set(false);
      },
    });
  }

  onCreatePost(postData: CreatePostDto): void {
    this.postService.createPost(postData).subscribe({
      next: () => {
        // Service automatically updates the cache
        this.errorMessage.set(null);
      },
      error: (error) => {
        console.error('Error creating post:', error);
        this.errorMessage.set('Nie udało się utworzyć posta. Spróbuj ponownie.');
      },
    });
  }

  onLikePost(postId: number): void {
    this.postService.likePost(postId).subscribe({
      next: () => {
        // Service automatically updates the cache
        this.errorMessage.set(null);
      },
      error: (error) => {
        console.error('Error liking post:', error);
        this.errorMessage.set('Nie udało się polubić posta. Spróbuj ponownie.');
      },
    });
  }

  onCommentPost(postId: number): void {
    // TODO: Implement comment functionality
    console.log('Comment on post:', postId);
  }

  retryLoad(): void {
    this.loadPosts();
  }
}

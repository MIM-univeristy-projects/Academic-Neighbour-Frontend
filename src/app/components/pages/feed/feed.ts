import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { EventCreate } from '../../../models/event.model';
import { PostCreate } from '../../../models/post.model';
import { AuthService } from '../../../services/auth.service';
import { EventService } from '../../../services/event.service';
import { PostService } from '../../../services/post.service';
import { CreateEventFormComponent } from './create-event-form/create-event-form';
import { CreatePostFormComponent } from './create-post-form/create-post-form';
import { FeedHeaderComponent } from './feed-header/feed-header';
import { FeedTabsComponent } from './feed-tabs/feed-tabs';
import { PostComponent } from './post/post';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, PostComponent, CreatePostFormComponent, CreateEventFormComponent, FeedHeaderComponent, FeedTabsComponent],
  templateUrl: './feed.html',
  styleUrl: './feed.css',
})
export class Feed {
  private postService = inject(PostService);
  private eventService = inject(EventService);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Signal-based state management
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly isRedirecting = signal(false);
  readonly activeTab = signal<'board' | 'events' | 'groups'>('board');

  // Use service's cached posts and events for reactive updates
  readonly posts = this.postService.cachedPosts;
  readonly events = this.eventService.cachedEvents;

  // Computed signals
  readonly hasPosts = computed(() => this.posts().length > 0);
  readonly isEmpty = computed(() => !this.isLoading() && !this.hasPosts());
  readonly hasError = computed(() => !!this.errorMessage());

  constructor() {
    this.loadPosts();
    this.loadEvents();
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
        this.handleError(error, 'Nie udało się załadować postów.');
        this.isLoading.set(false);
      },
    });
  }

  onCreatePost(postData: PostCreate): void {
    // Check authentication before creating post
    if (!this.authService.isAuthenticated()) {
      this.redirectToLogin('Musisz być zalogowany, aby utworzyć post.');
      return;
    }

    this.postService.createPost(postData).subscribe({
      next: () => {
        // Service automatically updates the cache
        this.errorMessage.set(null);
      },
      error: (error) => {
        console.error('Error creating post:', error);
        this.handleError(error, 'Nie udało się utworzyć posta.');
      },
    });
  }

  onCreateEvent(eventData: EventCreate): void {
    // Check authentication before creating event
    if (!this.authService.isAuthenticated()) {
      this.redirectToLogin('Musisz być zalogowany, aby utworzyć event.');
      return;
    }

    this.eventService.createEvent(eventData).subscribe({
      next: () => {
        // Service automatically updates the cache
        this.errorMessage.set(null);
      },
      error: (error) => {
        console.error('Error creating event:', error);
        this.handleError(error, 'Nie udało się utworzyć eventu.');
      },
    });
  }

  onLikePost(postId: number): void {
    // Check authentication before liking
    if (!this.authService.isAuthenticated()) {
      this.redirectToLogin('Musisz być zalogowany, aby polubić post.');
      return;
    }

    // Find the post to check its current like status
    const post = this.posts().find(p => p.id === postId);
    if (!post) return;

    const isLiked = post.liked_by_current_user;

    if (isLiked) {
      // Unlike the post
      this.postService.unlikePost(postId).subscribe({
        next: () => {
          this.loadPosts(); // Reload to get updated data
          this.errorMessage.set(null);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error unliking post:', error);
          this.handleError(error, 'Nie udało się usunąć polubienia posta.');
        },
      });
    } else {
      // Like the post
      this.postService.likePost(postId).subscribe({
        next: () => {
          this.loadPosts(); // Reload to get updated data
          this.errorMessage.set(null);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error liking post:', error);
          this.handleError(error, 'Nie udało się polubić posta.');
        },
      });
    }
  }

  onRefreshPost(): void {
    // Reload posts to get updated counts
    this.loadPosts();
  }

  loadEvents(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.eventService.getEvents().subscribe({
      next: () => {
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.handleError(error, 'Nie udało się załadować eventów.');
        this.isLoading.set(false);
      },
    });
  }

  retryLoad(): void {
    if (this.activeTab() === 'board') {
      this.loadPosts();
    } else if (this.activeTab() === 'events') {
      this.loadEvents();
    }
  }

  onTabChange(tab: 'board' | 'events' | 'groups'): void {
    this.activeTab.set(tab);
    this.errorMessage.set(null);
  }

  /**
   * Handle HTTP errors and redirect to login if unauthorized
   */
  private handleError(error: HttpErrorResponse, defaultMessage: string): void {
    if (error.status === 401 || error.status === 403) {
      this.redirectToLogin('Twoja sesja wygasła. Zaloguj się ponownie.');
    } else if (error.status === 0) {
      this.errorMessage.set('Brak połączenia z serwerem. Sprawdź połączenie internetowe.');
    } else if (error.status >= 500) {
      this.errorMessage.set('Serwer jest obecnie niedostępny. Spróbuj ponownie za chwilę.');
    } else {
      this.errorMessage.set(defaultMessage);
    }
  }

  /**
   * Redirect to login page with a message
   */
  private redirectToLogin(message: string): void {
    console.warn('Unauthorized action:', message);
    this.errorMessage.set(message);
    this.isRedirecting.set(true);

    // Redirect to login after a short delay
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}

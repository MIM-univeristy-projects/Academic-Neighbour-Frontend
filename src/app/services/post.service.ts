import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { LikesInfo, PostLike } from '../models/like.model';
import { Post, PostCreate, PostWithAuthor } from '../models/post.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    private http = inject(HttpClient);
    private authService = inject(AuthService);

    private readonly apiUrl = environment.apiUrl;

    // Optional: Signal-based cache for posts (can be used by components)
    private postsCache = signal<Post[]>([]);

    /**
     * Read-only access to cached posts
     */
    readonly cachedPosts = this.postsCache.asReadonly();

    /**
     * Get all posts
     */
    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.apiUrl}/posts/`).pipe(
            tap(posts => this.postsCache.set(posts)),
            catchError(error => {
                console.error('Failed to fetch posts:', error);
                return throwError(() => error);
            })
        );
    }

    /**
     * Create a new post
     */
    createPost(postData: PostCreate): Observable<Post> {
        const currentUser = this.authService.currentUser();

        if (!currentUser?.id) {
            return throwError(() => new Error('User must be authenticated to create a post'));
        }

        const postPayload: Partial<Post> = {
            content: postData.content,
            author_id: currentUser.id
        };

        return this.http.post<Post>(`${this.apiUrl}/posts/`, postPayload).pipe(
            tap(newPost => {
                // Update cache with new post
                this.postsCache.update(posts => [newPost, ...posts]);
            }),
            catchError(error => {
                console.error('Failed to create post:', error);
                return throwError(() => error);
            })
        );
    }

    /**
     * Like a post
     */
    likePost(postId: number): Observable<PostLike> {
        return this.http.post<PostLike>(`${this.apiUrl}/posts/${postId}/like`, {}).pipe(
            catchError(error => {
                console.error('Failed to like post:', error);
                return throwError(() => error);
            })
        );
    }

    /**
     * Unlike a post
     */
    unlikePost(postId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/posts/${postId}/like`).pipe(
            catchError(error => {
                console.error('Failed to unlike post:', error);
                return throwError(() => error);
            })
        );
    }

    /**
     * Get likes information for a post
     */
    getLikesInfo(postId: number): Observable<LikesInfo> {
        return this.http.get<LikesInfo>(`${this.apiUrl}/posts/${postId}/likes`).pipe(
            catchError(error => {
                console.error('Failed to fetch likes info:', error);
                return throwError(() => error);
            })
        );
    }

    /**
     * Get a single post by ID
     */
    getPost(postId: number): Observable<Post> {
        return this.http.get<Post>(`${this.apiUrl}/posts/${postId}`).pipe(
            catchError(error => {
                console.error('Failed to fetch post:', error);
                return throwError(() => error);
            })
        );
    }

    /**
     * Get a single post by ID with author information
     */
    getPostWithAuthor(postId: number): Observable<PostWithAuthor> {
        return this.http.get<PostWithAuthor>(`${this.apiUrl}/posts/${postId}/with-author`).pipe(
            catchError(error => {
                console.error('Failed to fetch post with author:', error);
                return throwError(() => error);
            })
        );
    }

    /**
     * Clear the posts cache
     */
    clearCache(): void {
        this.postsCache.set([]);
    }
}

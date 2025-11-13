import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreatePostDto, Post, PostWithAuthor } from '../models/post.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    private http = inject(HttpClient);
    private authService = inject(AuthService);

    private apiUrl = environment.apiUrl;

    /**
     * Get all posts
     */
    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.apiUrl}/posts/`).pipe(
            catchError(error => {
                console.error('Failed to fetch posts:', error);
                return throwError(() => error);
            })
        );
    }

    /**
     * Create a new post
     */
    createPost(postData: CreatePostDto): Observable<Post> {
        const currentUser = this.authService.currentUser();

        if (!currentUser?.id) {
            return throwError(() => new Error('User must be authenticated to create a post'));
        }

        const postPayload: Partial<Post> = {
            text: postData.text,
            author_id: currentUser.id
        };

        return this.http.post<Post>(`${this.apiUrl}/posts/`, postPayload).pipe(
            catchError(error => {
                console.error('Failed to create post:', error);
                return throwError(() => error);
            })
        );
    }

    /**
     * Like a post
     */
    likePost(postId: number): Observable<Post> {
        return this.http.post<Post>(`${this.apiUrl}/posts/${postId}/like`, {}).pipe(
            catchError(error => {
                console.error('Failed to like post:', error);
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
}

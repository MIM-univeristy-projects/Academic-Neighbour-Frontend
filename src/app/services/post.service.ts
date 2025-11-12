import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Post, CreatePostDto } from '../models/post.model';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    private mockPosts: Post[] = [
        {
            id: 1,
            text: 'Witam sąsiadów! Właśnie dołączyłem do platformy Academic Neighbour. Cieszę się, że mogę być częścią tej wspaniałej społeczności! 🎉',
            author_id: 1,
            created_at: new Date(Date.now() - 3600000).toISOString(),
        },
        {
            id: 2,
            text: 'Czy ktoś ma notatki z wykładu z matematyki? Niestety przegapiłem ostatnie zajęcia. Z góry dziękuję za pomoc! 📚',
            author_id: 2,
            created_at: new Date(Date.now() - 7200000).toISOString(),
        },
        {
            id: 3,
            text: 'Organizuję sesję nauki w bibliotece w przyszły poniedziałek o 16:00. Kto chce dołączyć? 📖',
            author_id: 3,
            created_at: new Date(Date.now() - 86400000).toISOString(),
        },
    ];

    constructor() { }

    // Get all posts
    getPosts(): Observable<Post[]> {
        // TODO: Replace with actual HTTP call
        // return this.http.get<Post[]>('/api/posts');
        return of([...this.mockPosts]).pipe(delay(500));
    }

    // Create a new post
    createPost(postData: CreatePostDto): Observable<Post> {
        // TODO: Replace with actual HTTP call
        // return this.http.post<Post>('/api/posts', postData);
        const newPost: Post = {
            id: Date.now(),
            text: postData.text,
            author_id: 1, // TODO: Get from auth service
            created_at: new Date().toISOString(),
        };
        this.mockPosts = [newPost, ...this.mockPosts];
        return of(newPost).pipe(delay(300));
    }

    // Like a post
    likePost(postId: number): Observable<Post> {
        // TODO: Replace with actual HTTP call
        // return this.http.post<Post>(`/api/posts/${postId}/like`, {});
        const post = this.mockPosts.find((p) => p.id === postId);
        return of(post!).pipe(delay(200));
    }

    // Get a single post by ID
    getPost(postId: number): Observable<Post | undefined> {
        // TODO: Replace with actual HTTP call
        // return this.http.get<Post>(`/api/posts/${postId}`);
        const post = this.mockPosts.find((p) => p.id === postId);
        return of(post).pipe(delay(300));
    }

    // Delete a post
    deletePost(postId: number): Observable<void> {
        // TODO: Replace with actual HTTP call
        // return this.http.delete<void>(`/api/posts/${postId}`);
        this.mockPosts = this.mockPosts.filter((p) => p.id !== postId);
        return of(void 0).pipe(delay(300));
    }
}

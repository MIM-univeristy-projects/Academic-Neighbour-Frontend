import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Post, CreatePostDto } from '../../../models/post.model';
import { PostComponent } from './post/post';
import { CreatePostFormComponent } from './create-post-form/create-post-form';
import { FeedHeaderComponent } from './feed-header/feed-header';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, MatIconModule, PostComponent, CreatePostFormComponent, FeedHeaderComponent],
  templateUrl: './feed.html',
  styleUrl: './feed.css',
})
export class Feed implements OnInit {
  posts: Post[] = [];
  isLoading = false;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.isLoading = true;
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.isLoading = false;
      },
    });
  }

  onCreatePost(postData: CreatePostDto): void {
    this.postService.createPost(postData).subscribe({
      next: (newPost) => {
        this.posts = [newPost, ...this.posts];
        console.log('New post created:', newPost);
      },
      error: (error) => {
        console.error('Error creating post:', error);
      },
    });
  }

  onLikePost(postId: number): void {
    this.postService.likePost(postId).subscribe({
      next: (likedPost) => {
        const index = this.posts.findIndex((p) => p.id === postId);
        if (index !== -1) {
          this.posts[index] = likedPost;
        }
        console.log('Post liked:', postId);
      },
      error: (error) => {
        console.error('Error liking post:', error);
      },
    });
  }

  onCommentPost(postId: number): void {
    // TODO: Implement comment functionality
    console.log('Comment on post:', postId);
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Post } from '../../../../models/post.model';

@Component({
    selector: 'app-post',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
    ],
    templateUrl: './post.html',
    styleUrl: './post.css',
})
export class PostComponent {
    @Input({ required: true }) post!: Post;
    @Output() likePost = new EventEmitter<number>();
    @Output() commentPost = new EventEmitter<number>();

    onLike(): void {
        this.likePost.emit(this.post.id);
    }

    onComment(): void {
        this.commentPost.emit(this.post.id);
    }

    getFormattedDate(dateString: string): string {
        const now = new Date();
        const postDate = new Date(dateString);
        const diffInMs = now.getTime() - postDate.getTime();
        const diffInMinutes = Math.floor(diffInMs / 60000);
        const diffInHours = Math.floor(diffInMs / 3600000);
        const diffInDays = Math.floor(diffInMs / 86400000);

        if (diffInMinutes < 1) {
            return 'teraz';
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes} min temu`;
        } else if (diffInHours < 24) {
            return `${diffInHours} godz. temu`;
        } else if (diffInDays < 7) {
            return `${diffInDays} dni temu`;
        } else {
            return postDate.toLocaleDateString('pl-PL');
        }
    }

    getAuthorInitial(): string {
        return `U${this.post.author_id}`;
    }
}

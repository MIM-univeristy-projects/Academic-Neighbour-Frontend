import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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
    // Modern input() API
    post = input.required<Post>();

    // Modern output() API
    likePost = output<number>();
    commentPost = output<number>();

    // Computed signals
    readonly formattedDate = computed(() => this.getFormattedDate(this.post().created_at));
    readonly authorInitial = computed(() => `U${this.post().author_id}`);

    onLike(): void {
        this.likePost.emit(this.post().id);
    }

    onComment(): void {
        this.commentPost.emit(this.post().id);
    }

    private getFormattedDate(dateString: string): string {
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
}

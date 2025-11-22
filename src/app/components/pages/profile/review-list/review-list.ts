import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserReview } from '../../../../models/review.model';

@Component({
    selector: 'app-review-list',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './review-list.html',
    styleUrl: './review-list.css',
})
export class ReviewListComponent {
    reviews = input.required<UserReview[]>();

    getFormattedDate(dateString: string): string {
        const now = new Date();
        const reviewDate = new Date(dateString);
        const diffInMs = now.getTime() - reviewDate.getTime();
        const diffInDays = Math.floor(diffInMs / 86400000);

        if (diffInDays < 1) {
            return 'dzisiaj';
        } else if (diffInDays === 1) {
            return 'wczoraj';
        } else if (diffInDays < 7) {
            return `${diffInDays} dni temu`;
        } else if (diffInDays < 30) {
            const weeks = Math.floor(diffInDays / 7);
            return `${weeks} ${weeks === 1 ? 'tydzień' : 'tygodnie'} temu`;
        } else {
            return reviewDate.toLocaleDateString('pl-PL');
        }
    }

    getStars(rating: number): boolean[] {
        return Array(5).fill(false).map((_, i) => i < rating);
    }
}

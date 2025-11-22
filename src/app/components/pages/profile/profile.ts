import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { ReviewCreate, ReviewStats, UserReview } from '../../../models/review.model';
import { AuthService } from '../../../services/auth.service';
import { ReviewService } from '../../../services/review.service';
import { UserService } from '../../../services/user.service';
import { FeedHeaderComponent } from '../feed/feed-header/feed-header';
import { ReviewFormComponent } from './review-form/review-form';
import { ReviewListComponent } from './review-list/review-list';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule,
        FeedHeaderComponent,
        ReviewFormComponent,
        ReviewListComponent,
    ],
    templateUrl: './profile.html',
    styleUrl: './profile.css',
})
export class ProfilePage {
    private authService = inject(AuthService);
    private userService = inject(UserService);
    private reviewService = inject(ReviewService);
    private route = inject(ActivatedRoute);

    readonly currentUser = this.authService.currentUser;
    readonly isLoading = signal(false);
    readonly reviews = signal<UserReview[]>([]);
    readonly reviewStats = signal<ReviewStats | null>(null);
    readonly showReviewForm = signal(false);
    readonly isLoadingReviews = signal(false);
    readonly hasUserReviewed = signal(false);

    readonly userInitials = computed(() => {
        const user = this.currentUser();
        if (!user) return 'U';

        const firstInitial = user.first_name?.[0]?.toUpperCase() || '';
        const lastInitial = user.last_name?.[0]?.toUpperCase() || '';
        return firstInitial + lastInitial || user.username?.[0]?.toUpperCase() || 'U';
    });

    readonly userFullName = computed(() => {
        const user = this.currentUser();
        if (!user) return 'Użytkownik';
        return `${user.first_name} ${user.last_name}`.trim() || user.username || 'Użytkownik';
    });

    readonly canLeaveReview = computed(() => {
        const user = this.currentUser();
        // Users can review their own profile in this implementation
        // In production, you'd typically prevent self-reviews
        return user && !this.hasUserReviewed();
    });

    constructor() {
        this.loadReviews();
    }

    loadReviews(): void {
        const user = this.currentUser();
        if (!user?.id) return;

        this.isLoadingReviews.set(true);

        // Load reviews
        this.reviewService.getUserReviews(user.id).subscribe({
            next: (reviews) => {
                this.reviews.set(reviews);
                this.isLoadingReviews.set(false);
            },
            error: (error) => {
                console.error('Failed to load reviews:', error);
                this.isLoadingReviews.set(false);
            },
        });

        // Load review stats
        this.reviewService.getUserReviewStats(user.id).subscribe({
            next: (stats) => {
                this.reviewStats.set(stats);
            },
            error: (error) => {
                console.error('Failed to load review stats:', error);
            },
        });

        // Check if current user has already reviewed
        this.reviewService.hasUserReviewed(user.id).subscribe({
            next: (hasReviewed) => {
                this.hasUserReviewed.set(hasReviewed);
            },
        });
    }

    toggleReviewForm(): void {
        this.showReviewForm.update(show => !show);
    }

    onSubmitReview(review: ReviewCreate): void {
        const user = this.currentUser();
        if (!user?.id) return;

        this.reviewService.createReview(user.id, review).subscribe({
            next: () => {
                this.showReviewForm.set(false);
                this.loadReviews(); // Reload reviews after submission
            },
            error: (error) => {
                console.error('Failed to submit review:', error);
            },
        });
    }

    onCancelReview(): void {
        this.showReviewForm.set(false);
    }

    getStars(rating: number): boolean[] {
        return Array(5).fill(false).map((_, i) => i < rating);
    }

    getRoundedRating(): number {
        const stats = this.reviewStats();
        return stats ? Math.round(stats.average_rating) : 0;
    }
}

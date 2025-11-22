import { Injectable, inject, signal } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { ReviewCreate, ReviewStats, UserReview } from '../models/review.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class ReviewService {
    private authService = inject(AuthService);

    // Mock storage for reviews (in production, this would be API calls)
    private reviewsCache = signal<UserReview[]>([
        {
            id: 1,
            reviewer_id: 2,
            reviewed_user_id: 1,
            rating: 5,
            comment: 'Świetny współlokator! Zawsze pomaga i jest bardzo przyjazny.',
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            reviewer_name: 'Jan Kowalski'
        },
        {
            id: 2,
            reviewer_id: 3,
            reviewed_user_id: 1,
            rating: 4,
            comment: 'Dobry kolega, czasami głośno słucha muzyki, ale ogólnie polecam.',
            created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            reviewer_name: 'Anna Nowak'
        },
        {
            id: 3,
            reviewer_id: 4,
            reviewed_user_id: 1,
            rating: 5,
            comment: 'Idealny sąsiad z akademika. Bardzo kulturalny i pomocny.',
            created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            reviewer_name: 'Piotr Wiśniewski'
        }
    ]);

    /**
     * Get all reviews for a specific user
     */
    getUserReviews(userId: number): Observable<UserReview[]> {
        const reviews = this.reviewsCache().filter(r => r.reviewed_user_id === userId);
        return of(reviews).pipe(delay(300)); // Simulate API delay
    }

    /**
     * Get review statistics for a user
     */
    getUserReviewStats(userId: number): Observable<ReviewStats> {
        const reviews = this.reviewsCache().filter(r => r.reviewed_user_id === userId);

        if (reviews.length === 0) {
            return of({
                average_rating: 0,
                total_reviews: 0,
                rating_distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
            }).pipe(delay(300));
        }

        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

        reviews.forEach(r => {
            distribution[r.rating as keyof typeof distribution]++;
        });

        return of({
            average_rating: totalRating / reviews.length,
            total_reviews: reviews.length,
            rating_distribution: distribution
        }).pipe(delay(300));
    }

    /**
     * Create a new review
     */
    createReview(userId: number, review: ReviewCreate): Observable<UserReview> {
        const currentUser = this.authService.currentUser();
        if (!currentUser) {
            throw new Error('User not authenticated');
        }

        const newReview: UserReview = {
            id: Math.max(...this.reviewsCache().map(r => r.id || 0), 0) + 1,
            reviewer_id: currentUser.id,
            reviewed_user_id: userId,
            rating: review.rating,
            comment: review.comment,
            created_at: new Date().toISOString(),
            reviewer_name: `${currentUser.first_name} ${currentUser.last_name}`.trim() || currentUser.username
        };

        this.reviewsCache.update(reviews => [newReview, ...reviews]);
        return of(newReview).pipe(delay(300));
    }

    /**
     * Check if current user has already reviewed a specific user
     */
    hasUserReviewed(userId: number): Observable<boolean> {
        const currentUser = this.authService.currentUser();
        if (!currentUser) {
            return of(false);
        }

        const hasReviewed = this.reviewsCache().some(
            r => r.reviewer_id === currentUser.id && r.reviewed_user_id === userId
        );

        return of(hasReviewed).pipe(delay(100));
    }
}

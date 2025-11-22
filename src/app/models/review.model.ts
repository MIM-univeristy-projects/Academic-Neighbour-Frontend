/**
 * User review model
 */
export interface UserReview {
    id?: number;
    reviewer_id: number;
    reviewed_user_id: number;
    rating: number;
    comment: string;
    created_at?: string;
    reviewer_name?: string;
}

/**
 * Review creation request model
 */
export interface ReviewCreate {
    rating: number;
    comment: string;
}

/**
 * Review statistics model
 */
export interface ReviewStats {
    average_rating: number;
    total_reviews: number;
    rating_distribution: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
    };
}

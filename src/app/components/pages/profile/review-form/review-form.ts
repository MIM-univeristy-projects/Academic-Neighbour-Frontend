import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReviewCreate } from '../../../../models/review.model';

@Component({
    selector: 'app-review-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
    ],
    templateUrl: './review-form.html',
    styleUrl: './review-form.css',
})
export class ReviewFormComponent {
    private fb = inject(NonNullableFormBuilder);

    // Outputs
    submitReview = output<ReviewCreate>();
    cancelForm = output<void>();

    // State
    selectedRating = 0;
    hoveredRating = 0;

    // Form
    reviewForm = this.fb.group({
        rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
        comment: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    });

    setRating(rating: number): void {
        this.selectedRating = rating;
        this.reviewForm.patchValue({ rating });
    }

    setHoveredRating(rating: number): void {
        this.hoveredRating = rating;
    }

    clearHoveredRating(): void {
        this.hoveredRating = 0;
    }

    getStarIcon(position: number): string {
        const rating = this.hoveredRating || this.selectedRating;
        return position <= rating ? 'star' : 'star_border';
    }

    getStarClass(position: number): string {
        const rating = this.hoveredRating || this.selectedRating;
        return position <= rating ? 'text-amber-500' : 'text-gray-300';
    }

    onSubmit(): void {
        if (this.reviewForm.valid) {
            const review: ReviewCreate = {
                rating: this.reviewForm.value.rating!,
                comment: this.reviewForm.value.comment!.trim(),
            };
            this.submitReview.emit(review);
            this.reviewForm.reset();
            this.selectedRating = 0;
        }
    }

    onCancel(): void {
        this.cancelForm.emit();
        this.reviewForm.reset();
        this.selectedRating = 0;
    }

    get commentControl() {
        return this.reviewForm.controls.comment;
    }

    get isFormValid(): boolean {
        return this.reviewForm.valid;
    }
}

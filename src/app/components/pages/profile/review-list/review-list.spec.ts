import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserReview } from '../../../../models/review.model';
import { ReviewListComponent } from './review-list';

describe('ReviewListComponent', () => {
    let component: ReviewListComponent;
    let fixture: ComponentFixture<ReviewListComponent>;

    const mockReviews: UserReview[] = [
        {
            id: 1,
            reviewer_id: 2,
            reviewed_user_id: 1,
            rating: 5,
            comment: 'Great person!',
            created_at: new Date().toISOString(),
            reviewer_name: 'John Doe'
        }
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReviewListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ReviewListComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('reviews', mockReviews);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display reviews', () => {
        expect(component.reviews().length).toBe(1);
    });
});

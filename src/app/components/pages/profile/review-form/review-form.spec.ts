import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReviewFormComponent } from './review-form';

describe('ReviewFormComponent', () => {
    let component: ReviewFormComponent;
    let fixture: ComponentFixture<ReviewFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReviewFormComponent,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatButtonModule,
                BrowserAnimationsModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ReviewFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set rating when star is clicked', () => {
        component.setRating(4);
        expect(component.selectedRating).toBe(4);
        expect(component.reviewForm.value.rating).toBe(4);
    });

    it('should emit submitReview event when form is valid', () => {
        spyOn(component.submitReview, 'emit');
        component.setRating(5);
        component.reviewForm.patchValue({ comment: 'Great roommate!' });
        component.onSubmit();
        expect(component.submitReview.emit).toHaveBeenCalledWith({
            rating: 5,
            comment: 'Great roommate!'
        });
    });

    it('should not emit submitReview event when form is invalid', () => {
        spyOn(component.submitReview, 'emit');
        component.onSubmit();
        expect(component.submitReview.emit).not.toHaveBeenCalled();
    });
});

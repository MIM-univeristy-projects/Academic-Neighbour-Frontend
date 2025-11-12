import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreatePostDto } from '../../../../models/post.model';

@Component({
    selector: 'app-create-post-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
    ],
    templateUrl: './create-post-form.html',
    styleUrl: './create-post-form.css',
})
export class CreatePostFormComponent {
    @Output() createPost = new EventEmitter<CreatePostDto>();

    postForm: FormGroup;
    isExpanded = false;

    constructor(private fb: FormBuilder) {
        this.postForm = this.fb.group({
            text: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5000)]],
        });
    }

    onFocus(): void {
        this.isExpanded = true;
    }

    onCancel(): void {
        this.isExpanded = false;
        this.postForm.reset();
    }

    onSubmit(): void {
        if (this.postForm.valid) {
            const postData: CreatePostDto = {
                text: this.postForm.value.text.trim(),
            };
            this.createPost.emit(postData);
            this.postForm.reset();
            this.isExpanded = false;
        }
    }

    get text() {
        return this.postForm.get('text');
    }

    get characterCount(): number {
        return this.text?.value?.length || 0;
    }

    get characterCountColor(): string {
        const count = this.characterCount;
        if (count > 4500) return 'text-red-500';
        if (count > 4000) return 'text-orange-500';
        return 'text-gray-500';
    }
}

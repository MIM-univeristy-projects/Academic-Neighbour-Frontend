import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-errors',
  imports: [CommonModule],
  templateUrl: './validation-errors.html',
  styleUrl: './validation-errors.css',
})
export class ValidationErrors {
  /** Kontrolka formularza do obserwowania */
  @Input({ required: true }) control: AbstractControl | null = null;

  /** Polska, przyjazna nazwa kontrolki (np. "Hasło", "Email") */
  @Input() controlName: string = 'To pole';
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-toggle',
  imports: [CommonModule],
  templateUrl: './auth-toggle.html',
  styleUrl: './auth-toggle.css',
})
export class AuthToggle {
/** Jaki formularz jest aktualnie aktywny? */
  @Input({ required: true }) activeForm!: 'login' | 'register';

  /** Emituje zdarzenie, gdy użytkownik chce zmienić formularz */
  @Output() formChange = new EventEmitter<'login' | 'register'>();
}

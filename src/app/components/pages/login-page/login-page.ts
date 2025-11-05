import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

// Importy Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css'] // Zmienione z .scss na .css
})
export class LoginPage {

  // Zmienna do przełączania zakładek
  activeTab: 'login' | 'register' = 'login';

  // Wstrzykiwanie FormBuildera
  private fb = inject(FormBuilder);

  // Zmienna do pokazywania/ukrywania hasła
  hidePassword = true;

  // Definicja formularza reaktywnego
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rememberMe: [false]
  });

  // Metoda do wysyłania formularza
  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Formularz wysłany:', this.loginForm.value);
      // Tutaj logika logowania
    } else {
      console.log('Formularz jest niepoprawny');
    }
  }

  // Metoda do przełączania widoczności hasła
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
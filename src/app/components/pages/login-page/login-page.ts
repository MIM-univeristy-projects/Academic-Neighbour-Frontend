import { Component, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { LoginRequest, RegisterRequest } from '../../../models/auth.model';
import { AuthService } from '../../../services/auth.service';
import { Header } from "../landing-page/header/header";
import { AuthToggle } from './auth-toggle/auth-toggle';
import { LoginForm } from './login-form/login-form';
import { RegisterForm } from './register-form/register-form';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AuthToggle,
    LoginForm,
    RegisterForm,
    Header
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly activeForm = signal<'login' | 'register'>('login');
  readonly apiError = signal<string | null>(null);

  readonly loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  readonly registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]]
  });


  setForm(form: 'login' | 'register') {
    this.activeForm.set(form);
    this.apiError.set(null);
  }


  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      this.apiError.set(null);

      const loginData: LoginRequest = this.loginForm.getRawValue();

      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log('Logowanie udane:', response);
          this.apiError.set(null);
          this.router.navigate(['/feed']);
        },
        error: (error) => this.handleLoginError(error)
      });
    } else {
      console.warn('Formularz logowania jest niepoprawny.');
      this.loginForm.markAllAsTouched();
    }
  }

  private handleLoginError(error: any): void {
    console.error('Błąd logowania:', error);

    switch (error.status) {
      case 422:
        this.handle422Error(error);
        break;
      case 401:
        this.apiError.set('Nieprawidłowy email lub hasło.');
        break;
      case 0:
        this.apiError.set('Nie można połączyć się z serwerem. Sprawdź połączenie internetowe lub spróbuj ponownie później.');
        break;
      case 503:
      case 504:
        this.apiError.set('Serwer jest obecnie niedostępny. Spróbuj ponownie za chwilę.');
        break;
      default:
        if (error.name === 'TimeoutError') {
          this.apiError.set('Przekroczono czas oczekiwania na odpowiedź serwera. Spróbuj ponownie.');
        } else {
          this.apiError.set('Wystąpił błąd podczas logowania. Spróbuj ponownie.');
        }
    }
  }

  private handle422Error(error: any): void {
    const detail = error.error?.detail;
    if (Array.isArray(detail)) {
      const errorMessages = detail.map((err: any) => {
        const field = err.loc?.[1] || 'Pole';
        return `${field}: ${err.msg}`;
      }).join(', ');
      this.apiError.set(errorMessages);
    } else if (typeof detail === 'string') {
      this.apiError.set(detail);
    } else {
      this.apiError.set('Błąd walidacji danych.');
    }
  }

  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      this.apiError.set(null);

      const registerData: RegisterRequest = this.registerForm.getRawValue();

      this.authService.register(registerData).subscribe({
        next: (response) => {
          console.log('Rejestracja udana:', response);
          this.apiError.set(null);
          this.router.navigate(['/feed']);
        },
        error: (error) => this.handleRegisterError(error)
      });
    } else {
      console.warn('Formularz rejestracji jest niepoprawny.');
      this.registerForm.markAllAsTouched();
    }
  }

  private handleRegisterError(error: any): void {
    console.error('Błąd rejestracji:', error);

    switch (error.status) {
      case 422:
        this.handle422Error(error);
        break;
      case 400:
        this.apiError.set(error.error?.detail || 'Nieprawidłowe dane.');
        break;
      case 409:
        this.apiError.set('Użytkownik z tym adresem email już istnieje.');
        break;
      case 0:
        this.apiError.set('Nie można połączyć się z serwerem. Sprawdź połączenie internetowe lub spróbuj ponownie później.');
        break;
      case 503:
      case 504:
        this.apiError.set('Serwer jest obecnie niedostępny. Spróbuj ponownie za chwilę.');
        break;
      default:
        if (error.name === 'TimeoutError') {
          this.apiError.set('Przekroczono czas oczekiwania na odpowiedź serwera. Spróbuj ponownie.');
        } else {
          this.apiError.set('Wystąpił błąd podczas rejestracji. Spróbuj ponownie.');
        }
    }
  }
}
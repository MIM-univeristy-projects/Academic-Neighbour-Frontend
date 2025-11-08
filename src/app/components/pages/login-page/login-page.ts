import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { Header } from "../landing-page/header/header";
import { AuthToggle } from './auth-toggle/auth-toggle';
import { LoginForm } from './login-form/login-form';
import { RegisterForm } from './register-form/register-form';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthToggle,
    LoginForm,
    RegisterForm,
    Header
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage implements OnInit {


  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);


  activeForm = signal<'login' | 'register'>('login');
  apiError = signal<string | null>(null);


  loginForm!: FormGroup;
  registerForm!: FormGroup;

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });


    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]]
    });
  }


  setForm(form: 'login' | 'register') {
    this.activeForm.set(form);
    this.apiError.set(null);
  }


  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      this.apiError.set(null);

      const loginData = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log('Logowanie udane:', response);
          this.apiError.set(null);
          this.router.navigate(['/feed']);
        },
        error: (error) => {
          console.error('Błąd logowania:', error);

          if (error.status === 422) {
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
          } else if (error.status === 401) {
            this.apiError.set('Nieprawidłowy email lub hasło.');
          } else if (error.status === 0) {
            this.apiError.set('Nie można połączyć się z serwerem. Sprawdź połączenie internetowe lub spróbuj ponownie później.');
          } else if (error.name === 'TimeoutError') {
            this.apiError.set('Przekroczono czas oczekiwania na odpowiedź serwera. Spróbuj ponownie.');
          } else if (error.status === 504 || error.status === 503) {
            this.apiError.set('Serwer jest obecnie niedostępny. Spróbuj ponownie za chwilę.');
          } else {
            this.apiError.set('Wystąpił błąd podczas logowania. Spróbuj ponownie.');
          }
        }
      });
    } else {
      console.warn('Formularz logowania jest niepoprawny.');
      this.loginForm.markAllAsTouched();
    }
  }

  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      this.apiError.set(null);

      const registerData = {
        email: this.registerForm.value.email,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        first_name: this.registerForm.value.first_name,
        last_name: this.registerForm.value.last_name
      };

      this.authService.register(registerData).subscribe({
        next: (response) => {
          console.log('Rejestracja udana:', response);
          this.apiError.set(null);
          this.router.navigate(['/feed']);
        },
        error: (error) => {
          console.error('Błąd rejestracji:', error);

          if (error.status === 422) {
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
          } else if (error.status === 400) {
            this.apiError.set(error.error?.detail || 'Nieprawidłowe dane.');
          } else if (error.status === 409) {
            this.apiError.set('Użytkownik z tym adresem email już istnieje.');
          } else if (error.status === 0) {
            this.apiError.set('Nie można połączyć się z serwerem. Sprawdź połączenie internetowe lub spróbuj ponownie później.');
          } else if (error.name === 'TimeoutError') {
            this.apiError.set('Przekroczono czas oczekiwania na odpowiedź serwera. Spróbuj ponownie.');
          } else if (error.status === 504 || error.status === 503) {
            this.apiError.set('Serwer jest obecnie niedostępny. Spróbuj ponownie za chwilę.');
          } else {
            this.apiError.set('Wystąpił błąd podczas rejestracji. Spróbuj ponownie.');
          }
        }
      });
    } else {
      console.warn('Formularz rejestracji jest niepoprawny.');
      this.registerForm.markAllAsTouched();
    }
  }
}
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

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


  activeForm = signal<'login' | 'register'>('login');


  loginForm!: FormGroup;
  registerForm!: FormGroup;

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });


    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', [Validators.required]],
      address2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.pattern('^\\d{2}-\\d{3}$')]],

      checkMeOut: [false]
    });
  }


  setForm(form: 'login' | 'register') {
    this.activeForm.set(form);
  }


  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Logowanie:', this.loginForm.value);
    } else {
      console.warn('Formularz logowania jest niepoprawny.');
      this.loginForm.markAllAsTouched();
    }
  }

  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Rejestracja:', this.registerForm.value);
    } else {
      console.warn('Formularz rejestracji jest niepoprawny.');
      this.registerForm.markAllAsTouched();
    }
  }
}
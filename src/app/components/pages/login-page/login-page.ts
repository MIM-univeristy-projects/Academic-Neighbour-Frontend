import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  AbstractControl,
  ReactiveFormsModule, 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms'; 

import { AuthToggle } from './auth-toggle/auth-toggle';
import { SubmitButton } from './submit-button/submit-button';
import { ValidationErrors } from './validation-errors/validation-errors';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    AuthToggle,
    SubmitButton,
    ValidationErrors
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

  get l_email(): AbstractControl | null { return this.loginForm.get('email'); }
  get l_password(): AbstractControl | null { return this.loginForm.get('password'); }
  get r_email(): AbstractControl | null { return this.registerForm.get('email'); }
  get r_password(): AbstractControl | null { return this.registerForm.get('password'); }
  get r_address(): AbstractControl | null { return this.registerForm.get('address'); }
  get r_city(): AbstractControl | null { return this.registerForm.get('city'); }
  get r_state(): AbstractControl | null { return this.registerForm.get('state'); }
  get r_zip(): AbstractControl | null { return this.registerForm.get('zip'); }

}
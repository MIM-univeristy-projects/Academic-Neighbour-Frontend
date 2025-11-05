import { Routes } from '@angular/router';

export const routes: Routes = [
    { title: 'Home', path: '', loadComponent: () => import('./components/pages/landing-page/landing-page').then(m => m.LandingPage) },
    { title: 'Login', path: 'login', loadComponent: () => import('./components/pages/login-page/login-page').then(m => m.LoginPage) },
    { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
    { path: '**', redirectTo: 'landing-page', pathMatch: 'full' },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
    { title: 'Home', path: '', loadComponent: () => import('./components/pages/landing-page/landing-page').then(m => m.LandingPage) },
    { title: 'Login', path: 'login', loadComponent: () => import('./components/pages/login-page/login-page').then(m => m.LoginPage) },
    { title: 'About Us', path: 'about-us', loadComponent: () => import('./components/pages/about-us-page/about-us-page').then(m => m.AboutUsPage) },
    { title: 'Contact', path: 'contact', loadComponent: () => import('./components/pages/contact-page/contact-page').then(m => m.ContactPage) },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

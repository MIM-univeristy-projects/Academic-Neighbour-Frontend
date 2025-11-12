import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { protectedRoutes } from './routes/protected.routes';
import { publicRoutes } from './routes/public.routes';

export const routes: Routes = [
    // Default root route - redirect to home (landing page)
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },

    // Public routes
    ...publicRoutes,

    // Protected routes (requires authentication)
    {
        path: '',
        canActivate: [authGuard],
        children: protectedRoutes
    },

    // Wildcard - redirect to home
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
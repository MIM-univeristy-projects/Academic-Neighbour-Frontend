import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { protectedRoutes } from './routes/protected.routes';
import { publicRoutes } from './routes/public.routes';

export const routes: Routes = [
    ...publicRoutes,

    {
        path: '',
        canActivate: [authGuard],
        children: protectedRoutes
    },

    { path: '**', redirectTo: '', pathMatch: 'full' },
];
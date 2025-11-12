import { Routes } from '@angular/router';

export const protectedRoutes: Routes = [
    {
        title: 'Feed',
        path: 'feed',
        loadComponent: () => import('../components/pages/feed/feed').then(m => m.Feed)
    },
    {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
    },
];
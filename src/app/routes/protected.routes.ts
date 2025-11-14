import { Routes } from '@angular/router';

export const protectedRoutes: Routes = [
    {
        title: 'Feed',
        path: 'feed',
        loadComponent: () => import('../components/pages/feed/feed').then(m => m.Feed)
    },
    {
        title: 'Znajomi',
        path: 'friends',
        // Ta linia ładuje nasz nowy moduł routingu dla znajomych
        loadChildren: () => import('../components/pages/friends/friends.routes').then(m => m.friendsRoutes)
    },
    {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
    },
];
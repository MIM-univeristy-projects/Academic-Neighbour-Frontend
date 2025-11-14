import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserRead } from '../models/auth.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private http = inject(HttpClient);
    private readonly apiUrl = environment.apiUrl;

    /**
     * Get current authenticated user information
     * @returns Observable of the current user
     */
    getCurrentUser(): Observable<UserRead> {
        return this.http.get<UserRead>(`${this.apiUrl}/users/me`).pipe(
            catchError(error => {
                console.error('Failed to fetch current user:', error);
                return throwError(() => error);
            })
        );
    }
}

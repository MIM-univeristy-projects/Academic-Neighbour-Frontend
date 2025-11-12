import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse
} from '../models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);

    private apiUrl = environment.apiUrl;
    private readonly TOKEN_KEY = 'access_token';

    register(data: RegisterRequest): Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(`${this.apiUrl}/users/register`, data).pipe(
            tap(response => {
                this.saveToken(response.access_token);
            })
        );
    }

    login(data: LoginRequest): Observable<LoginResponse> {
        const formData = new URLSearchParams();
        formData.append('username', data.username);
        formData.append('password', data.password);
        formData.append('grant_type', 'password');

        return this.http.post<LoginResponse>(`${this.apiUrl}/auth/token`, formData.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).pipe(
            tap(response => {
                this.saveToken(response.access_token);
            })
        );
    }

    private saveToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    logout(): void {
        this.removeToken();
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}

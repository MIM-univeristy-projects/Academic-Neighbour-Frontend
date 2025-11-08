export interface RegisterRequest {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    username: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    role: string;
    is_active: boolean;
    created_at: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: User;
}

export type RegisterResponse = AuthResponse
export type LoginResponse = AuthResponse

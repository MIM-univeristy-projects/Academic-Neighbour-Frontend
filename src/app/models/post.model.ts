export interface Post {
    id: number;
    text: string;
    author_id: number;
    created_at: string;
}

export interface Author {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    role: string;
    is_active: boolean;
    created_at: string;
}

export interface PostWithAuthor {
    id: number;
    text: string;
    author_id: number;
    created_at: string;
    author: Author;
}

export interface CreatePostDto {
    text: string;
}

export interface Post {
    id: number;
    text: string;
    author_id: number;
    created_at: string;
}

export interface CreatePostDto {
    text: string;
}

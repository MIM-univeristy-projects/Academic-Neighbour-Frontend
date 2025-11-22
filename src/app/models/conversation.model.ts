/**
 * Conversation read model from API
 */
export interface Conversation {
    id: number;
    title: string;
    created_at: string;
}

/**
 * Conversation creation request model
 */
export interface ConversationCreate {
    title: string;
    participant_ids: number[];
}

/**
 * Message read model with sender information
 */
export interface Message {
    id: number;
    content: string;
    sender_id: number;
    sender_name: string;
    conversation_id: number;
    created_at: string;
}

/**
 * Message creation request model
 */
export interface MessageCreate {
    content: string;
}

import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { Conversation, Message } from '../../../models/conversation.model';
import { AuthService } from '../../../services/auth.service';
import { ConversationService } from '../../../services/conversation.service';
import { ConnectionStatus, WebSocketService } from '../../../services/websocket.service';
import { FeedHeaderComponent } from '../feed/feed-header/feed-header';

@Component({
    selector: 'app-messages',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatBadgeModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        FeedHeaderComponent
    ],
    templateUrl: './messages.html',
    styleUrl: './messages.css',
})
export class MessagesPage implements OnInit, OnDestroy {
    private conversationService = inject(ConversationService);
    private wsService = inject(WebSocketService);
    private authService = inject(AuthService);

    // State signals
    conversations = signal<Conversation[]>([]);
    selectedConversation = signal<Conversation | null>(null);
    messages = signal<Message[]>([]);
    messageInput = signal<string>('');
    isLoadingConversations = signal<boolean>(false);
    isLoadingMessages = signal<boolean>(false);
    isSendingMessage = signal<boolean>(false);

    // WebSocket connection status
    readonly connectionStatus = this.wsService.connectionStatus;
    readonly currentUser = this.authService.currentUser;

    // Computed values
    readonly isConnected = computed(() =>
        this.connectionStatus() === ConnectionStatus.CONNECTED
    );
    readonly isConnecting = computed(() =>
        this.connectionStatus() === ConnectionStatus.CONNECTING
    );
    readonly hasSelectedConversation = computed(() =>
        this.selectedConversation() !== null
    );

    // Expose enum to template
    readonly ConnectionStatus = ConnectionStatus;

    // Subscriptions
    private subscriptions: Subscription[] = [];

    constructor() {
        // Auto-scroll to bottom when new messages arrive
        effect(() => {
            const msgs = this.messages();
            if (msgs.length > 0) {
                setTimeout(() => this.scrollToBottom(), 100);
            }
        });
    }

    ngOnInit(): void {
        this.loadConversations();
        this.setupWebSocketSubscriptions();
    }

    ngOnDestroy(): void {
        this.wsService.disconnect();
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    /**
     * Setup WebSocket message subscriptions
     */
    private setupWebSocketSubscriptions(): void {
        // Subscribe to incoming messages
        this.subscriptions.push(
            this.wsService.messages$.subscribe((message) => {
                this.messages.update(msgs => [...msgs, message]);
            })
        );

        // Subscribe to errors
        this.subscriptions.push(
            this.wsService.errors$.subscribe((error) => {
                console.error('WebSocket error:', error);
                alert(error);
            })
        );

        // Subscribe to user left events
        this.subscriptions.push(
            this.wsService.userLeft$.subscribe((data) => {
                console.log(`User ${data.username} left the conversation`);
            })
        );
    }

    /**
     * Load all conversations
     */
    loadConversations(): void {
        this.isLoadingConversations.set(true);
        this.conversationService.getConversations().subscribe({
            next: (conversations) => {
                this.conversations.set(conversations);
                this.isLoadingConversations.set(false);
            },
            error: (error) => {
                console.error('Error loading conversations:', error);
                this.isLoadingConversations.set(false);
            }
        });
    }

    /**
     * Select a conversation and load its messages
     */
    selectConversation(conversation: Conversation): void {
        // Disconnect from previous conversation
        if (this.wsService.isConnected()) {
            this.wsService.disconnect();
        }

        this.selectedConversation.set(conversation);
        this.loadMessages(conversation.id);

        // Connect to WebSocket for real-time updates
        this.wsService.connect(conversation.id);
    }

    /**
     * Load messages for a conversation
     */
    private loadMessages(conversationId: number): void {
        this.isLoadingMessages.set(true);
        this.conversationService.getMessages(conversationId).subscribe({
            next: (messages) => {
                this.messages.set(messages);
                this.isLoadingMessages.set(false);
            },
            error: (error) => {
                console.error('Error loading messages:', error);
                this.isLoadingMessages.set(false);
            }
        });
    }

    /**
     * Send a message
     */
    sendMessage(): void {
        const content = this.messageInput().trim();
        const conversation = this.selectedConversation();

        if (!content || !conversation) return;

        // If WebSocket is connected, send via WebSocket
        if (this.wsService.isConnected()) {
            this.wsService.sendMessage(content);
            this.messageInput.set('');
        } else {
            // Fallback to REST API
            this.sendMessageViaREST(conversation.id, content);
        }
    }

    /**
     * Send message via REST API (fallback)
     */
    private sendMessageViaREST(conversationId: number, content: string): void {
        this.isSendingMessage.set(true);
        this.conversationService.sendMessage(conversationId, { content }).subscribe({
            next: (message) => {
                this.messages.update(msgs => [...msgs, message]);
                this.messageInput.set('');
                this.isSendingMessage.set(false);
            },
            error: (error) => {
                console.error('Error sending message:', error);
                alert('Nie udało się wysłać wiadomości');
                this.isSendingMessage.set(false);
            }
        });
    }

    /**
     * Format date for display
     */
    formatDate(dateString: string): string {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'Teraz';
        if (diffMins < 60) return `${diffMins}min temu`;
        if (diffHours < 24) return `${diffHours}h temu`;
        if (diffDays < 7) return `${diffDays}d temu`;

        return date.toLocaleDateString('pl-PL', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    /**
     * Format time for message
     */
    formatTime(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleTimeString('pl-PL', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    /**
     * Check if message is from current user
     */
    isMyMessage(message: Message): boolean {
        const user = this.currentUser();
        return user ? message.sender_id === user.id : false;
    }

    /**
     * Get initials from name
     */
    getInitials(name: string): string {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    }

    /**
     * Scroll chat to bottom
     */
    private scrollToBottom(): void {
        const chatContainer = document.querySelector('.chat-messages');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }

    /**
     * Reconnect to WebSocket
     */
    reconnect(): void {
        const conversation = this.selectedConversation();
        if (conversation) {
            this.wsService.connect(conversation.id);
        }
    }
}

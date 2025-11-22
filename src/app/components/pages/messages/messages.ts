import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FeedHeaderComponent } from '../feed/feed-header/feed-header';

@Component({
    selector: 'app-messages',
    standalone: true,
    imports: [CommonModule, MatIconModule, MatButtonModule, FeedHeaderComponent],
    templateUrl: './messages.html',
    styleUrl: './messages.css',
})
export class MessagesPage {
}

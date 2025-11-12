import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'app-feed-header',
    standalone: true,
    imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, MatMenuModule, MatDividerModule],
    templateUrl: './feed-header.html',
    styleUrl: './feed-header.css',
})
export class FeedHeaderComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/home']);
    }
}

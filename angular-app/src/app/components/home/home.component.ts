import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

import { ShortedUrlService } from '../../services/shorted-url.service';
import { ShortedUrl } from '../../models/shortedUrl';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  urlService = inject(ShortedUrlService)
  authService = inject(AuthService)
  router = inject(Router)
  urls: ShortedUrl[] = [];
  columns = ['id', 'author', 'url', 'date'];

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.columns.push('actions')
    }
    setInterval(() => {
      this.urlService.getCatalog().subscribe(res => {
        if (Array.isArray(res)) {
          this.urls = res;
        } else this.urls = [res];
      });
    }, 500)
  }

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  deleteUrl(id: string): void {
    this.urlService.deleteUrl(id).subscribe(
      () => {
        // Deletion successful, navigate to home page
        this.router.navigate(['']);
      },
      (error) => {
        // Handle deletion error
        console.error('Error deleting URL:', error);
      }
    );
  }

  navigateToAboutUrl(id: string): void {
    this.router.navigate(['/abouturl', id]);
  }

  redirectToShortUrl(code: string) {
    window.location.href = code;
  }
}

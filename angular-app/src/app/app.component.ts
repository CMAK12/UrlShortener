import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { ShortedUrl } from './models/shortedUrl';
import { ShortedUrlService } from './services/shorted-url.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  authService = inject(AuthService)
  urlService = inject(ShortedUrlService)
  router = inject(Router)

  urls: ShortedUrl[] = [];
  columns = ['id', 'author', 'url', 'date', 'actions'];

  ngOnInit(): void {
    this.urlService.getCatalog().subscribe(res => {
      if (Array.isArray(res)) {
        this.urls = res;
      } else {
        this.urls = [res];
      }
    });
  }

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([''])
  }
}
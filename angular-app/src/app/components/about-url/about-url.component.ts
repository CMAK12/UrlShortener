import { Component, OnInit, inject } from '@angular/core';

import { ShortedUrlService } from '../../services/shorted-url.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ShortedUrl } from '../../models/shortedUrl';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-url',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './about-url.component.html',
  styleUrl: './about-url.component.css'
})
export class AboutUrlComponent implements OnInit {
  route = inject(ActivatedRoute)
  router = inject(Router)
  authService = inject(AuthService)
  urlService = inject(ShortedUrlService)
  shortUrl: ShortedUrl;
  id: string;

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.route.params.subscribe(params => {
        this.id = params['id']
      })
      this.urlService.getUrl(this.id).subscribe(res => {
        this.shortUrl = res;
        console.log(res, this.shortUrl);
      }, error => {
        console.error('Error loading short URL:', error);
      })
    }
    else {
      alert("You're unathorized")
      this.router.navigate(['/login'])
    }
  }

  public get isLoggedIn() {
    return this.authService.isAuthenticated();
  }
}

import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ShortedUrlService } from '../../services/shorted-url.service';
import { ShortedUrlRequest } from '../../models/shortenUrlRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-url-form',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './new-url-form.component.html',
  styleUrl: './new-url-form.component.css'
})
export class NewUrlFormComponent {
  builder = inject(FormBuilder);
  authService = inject(AuthService)
  urlService = inject(ShortedUrlService)
  router = inject(Router)

  urlForm = this.builder.group({
    longUrl: ['', Validators.required],
  });

  addUrl(): void {
    const url = this.urlForm.value.longUrl;
    const sur: ShortedUrlRequest = { Url: url }

    this.urlService.createShortedUrl(sur).subscribe(res => {
      console.log("New short URL has been created");
    })
    this.router.navigate([''])
  }

  public get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}

import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  builder = inject(FormBuilder);
  authService = inject(AuthService)
  router = inject(Router)

  loginForm = this.builder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onLogin(): void {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    
    this.authService.login(username, password).subscribe(res => {
      console.log("Authorization has been successful");
    }, error => {
      alert("Wrong username or password.")
    })
    this.router.navigate([''])
  }

  public get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}

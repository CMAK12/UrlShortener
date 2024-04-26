import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Token } from '../models/token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt'; // Импортируем JwtModule и JwtHelperService
import { Router } from '@angular/router';

export const ACCESS_TOKEN_KEY = 'shortedUrl_access_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrl = 'https://localhost:7036';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(username: string, password: string): Observable<Token> {
    return this.http.post<Token>(this.apiUrl + '/api/auth/login', {
      username: username,
      password: password,
    }).pipe(
      tap(token => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
      })
    );
  }

  isAuthenticated(): boolean {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token !== null && !jwtHelper.isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate([''])
  }
}

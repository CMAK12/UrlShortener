import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShortedUrl } from '../models/shortedUrl';
import { ACCESS_TOKEN_KEY } from './auth.service';
import { ShortedUrlRequest } from '../models/shortenUrlRequest';

@Injectable({
  providedIn: 'root'
})
export class ShortedUrlService {
  apiUrl = 'https://localhost:7036';

  constructor(private http: HttpClient) { }

  redirectToShortUrl(code: string) {
    return this.http.get<ShortedUrl>(`${this.apiUrl}/api/shortenerurl/navigator/${code}`)
  }

  getCatalog(): Observable<ShortedUrl> {
    return this.http.get<ShortedUrl>(`${this.apiUrl}/api/shortenerurl/get`)
  }

  getUrl(id: string): Observable<ShortedUrl> {
    return this.http.get<ShortedUrl>(`${this.apiUrl}/api/shortenerurl/get/${id}`)
  }

  createShortedUrl(sur: ShortedUrlRequest) {
    return this.http.post<ShortedUrl>(`${this.apiUrl}/api/shortenerurl/shorten`, {
      url: sur.Url,
      token: localStorage.getItem(ACCESS_TOKEN_KEY),
    })
  }

  deleteUrl(id: string) {
    return this.http.delete<ShortedUrl>(`${this.apiUrl}/api/shortenerurl/delete/${id}`)
  }
}

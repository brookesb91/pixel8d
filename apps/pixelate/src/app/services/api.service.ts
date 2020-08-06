import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
  url = environment.api_url;

  get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return new HttpHeaders(headersConfig);
  }

  constructor(private http: HttpClient) {}

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.url}${path}`, {
      params,
      headers: this.headers,
    });
  }

  post<T>(path: string, body: object = {}): Observable<T> {
    return this.http.post<T>(`${this.url}${path}`, JSON.stringify(body), {
      headers: this.headers,
    });
  }
}

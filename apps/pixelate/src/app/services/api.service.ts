import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
  url = environment.api_url;

  constructor(private http: HttpClient) {}

  get(path: string, params: HttpParams = new HttpParams()) {
    return this.http.get(`${this.url}${path}`, { params });
  }

  post(path: string, body: object = {}) {
    return this.http.post(`${this.url}${path}`, JSON.stringify(body));
  }
}

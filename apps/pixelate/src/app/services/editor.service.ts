import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class EditorService {
  constructor(private api: ApiService) {}

  save(payload: any) {
    return this.api.post('/save', payload);
  }

  load(slug: string) {
    return this.api.get(`/sprites/${slug}`);
  }
}

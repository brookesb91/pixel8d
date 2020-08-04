import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { toHttpParams, Sprite } from '../shared';
import { ApiService } from './api.service';

@Injectable()
export class GalleryService {
  constructor(private api: ApiService) {}

  query(query: any) {
    return this.api.get<{ sprites: { items: Sprite[]; total: number } }>(
      '/api/gallery',
      toHttpParams(query)
    );
  }
}

import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { Sprite } from '../shared';

@Injectable()
export class EditorService {
  constructor(private api: ApiService) {}

  save(payload: any) {
    return this.api.post<{ sprite: Sprite }>('/save', payload);
  }

  load(slug: string) {
    return this.api.get<{ sprite: Sprite }>(`/sprites/${slug}`);
  }
}

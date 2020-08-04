import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class GalleryEffects {
  $load;

  $setPage$;

  constructor(private actions$: Actions) {}
}

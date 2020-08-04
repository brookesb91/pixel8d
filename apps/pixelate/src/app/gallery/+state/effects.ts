import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { withLatestFrom, concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { GalleryActions } from './actions';
import { GalleryFacade } from './facade';
import { GalleryService } from '../../services';

@Injectable()
export class GalleryEffects {
  $load = createEffect(() =>
    this.actions$.pipe(
      ofType(GalleryActions.loadSprites),
      withLatestFrom(this.facade.query$),
      concatMap(([_, query]) =>
        this.galleryService.query(query).pipe(
          map((data) => GalleryActions.loadSpritesSuccess(data.sprites)),
          catchError((error) => of(GalleryActions.loadSpritesFail({ error })))
        )
      )
    )
  );

  $setPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GalleryActions.setPage),
      map(() => GalleryActions.loadSprites())
    )
  );

  constructor(
    private actions$: Actions,
    private facade: GalleryFacade,
    private galleryService: GalleryService
  ) {}
}

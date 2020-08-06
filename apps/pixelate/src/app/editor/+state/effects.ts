import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { EditorService } from '../../services';
import { EditorFacade } from './facade';
import { switchMap, map, concatMap, withLatestFrom, tap } from 'rxjs/operators';
import { EditorActions } from './actions';
import { Router } from '@angular/router';

@Injectable()
export class EditorEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.loadSprite),
      switchMap((action) =>
        this.service
          .load(action.slug)
          .pipe(
            map(({ sprite }) => EditorActions.loadSpriteSuccess({ sprite }))
          )
      )
    )
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.save),
      withLatestFrom(this.editor.sprite$),
      concatMap(([_, payload]) =>
        this.service
          .save(payload)
          .pipe(map(({ sprite }) => EditorActions.saveSuccess({ sprite })))
      )
    )
  );

  saveSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EditorActions.saveSuccess),
        tap(({ sprite }) => this.router.navigate(['/editor', sprite.slug]))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private service: EditorService,
    private editor: EditorFacade,
    private router: Router
  ) {}
}

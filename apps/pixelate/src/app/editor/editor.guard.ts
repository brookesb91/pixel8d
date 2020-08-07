import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { EditorFacade } from './+state';
import { filter, take } from 'rxjs/operators';

@Injectable()
export class EditorGuard implements CanActivate {
  constructor(private editor: EditorFacade) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const slug = route.params['slug'];

    if (slug) {
      this.editor.load(slug);
    }

    return true;
  }
}

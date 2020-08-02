import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { HeaderComponent, MenuComponent } from './layout';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { SharedModule } from './shared';

@NgModule({
  declarations: [HeaderComponent, MenuComponent, AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    StoreModule.forRoot(
      {},
      { metaReducers: !environment.production ? [storeFreeze] : [] }
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    RouterModule.forRoot([
      {
        path: 'editor',
        loadChildren: () =>
          import('./editor/editor.module').then((i) => i.EditorModule),
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

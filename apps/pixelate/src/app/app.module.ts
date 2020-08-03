import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { HeaderComponent, MenuComponent, NavigationComponent } from './layout';
import { ApiService, EditorService, GalleryService } from './services';
import { SharedModule } from './shared';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    NavigationComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot(
      {},
      { metaReducers: !environment.production ? [storeFreeze] : [] }
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    RouterModule.forRoot([
      {
        path: 'gallery',
        loadChildren: () =>
          import('./gallery/gallery.module').then((i) => i.GalleryModule),
      },
      {
        path: 'editor',
        loadChildren: () =>
          import('./editor/editor.module').then((i) => i.EditorModule),
      },
    ]),
  ],
  providers: [ApiService, EditorService, GalleryService],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {
  FEATURE_NAME,
  galleryReducer,
  GalleryEffects,
  GalleryFacade,
} from './+state';
import { GalleryComponent } from './gallery.component';
import { GalleryItemComponent } from './item';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [GalleryComponent, GalleryItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(FEATURE_NAME, galleryReducer),
    EffectsModule.forFeature([GalleryEffects]),
    RouterModule.forChild([{ path: '', component: GalleryComponent }]),
  ],
  exports: [],
  providers: [GalleryFacade],
})
export class GalleryModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {
  FEATURE_NAME,
  galleryReducer,
  GalleryEffects,
  GalleryFacade,
} from './+state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(FEATURE_NAME, galleryReducer),
    EffectsModule.forFeature([GalleryEffects]),
  ],
  exports: [],
  providers: [GalleryFacade],
})
export class GalleryModule {}

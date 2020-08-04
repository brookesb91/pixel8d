import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';
import { HighlightCanvasDirective } from './ui';
import {
  FEATURE_NAME,
  EditorFacade,
  editorReducer,
  EditorEffects,
} from './+state';
import { EditorComponent } from './editor.component';

@NgModule({
  declarations: [EditorComponent, HighlightCanvasDirective],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(FEATURE_NAME, editorReducer),
    EffectsModule.forFeature([EditorEffects]),
    RouterModule.forChild([{ path: '', component: EditorComponent }]),
  ],
  exports: [],
  providers: [EditorFacade],
})
export class EditorModule {}

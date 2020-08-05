import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';
import { HighlightCanvasDirective } from './ui';
import { EditorStageComponent } from './stage';
import {
  FEATURE_NAME,
  EditorFacade,
  editorReducer,
  EditorEffects,
} from './+state';
import { EditorComponent } from './editor.component';
import { EditorGuard } from './editor.guard';

@NgModule({
  declarations: [
    EditorComponent,
    EditorStageComponent,
    HighlightCanvasDirective,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(FEATURE_NAME, editorReducer),
    EffectsModule.forFeature([EditorEffects]),
    RouterModule.forChild([{ path: '', component: EditorComponent }]),
  ],
  exports: [],
  providers: [EditorFacade, EditorGuard],
})
export class EditorModule {}

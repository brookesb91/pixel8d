import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared';

import { EditorFacade, editorReducer } from './+state';
import { EditorComponent } from './editor.component';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('editor', editorReducer),
    RouterModule.forChild([{ path: '', component: EditorComponent }]),
  ],
  exports: [],
  providers: [EditorFacade],
})
export class EditorModule {}

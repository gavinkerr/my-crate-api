import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { RecordListComponent } from './record-list/record-list.component';
import { RecordEditorComponent } from './record-list/record-editor/record-editor.component';
import { HomeComponent } from './home/home.component';
import {RecordEditItemResolver} from './resolvers/record-edit-item.resolver';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'record-list', component: RecordListComponent, children: [
    { path: 'new', component: RecordEditorComponent, resolve: {edit: RecordEditItemResolver} },
    { path: ':id', component: RecordEditorComponent, resolve: {edit: RecordEditItemResolver} }
  ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

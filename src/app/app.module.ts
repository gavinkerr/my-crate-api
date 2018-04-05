import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RecordListComponent } from './record-list/record-list.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { reducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { RecordEditorComponent } from './record-list/record-editor/record-editor.component';
import {RecordEditItemResolver} from './resolvers/record-edit-item.resolver';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    RecordListComponent,
    HeaderComponent,
    HomeComponent,
    RecordEditorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    NgbModule.forRoot()
  ],
  providers: [RecordEditItemResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }

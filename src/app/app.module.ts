import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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

import { AuthEffects } from './auth/store/auth.effects';
import { RecordEffects } from './record-list/store/records.effects';

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
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, RecordEffects]),
    NgbModule.forRoot()
  ],
  providers: [RecordEditItemResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }

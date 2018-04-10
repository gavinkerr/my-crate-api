import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecordsActions from '../record-list/store/records.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSaveData() {
    this.store.dispatch(new RecordsActions.StoreRecords());
  }

  onFetchData() {
    this.store.dispatch(new RecordsActions.FetchRecords());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

}

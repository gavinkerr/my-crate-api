import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as RecordsActions from './records.actions';
import { Record } from '../../models/record.model';
import * as fromRecord from './records.reducers';

@Injectable()
export class RecordEffects {
  @Effect()
  recordFetch = this.actions$
    .ofType(RecordsActions.FETCH_RECORDS)
    .switchMap((action: RecordsActions.FetchRecords) => {
      return this.httpClient.get<Record[]>('https://my-crate-v1.firebaseio.com//records.json', {
        observe: 'body',
        responseType: 'json'
      });
    })
    .map(
      (records) => {
        console.log(records);
        return {
          type: RecordsActions.SET_RECORDS,
          payload: records
        };
      }
    );

  @Effect({dispatch: false})
  recordStore = this.actions$
    .ofType(RecordsActions.STORE_RECORDS)
    .withLatestFrom(this.store.select('records'))
    .switchMap(([action, state]) => {
      const req = new HttpRequest('PUT', 'https://my-crate-v1.firebaseio.com/records.json', state.records, {reportProgress: true});
      return this.httpClient.request(req);
    });

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecord.FeatureState>) {}
}

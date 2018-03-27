import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Resolve , ActivatedRouteSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';

// import { IAppState } from './app.state';
 import * as recordActions from '../record-list/store/records.actions';
 import { Record } from '../models/record.model';
 import * as fromRecords from '../record-list/store/records.reducers';

@Injectable()
export class RecordEditItemResolver implements Resolve<boolean> {
  constructor( private store: Store<fromRecords.FeatureState>) {
  }

  resolve(route: ActivatedRouteSnapshot): boolean {
    if ((route.paramMap.get('id') || '') === '') {
      this.store.dispatch(new recordActions.ResetEditedRecord());
    } else {
      this.store.dispatch(new recordActions.SetEditedRecord(+route.paramMap.get('id')));
    }
    return true;
  }

  initData(index: number): void {
  }
}

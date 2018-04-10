import { ActionReducerMap } from '@ngrx/store';

import * as fromRecords from '../record-list/store/records.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

export interface AppState {
  records: fromRecords.State;
  auth: fromAuth.State;
}

 export const reducers: ActionReducerMap<AppState> = {
   records: fromRecords.recordsReducer,
   auth: fromAuth.authReducer
 };

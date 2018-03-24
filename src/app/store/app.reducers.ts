import { ActionReducerMap } from '@ngrx/store';

import * as fromRecords from '../record-list/store/records.reducers';

export interface AppState {
  records: fromRecords.State;
}

 export const reducers: ActionReducerMap<AppState> = {
   records: fromRecords.recordsReducer,
 };

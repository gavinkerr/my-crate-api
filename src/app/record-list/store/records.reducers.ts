 import { Record } from '../../models/record.model';
 import * as RecordsActions from './records.actions';
 import * as fromApp from '../../store/app.reducers';

 export interface FeatureState extends fromApp.AppState {
  records: State;
 }

 export interface State {
   recordToEdit: Record;
   records: Record[];
 }

 function getEmptyRecord(): Record  {
  return new Record('', '', '' , '', '');
 }

 const initialState: State = {
  recordToEdit: getEmptyRecord(),
  records: [
    new Record('Hello', 'Lionel Richie',
     null, 'Rnb', 'Pop', null)]
 };


 export function recordsReducer(state = initialState,
    action: RecordsActions.RecordsActions) {
   switch (action.type) {
     case (RecordsActions.SET_RECORDS):
       return {
         ...state,
         records: [...action.payload]
       };
     case (RecordsActions.ADD_RECORD):
       return {
         ...state,
         records: [...state.records, action.payload]
       };
     case (RecordsActions.UPDATE_RECORD):
       const record = state.records[action.payload.index];
       const updatedRecord = {
         ...record,
         ...action.payload.updatedRecord
       };
       const records = [...state.records];
       records[action.payload.index] = updatedRecord;
       return {
         ...state,
         records: records
       };
     case (RecordsActions.DELETE_RECORD):
       const oldRecords = [...state.records];
       oldRecords.splice(action.payload, 1);
       return {
         ...state,
         records: oldRecords
       };
      case (RecordsActions.SET_EDITED_RECORD):
       const edited = {...state.records[action.payload]};
       return {
         ...state,
         recordToEdit: edited
       };
       case (RecordsActions.RESET_EDITED_RECORD):
       return {
         ...state,
         recordToEdit: getEmptyRecord()
       };
     default:
       return state;
   }
 }

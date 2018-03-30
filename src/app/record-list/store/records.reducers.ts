 import {Guid} from '../../tools/guid.class';
 import { Record } from '../../models/record.model';
 import * as RecordsActions from './records.actions';
 import * as fromApp from '../../store/app.reducers';

 export interface FeatureState extends fromApp.AppState {
  records: State;
 }

 export interface State {
   editIndex: number;
   recordToEdit: Record;
   records: Record[];
 }

 function getEmptyRecord(): Record  {
  return new Record(Guid.newGuid(), '', '', '' , '', '');
 }

 const initialState: State = {
  editIndex: -1,
  recordToEdit: getEmptyRecord(),
  records: [
    new Record(Guid.newGuid(), 'Hello', 'Lionel Richie',
     null, 'Rnb', 'Pop', null)]
 };


function doUpdate(state: State, index: number, update: Record): State {
  const record = state.records[index];
    const updatedRecord = {
      ...record,
      ...update
    };
    const records = [...state.records];
    records[index] = updatedRecord;
    return {
      ...state,
      records: records
    };
}

function doAdd(state: State, update: Record): State {
  return {
    ...state,
    records: [...state.records, update]
  };
}

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
     return doUpdate(state,
      action.payload.index,
      action.payload.updatedRecord);
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
         recordToEdit: edited,
         editIndex: action.payload,
       };
       case (RecordsActions.COMMIT_EDITED_RECORD):
       return state.editIndex > -1 ?
        {...doUpdate(state,
          state.editIndex,
          action.payload),
          recordToEdit: action.payload
        } :
        {...doAdd(state,
          action.payload)}
        ;
       case (RecordsActions.RESET_EDITED_RECORD):
       return {
         ...state,
         recordToEdit: getEmptyRecord(),
         editIndex: -1
       };
     default:
       return state;
   }
 }

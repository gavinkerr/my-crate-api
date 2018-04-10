import { Action } from '@ngrx/store';

import { Record } from '../../models/record.model';

export const SET_RECORDS = 'SET_RECORDS';
export const ADD_RECORD = 'ADD_RECORD';
export const UPDATE_RECORD = 'UPDATE_RECORD';
export const DELETE_RECORD = 'DELETE_RECORD';
export const SET_EDITED_RECORD = 'SET_EDITED_RECORD';
export const RESET_EDITED_RECORD = 'RESET_EDITED_RECORD';
export const COMMIT_EDITED_RECORD = 'COMMIT_EDITED_RECORD';
export const STORE_RECORDS = 'STORE_RECORDS';
export const FETCH_RECORDS = 'FETCH_RECORDS';

export class SetRecords implements Action {
  readonly type = SET_RECORDS;

  constructor(public payload: Record[]) {}
}

export class AddRecord implements Action {
  readonly type = ADD_RECORD;

  constructor(public payload: Record) {}
}

export class UpdateRecord implements Action {
  readonly type = UPDATE_RECORD;

  constructor(public payload: {index: number, updatedRecord: Record}) {}
}

export class DeleteRecord implements Action {
  readonly type = DELETE_RECORD;

  constructor(public payload: number) {}
}

export class SetEditedRecord implements Action {
  readonly type = SET_EDITED_RECORD;

  constructor(public payload: number) {}
}

export class ResetEditedRecord implements Action {
  readonly type = RESET_EDITED_RECORD;

  constructor() {}
}

export class CommitEditedRecord implements Action {
  readonly type = COMMIT_EDITED_RECORD;

  constructor(public payload: Record) {}
}

 export class StoreRecords implements Action {
   readonly type = STORE_RECORDS;
 }

 export class FetchRecords implements Action {
   readonly type = FETCH_RECORDS;
 }

export type RecordsActions = SetRecords |
  AddRecord |
  UpdateRecord |
  DeleteRecord |
  SetEditedRecord |
  ResetEditedRecord |
  CommitEditedRecord|
  StoreRecords |
  FetchRecords;

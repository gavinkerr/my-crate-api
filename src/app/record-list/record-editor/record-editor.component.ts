import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as RecordActions from '../store/records.actions';
import * as fromRecords from '../store/records.reducers';

@Component({
  selector: 'app-record-editor',
  templateUrl: './record-editor.component.html',
  styleUrls: ['./record-editor.component.css']
})
export class RecordEditorComponent implements OnInit {
  recordForm: FormGroup;
  constructor(              private store: Store<fromRecords.FeatureState>) { }

  createForm() {
    this.recordForm = new FormGroup({
      'title': new FormControl(null, Validators.required)});
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {

    this.store.dispatch(new RecordActions.AddRecord(this.recordForm.value));
  }

}

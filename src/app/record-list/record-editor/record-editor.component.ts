import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as RecordActions from '../store/records.actions';
import * as fromRecords from '../store/records.reducers';

@Component({
  selector: 'app-record-editor',
  templateUrl: './record-editor.component.html',
  styleUrls: ['./record-editor.component.css']
})
export class RecordEditorComponent implements OnInit {
  subscription: Subscription;
  recordForm: FormGroup;
  constructor(              private store: Store<fromRecords.FeatureState>) { }

  createForm() {
    this.recordForm = new FormGroup({
      'title': new FormControl(null, Validators.required)});
  }

  ngOnInit() {
    this.createForm();
    this.subscription = this.store.select('records')
      .select(x => x.recordToEdit)
      .subscribe(
        data => {
          if (data) {
            this.recordForm.setValue({
              title: data.title,
            });
          }
        }
      );
  }

  onSubmit() {

    this.store.dispatch(new RecordActions.CommitEditedRecord(this.recordForm.value));
  }

}

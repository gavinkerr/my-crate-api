import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as RecordActions from '../store/records.actions';
import * as fromRecords from '../store/records.reducers';
import { ImagingService } from '../../tools/imaging.service';

@Component({
  selector: 'app-record-editor',
  templateUrl: './record-editor.component.html',
  styleUrls: ['./record-editor.component.css']
})
export class RecordEditorComponent implements OnInit, OnDestroy {
  url: string;
  subscription: Subscription;
  recordForm: FormGroup;
  editMode: boolean;
  constructor(
    private router: Router,
              private route: ActivatedRoute,
    private store: Store<fromRecords.FeatureState>,
    private imgService: ImagingService
    ) { }

  createForm() {
    this.editMode = false;
    this.recordForm = new FormGroup({
      'title': new FormControl(null, Validators.required)});
  }

  ngOnInit() {
    this.createForm();
    this.subscription = this.store.select('records')
      .subscribe(
        data => {
          if (data) {
            this.editMode = data.editIndex > -1;
            this.recordForm.setValue({
              title: data.recordToEdit.title,
            });
            this.url = data.recordToEdit.photoUrl;
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {

    this.store.dispatch(new RecordActions.CommitEditedRecord(this.recordForm.value));
    if (this.editMode) {
      this.router.navigate(['../new'], {relativeTo: this.route});
    }
  }

  onFilesChanged(files: FileList) {
    this.imgService.getUrlForFile(files[0]).then(url => {
      this.store.dispatch(new RecordActions.UpdateEditedRecord(
        {...this.recordForm.value, photoUrl: url}
      ));
  });
  }

}

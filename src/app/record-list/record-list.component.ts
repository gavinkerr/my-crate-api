import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRecord from './store/records.reducers';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {
  recordState: Observable<fromRecord.State>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromRecord.FeatureState>) {
  }

  ngOnInit() {
    this.recordState = this.store.select('records');
  }

  onNewRecord() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}

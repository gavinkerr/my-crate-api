import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRecord from './store/records.reducers';
import * as RecordActions from './store/records.actions';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {
  recordState: Observable<fromRecord.State>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromRecord.FeatureState>,
              private modalService: NgbModal
            ) {
  }
  closeResult: string;
  deletingIndex: number;
  modal: NgbModalRef;

  ngOnInit() {
    this.recordState = this.store.select('records');
  }

  onNewRecord() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  open(content, index) {
    this.deletingIndex = index;
    this.modal = this.modalService.open(content);
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  delete() {
    this.store.dispatch(new RecordActions.DeleteRecord(this.deletingIndex));
    this.modal.close();
  }
}

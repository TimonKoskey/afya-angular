import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { APIService } from '../../services/api/api.service';
import { SessionAPIService} from '../../sessions/session-api.service';
import { Patient } from '../../models/patient';
import { Session } from '../../models/session'

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  session: Session;
  patient: Patient;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private apiservice: APIService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private sessionAPIService: SessionAPIService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.size = 'lg';
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const patientID = params.patientID;
      this.sessionAPIService.getPatientDetails(patientID).subscribe(results => {
        this.patient = results;
      });
      this.apiservice.getPatientDetailsSummary(patientID).subscribe(results => {
        this.session = results
      })
    });

  }

  startNewSession() {
    this.spinner.show();
    this.apiservice.startNewSession(this.patient.id).subscribe(results => {
      this.spinner.hide();
      this.session = results;
      console.log(results);
    }, error => {
      this.spinner.hide();
      console.error(error);
    });
  }

  navToPaymentsPage() {
    this.router.navigate(['../session/session-data/payments'], {
      queryParams: {
        patientID: this.session.patient.id,
        sessionID: this.session.id,
      },
      relativeTo: this.route
    });

  }

  navToVitalsPage() {

    this.router.navigate(['../session/session-data/vitals'], {
      queryParams: {
        patientID: this.session.patient.id,
        sessionID: this.session.id,
      },
      relativeTo: this.route
    });

  }

  closeSession() {
    const updateData = {};
    updateData['status'] = 'Closed';
    this.spinner.show();
    this.apiservice.updateSessionDetails(this.session.id, updateData).subscribe(results => {
      this.spinner.hide();
      this.session = results;
    }, error => {
      this.spinner.hide();
      // this.fetchDataError = error
    });
  }

  navToSessionNotes() {
    this.router.navigate(['../session/session-data/complaints'], {
      queryParams: {
        patientID: this.session.patient.id,
        sessionID: this.session.id,
      },
      relativeTo: this.route
    });
  }

}

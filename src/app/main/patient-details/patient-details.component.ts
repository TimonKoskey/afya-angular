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

  user: any;
  session: Session;
  patient: Patient;
  patientID: number;

  patientHistory: Array<Session> = [];

  minFollowUpDate: any;
  appointmentDateEvent: any;

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
    this.user = this.apiservice.getUser();
    this.minDate();
    this.route.queryParams.subscribe(params => {
      this.patientID = params.patientID;
      if (this.patientID) {
        this.spinner.show();
        this.getPatientCurrentData();
        this.getPatientHistory();
      } else {
        this.router.navigate(['../patients/list'], { relativeTo: this.route });
      }
    });

  }

  getPatientCurrentData() {
    this.sessionAPIService.getPatientDetails(this.patientID).subscribe(results => {
      this.patient = results;
      this.getLastSessionData();
    }, (error) => {
      this.spinner.hide();
      console.error(error);
    });
  }

  getLastSessionData() {
    this.apiservice.getPatientDetailsSummary(this.patientID).subscribe(results => {
      this.spinner.hide();
      this.session = results
    }, (error) => {
      this.spinner.hide();
      console.error(error);
    });
  }

  getPatientHistory() {
    this.apiservice.getPatientHistory(this.patientID).subscribe((results) => {
      this.patientHistory = results.reverse();
      console.log(this.patientHistory);
    }, (error) => {
      console.error(error);
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

  deletePatient(content: any) {
    if (this.user.is_superuser) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
        this.sessionAPIService.deletePatientDetails(this.patient.id).subscribe(() => {
          this.router.navigate(['../patients/list'], { relativeTo: this.route });
        }, error => {
          this.spinner.hide();
          console.error(error);
        })
      }, () => {});
    }
  }

  onDateSelect(event: any) {
    this.appointmentDateEvent = event;
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
      this.scheduleAppoint();
    }, () => {});
  }

  scheduleAppoint() {
    if (this.appointmentDateEvent !== undefined) {
      const appointmentData = {
        dateString: new Date(this.appointmentDateEvent.year, this.appointmentDateEvent.month - 1, this.appointmentDateEvent.day).toUTCString()
      }

      console.log(appointmentData)

      this.apiservice.scheduleAppointments(this.patient.id, appointmentData).subscribe((results) => {
        console.log(results)
      }, (error) => {
        console.error(error);  
      })
    }
  }

  minDate() {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = (date.getMonth() + 1);
    const dateToday = date.getDate();

    this.minFollowUpDate = {
      year: currentYear,
      month: currentMonth,
      day: dateToday
    };
  }

  navToSessionSummary(session: Session) {
    this.router.navigate(['../session/session-data/session-summary'], {
      queryParams: {
        patientID: session.patient.id,
        sessionID: session.id,
      },
      relativeTo: this.route
    });
  }

}

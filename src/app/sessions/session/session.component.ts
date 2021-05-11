import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionAPIService } from '../session-api.service';
import { Patient } from '../../models/patient';
import { Session } from '../../models/session';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  session: Session;
  patientID: number;
  sessionID: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sessionAPISerive: SessionAPIService
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.patientID = params.patientID;
      this.sessionID = params.sessionID;

      this.sessionAPISerive.getSessionDetails(this.sessionID).subscribe(results => {
        this.session = results
      });

    });

  }

  navToPaymentsPage() {
    this.router.navigate(['../payments'],
    { 
      queryParams: {
        patientID:this.patientID,
        sessionID: this.sessionID
      },
      relativeTo: this.route });
  }

  navToVitalsPage() {
    this.router.navigate(['../vitals'], 
      { queryParams: {
        patientID:this.patientID,
        sessionID: this.sessionID
      },
        relativeTo: this.route 
      });
  }

  navToComplaintsPage() {
    this.router.navigate(['../complaints'], { 
      queryParams: {
        patientID:this.patientID,
        sessionID: this.sessionID
      },
      relativeTo: this.route});
  }

  navToPhysicalExamsPage() {
    this.router.navigate(['../physical-exam'], { 
      queryParams: {
        patientID:this.patientID,
        sessionID: this.sessionID
      },
      relativeTo: this.route});
  }

  navToComorbiditiesPage() {
    this.router.navigate(['../comorbidities'], {
      queryParams: {
        patientID:this.patientID,
        sessionID: this.sessionID
      },
      relativeTo: this.route});
  }

  navToInvestigationsPage() {
    this.router.navigate(['../investigations'], {
      queryParams: {
        patientID:this.patientID,
        sessionID: this.sessionID
      },
      relativeTo: this.route});
  }

  navToDiagnosisPage() {
    this.router.navigate(['../diagnosis'], {
      queryParams: {
        patientID:this.patientID,
        sessionID: this.sessionID
      },
      relativeTo: this.route});
  }

  navToTreatmentPage() {
    this.router.navigate(['../treatment'], {
      queryParams: {
        patientID:this.patientID,
        sessionID: this.sessionID
      },
      relativeTo: this.route});
  }

}

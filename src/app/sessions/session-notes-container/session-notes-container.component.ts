import { Component, OnInit, OnDestroy } from '@angular/core';
import { Session } from 'src/app/models/session';
import { SessionAPIService } from '../session-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-session-notes-container',
  templateUrl: './session-notes-container.component.html',
  styleUrls: ['./session-notes-container.component.css']
})
export class SessionNotesContainerComponent implements OnInit, OnDestroy {

  patientID: number;
  sessionID: number;

  patient: Patient

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sessionAPIService: SessionAPIService
     ) { }

  ngOnInit(): void {

    if (!this.patient) {
      this.route.queryParams.subscribe(params => {
        this.patientID = params.patientID;
        this.sessionID = params.sessionID;
  
        this.sessionAPIService.getPatientDetails(this.patientID).subscribe(results => {
          this.patient = results;
          this.sessionAPIService.setPatientToLS(this.patient);
        });
      });
    }
    
  }

  navToPatientDetails() {
    this.router.navigate(['../../patient-details'], {
      queryParams: {
        patientID: this.patientID,
        sessionID: this.sessionID,
      },
      relativeTo: this.route
    });
  }

  ngOnDestroy(): void {
    this.sessionAPIService.removePatientFromLS();
  }

}

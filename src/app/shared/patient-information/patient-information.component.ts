import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from '../../models/patient';
// import { SessionAPIService } from '../../sessions/session-api.service';

@Component({
  selector: 'app-patient-information',
  templateUrl: './patient-information.component.html',
  styleUrls: ['./patient-information.component.css']
})
export class PatientInformationComponent implements OnInit {

  @Input() patient: Patient;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    // private sessionAPIService: SessionAPIService
    ) { }

  ngOnInit(): void {
  }

  navToPatientDetails() {
    this.router.navigate(['/account/patient-details/edit'], { queryParams: { patientID:this.patient.id }});
  }

}

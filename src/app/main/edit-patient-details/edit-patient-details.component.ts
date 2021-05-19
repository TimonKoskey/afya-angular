import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { SessionAPIService} from '../../sessions/session-api.service';
import { Patient } from '../../models/patient';
import { User } from '../../models/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-patient-details',
  templateUrl: './edit-patient-details.component.html',
  styleUrls: ['./edit-patient-details.component.css']
})
export class EditPatientDetailsComponent implements OnInit {

  user: User;
  patient: Patient;
  patientCopy: Patient;
  editPatientDetails = false
  editPatientDetailsFormSubmitted: boolean;

  constructor(
    private spinner: NgxSpinnerService,
    private sessionAPIService: SessionAPIService,
    private route: ActivatedRoute,
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal
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
    });

  }

  EditPatientDetails() {
    this.patientCopy = this.patient;
    this.editPatientDetails = true;
  }

  cancelEdit() {
    this.patient = this.patientCopy;
    this.editPatientDetails = false;
  }

  submitData(formData: NgForm) {
    this.editPatientDetailsFormSubmitted = true;
    if (formData.valid) {
      this.spinner.show();
      this.patient = formData.value;
      this.patient.id = this.patientCopy.id;
      this.patient['dob'] = new Date(formData.value['dateOfBirth']).toUTCString();
      this.sessionAPIService.updatePatientDetails(this.patient).subscribe(results => {
        this.spinner.hide();
        this.patient = results;
        this.editPatientDetails = false
        this.editPatientDetailsFormSubmitted = false;
      }, error => {
        this.spinner.hide();
        this.patient = this.patientCopy;
        this.editPatientDetails = false
        this.editPatientDetailsFormSubmitted = false;
        console.error(error);
      });
    }
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

  navToSummaryPage() {
    this.router.navigate(['../../patient-details'], {
      queryParams: {
        patientID: this.patient.id
      },
      relativeTo: this.route
    });
  }

}

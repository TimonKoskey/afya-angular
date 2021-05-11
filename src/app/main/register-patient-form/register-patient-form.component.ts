import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { APIService } from '../../services/api/api.service';
import { Patient } from '../../models/patient';

@Component({
  selector: 'app-register-patient-form',
  templateUrl: './register-patient-form.component.html',
  styleUrls: ['./register-patient-form.component.css']
})
export class RegisterPatientFormComponent implements OnInit {
  newPatientRecordForm: FormGroup;
  patientRecordFormSubmitted = false;
  patient: Patient;
  patientExists: boolean;
  queryResults = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private apiservice: APIService
  ) { }

  ngOnInit() {
    this.newPatientRecordForm = this.fb.group({
      patientRegistrationNumber: ['',Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      residence: ['', Validators.required]
    });
  }

  onSubmit() {
    this.patientRecordFormSubmitted = true;
    if (this.newPatientRecordForm.valid) {
      this.patient = this.newPatientRecordForm.value;
      this.patient.firstName = this.capitalizeFirstLetter(this.firstName.value);
      this.patient.lastName = this.capitalizeFirstLetter(this.lastName.value);
      this.patient.gender = this.capitalizeFirstLetter(this.gender.value);
      this.patient.residence = this.capitalizeFirstLetter(this.residence.value);
      this.patient.phoneNumber = this.phoneNumber.value.trim().replace(/\s+/g, '');
      this.patient.dateOfBirth = new Date(this.newPatientRecordForm.value['dateOfBirth']).toUTCString();

      this.apiservice.checkIfPatientExists(this.patient).subscribe(results => {
        if (results.length === 0) {

          this.apiservice.registerNewPatientToDatabase(this.patient).subscribe(results => {
            this.spinner.hide();
            this.patientDetails(results);
          }, error => {
            this.spinner.hide();
            console.error(error);
          });
        
        } else {
          this.spinner.hide();
          this.patientExists = true;
          this.queryResults = results;
        }
      }, error => {
        this.spinner.hide();
        console.error(error);
      });

    }
  }

  capitalizeFirstLetter(dataString: string) {
    return dataString.charAt(0).toUpperCase() + dataString.slice(1);
  }

  patientDetails( patient: Patient ) {
    this.router.navigate(['../patient-details'], {
      queryParams: {
        patientID: patient.id
      },
      relativeTo: this.route
    });
  }

  backToForm() {
    this.queryResults = [];
    this.patientExists = false;
  }

  get patientRegistrationNumber() { return this.newPatientRecordForm.get('patientRegistrationNumber'); }
  get firstName() { return this.newPatientRecordForm.get('firstName'); }
  get lastName() { return this.newPatientRecordForm.get('lastName'); }
  get gender() { return this.newPatientRecordForm.get('gender'); }
  get age() { return this.newPatientRecordForm.get('age'); }
  get phoneNumber() { return this.newPatientRecordForm.get('phoneNumber'); }
  get residence() { return this.newPatientRecordForm.get('residence'); }
  get dateOfBirth() { return this.newPatientRecordForm.get('dateOfBirth'); }

  counties = ['BARINGO','BOMET','BUNGOMA','BUSIA','ELGEYO-MARAKWET','EMBU','GARISSA','HOMA-BAY','ISIOLO','KAJIADO','KAKAMEGA','KERICHO','KIAMBU',
    'KILIFI','KIRINYAGA','KISII','KISUMU','KITUI','KWALE','LAIKIPIA','LAMU','MACHAKOS','MAKUENI','MANDERA','MARSABIT','MERU','MIGORI','MOMBASA',
    'MURANGA','NAIROBI','NAKURU','NANDI','NAROK','NYAMIRA','NYANDARUA','NYERI','SAMBURU','SIAYA','TAITA-TAVETA','TANA RIVER','THARAKA-NITHI',
    'TRANS-NZOIA','TURKANA','UASIN GISHU','VIHIGA','WAJIR','WEST POKOT'
  ];

  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

}

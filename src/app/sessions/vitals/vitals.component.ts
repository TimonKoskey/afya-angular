import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vitals } from '../../models/vitals';
import { HttpErrorResponse } from '@angular/common/http';
import { Session } from 'src/app/models/session';
import { SessionAPIService } from '../session-api.service';

@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.css']
})
export class VitalsComponent implements OnInit {

  sessionID: number;
  fetchDataError: HttpErrorResponse;
  vitalsForm: FormGroup;
  vitalsSectionCompleted: boolean;
  vitalsArray: Array<Vitals>;
  vitals: Vitals;
  vitalsCopy: Vitals;
  vitalsFormSubmited = false;
  editVitals: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private sessionAPIService: SessionAPIService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const patientID = params.patientID;
      this.sessionID = params.sessionID;
      this.spinner.show();
      this.sessionAPIService.getSessionVitals(this.sessionID).subscribe(results => {
        this.spinner.hide();
        this.vitalsArray = results;
        if (this.vitalsArray.length === 0) {
          this.initForm();
          this.vitalsSectionCompleted = false;
        } else {
          this.vitals = this.vitalsArray[0];
          this.vitalsSectionCompleted = true;
        }
      }, (error: HttpErrorResponse) => {
        this.spinner.hide();
      });
    });

  }

  initForm() {
    this.vitalsForm = this.fb.group({
      systolic: [this.vitals === undefined ? null : this.vitals.systolic, Validators.required],
      diastolic: [this.vitals === undefined ? null : this.vitals.diastolic, Validators.required],
      pulseRate: [this.vitals === undefined ? null : this.vitals.pulseRate, Validators.required],
      SPO2: [this.vitals === undefined ? null : this.vitals.SPO2],
      temperature: [this.vitals === undefined ? null : this.vitals.temperature],
      weight: [this.vitals === undefined ? null : this.vitals.weight]
    });
  }

  onSubmit(vitalsForm: FormGroup) {
    this.vitalsFormSubmited = true;
    if (vitalsForm.valid) {
      const newVitals = vitalsForm.value;
      this.spinner.show()
      if (this.editVitals !== true) {
        this.sessionAPIService.createSessionVitals(this.sessionID, newVitals).subscribe(results => {
          this.spinner.hide();
          this.vitals = results;
          this.vitalsSectionCompleted = true;
        }, (error: HttpErrorResponse) => {
          this.spinner.hide();
          this.fetchDataError = error;
        })
      } else {
        this.sessionAPIService.updateSessionVitalsDetails(this.vitals.id, newVitals).subscribe(results => {
          this.spinner.hide();
          this.vitals = results;
          this.editVitals = false;
        }, (error: HttpErrorResponse) => {
          this.spinner.hide();
          this.fetchDataError = error;
        })
      }
    }
  }

  EditVitals() {
    this.vitalsCopy = this.vitals;
    this.initForm();
    this.editVitals = true;
  }

  cancelEditor() {
    this.editVitals = false;
    this.vitals = this.vitalsCopy;
  }

  get systolic() { return this.vitalsForm.get('systolic'); }
  get diastolic() { return this.vitalsForm.get('diastolic'); }
  get pulseRate() { return this.vitalsForm.get('pulseRate'); }

}

import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Investigations } from 'src/app/models/investigation';
import { SessionAPIService } from '../session-api.service';

@Component({
  selector: 'app-investigations',
  templateUrl: './investigations.component.html',
  styleUrls: ['./investigations.component.css']
})
export class InvestigationsComponent implements OnInit {

  investigationTestForm: FormControl;
  investigationResultsForms: FormGroup;

  investigations: Array<Investigations>;
  investigation: Investigations;
  newInvestigations = [];

  controlIndex: number;
  editing = false;

  patientID: number;
  sessionID: number;
  actionIndex: number;

  testSuggestions = [];
  resultsSuggestions = [];

  constructor(
    private route: ActivatedRoute,
    private sessionAPIService: SessionAPIService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.investigationTestForm = new FormControl('', Validators.required);

    this.route.queryParams.subscribe(params => {
      this.patientID = params.patientID;
      this.sessionID = params.sessionID;

      this.sessionAPIService.getSessionInvestigations(this.sessionID).subscribe(results => {
        this.investigations = results;
        this.createResultsForms();
      });

    });

    this.sessionAPIService.getInvestigationsRequestSuggestions().subscribe(results => {
      this.testSuggestions = results;
    });

    this.sessionAPIService.getInvestigationsResultsSuggestions().subscribe(results => {
      this.resultsSuggestions = results;
    });

  }

  createResultsForms() {

    if (this.investigations) {

      if (this.investigations.length > 0) {

        this.investigationResultsForms = this.fb.group({
          results: this.fb.array([])
        })

        for (let test of this.investigations) {

          const newControl = new FormControl('', Validators.required);
          this.results.push(newControl);

        }

      }

    }

  }

  get results() {
    return this.investigationResultsForms.get('results') as FormArray;
  }

  enterTestInput() {

    if (this.investigationTestForm.valid) {

      const newInvestigationObj: Investigations = {};
      newInvestigationObj.test = (this.investigationTestForm.value.charAt(0).toUpperCase() + this.investigationTestForm.value.slice(1));
      this.newInvestigations.push(newInvestigationObj);

      this.investigationTestForm.reset();

    }

  }

  saveTestList() {
    if (this.newInvestigations.length > 0) {
      this.spinner.show();
      this.sessionAPIService.createSessionInvestigations(this.sessionID, this.newInvestigations).subscribe(results => {
        this.investigations = this.investigations.concat(results)
        this.createResultsForms();
        this.newInvestigations = [];
        this.spinner.hide();
      }, (error) => {
        this.spinner.hide();
      });
    }
  }

  removeItem(index: number) {
    if (index > -1) {
      this.newInvestigations.splice(index, 1);
    }
  }

  deleteInvestigation(investigation: Investigations, index: number) {
    this.actionIndex = index;

    setTimeout(() => {
      this.sessionAPIService.deleteSessionInvestigations(investigation.id).subscribe(results => {
        this.actionIndex = undefined;
        const index = this.investigations.indexOf(investigation);
        if (index > -1) {
          this.investigations.splice(index, 1);
          this.results.controls.splice(index, 1);
        }
      }, (error) => {
        this.actionIndex = undefined;
        console.error(error);
      });
    }, 3000);
  }

  saveInvestigationResults(index: number) {

    if (this.results.controls[index].valid) {
      this.actionIndex = index;

      const investigationResults = {
        results: this.results.controls[index].value
      }

      setTimeout(() => {
        this.sessionAPIService.updateSessionInvestigations(this.investigations[index].id, investigationResults).subscribe(results => {
          this.actionIndex = undefined;
          this.investigations[index].results = this.results.controls[index].value;
          this.controlIndex = null;
          this.editing = false;
        }, (error) => {
          this.actionIndex = undefined;
          console.error(error);
        });
      }, 3000);

    }
  }

  editInvestigationResults(index: number) {
    this.results.controls[index].setValue(this.investigations[index].results)
    this.controlIndex = index;
    this.editing = true;
  }

  cancelEdit() {
    this.controlIndex = null;
    this.editing = false;
  }

  typeaheadTestSelect(event: any) {
    this.enterTestInput();
  }

  typeaheadResultsSelect(event: any, i: number) {
    this.saveInvestigationResults(i);
  }

}

import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Notes } from 'src/app/models/notes';
import { SessionAPIService } from '../session-api.service';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit {

  notesEntry: string;
  prescriptionEntry: string;
  notesArray: Array<Notes>;
  prescriptionArray: Array<Notes>;
  treatmentNotesAvailable: boolean;

  patientID: number;
  sessionID: number;

  suggestions = [];
  prescriptionSuggestions = [];
  actionIndex : number;
  prescriptionActionIndex: number;

  showPrescription = false;

  constructor(
    private route: ActivatedRoute,
    private sessionAPIService: SessionAPIService,
    private renderer: Renderer2
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.patientID = params.patientID;
      this.sessionID = params.sessionID;

      this.sessionAPIService.getSessionTreatment(this.sessionID).subscribe(results => {
        this.notesArray = results

        if (results.length < 1) {
          this.treatmentNotesAvailable = false;
        } else {
          this.treatmentNotesAvailable = true
        }

      });

    });

    this.sessionAPIService.getTreatmentSuggestions().subscribe(results => {
      this.suggestions = results;
    });

    this.sessionAPIService.getPrescriptionSuggestions().subscribe(results => {
      this.prescriptionSuggestions = results;
      console.log(this.prescriptionActionIndex);
    });

    this.getPrescriptions();

  }

  getPrescriptions() {
    this.sessionAPIService.getSessionPrescription(this.patientID).subscribe((results) => {
      this.prescriptionArray = results
    }, (error) => {
      console.error(error);
      
    });
  }

  enterNotesInput() {

    if( this.notesEntry !== undefined && this.notesEntry !== '' ){

      const newNote: Notes = {}
      newNote.entry = this.notesEntry.charAt(0).toUpperCase() + this.notesEntry.slice(1);
      this.createSessionTreatmentNotes(newNote);
      this.notesEntry = '';

    }

  }

  enterPrecriptionInput() {

    if( this.prescriptionEntry !== undefined && this.prescriptionEntry !== '' ){

      const newNote: Notes = {}
      newNote.entry = this.prescriptionEntry.charAt(0).toUpperCase() + this.prescriptionEntry.slice(1);
      this.createSessionPrescription(newNote);
      this.prescriptionEntry = '';

    }

  }

  createSessionPrescription(note: Notes) {
    this.prescriptionArray.push(note);
    this.prescriptionActionIndex = this.prescriptionArray.indexOf(note);

    this.sessionAPIService.createSessionPrescription(this.sessionID, note).subscribe( results => {
      note.id = results.id;
      this.prescriptionActionIndex = undefined;

    }, error => {
      console.log( error );
      this.prescriptionArray.splice(this.prescriptionActionIndex, 1);
      this.prescriptionActionIndex = undefined;
    } );

  }

  createSessionTreatmentNotes(note: Notes) {
    this.notesArray.push(note);
    this.actionIndex = this.notesArray.indexOf(note);

    this.sessionAPIService.createSessionTreatment(this.sessionID, note).subscribe( results => {
      note.id = results.id;
      this.actionIndex = undefined;

    }, error => {
      console.log( error );
      this.notesArray.splice(this.actionIndex, 1);
      this.actionIndex = undefined;
    } );

  }

  delete(note: Notes, index: number) {
    this.actionIndex = index;

    this.sessionAPIService.deleteSessionTreatment(note.id).subscribe(() => {
      this.actionIndex = undefined;
      if (index > -1) {
        this.notesArray.splice(index, 1);
      }

    }, error => {
      this.actionIndex = undefined;
      console.log(error);
    });

  }

  deletePrescription(note: Notes, index: number) {
    this.prescriptionActionIndex = index;

    this.sessionAPIService.deleteSessionPrescription(note.id).subscribe(() => {
      this.prescriptionActionIndex = undefined;
      if (index > -1) {
        this.prescriptionArray.splice(index, 1);
      }

    }, error => {
      this.prescriptionActionIndex = undefined;
      console.log(error);
    });

  }

  typeaheadSelect(event: any) {
    this.enterNotesInput();
  }

  typeaheadSelectPrescription(event: any) {
    this.enterPrecriptionInput();
  }

  togglePrescription() {
    if (this.showPrescription) {
      this.showPrescription = false;
    } else {
      this.showPrescription = true;
    }
  }

}

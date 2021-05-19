import { Component, OnInit } from '@angular/core';
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
  notesArray: Array<Notes>;
  treatmentNotesAvailable: boolean;

  patientID: number;
  sessionID: number;

  suggestions = [];
  actionIndex : number;

  constructor(
    private route: ActivatedRoute,
    private sessionAPIService: SessionAPIService
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

  }

  enterNotesInput() {

    if( this.notesEntry !== undefined && this.notesEntry !== '' ){

      const newNote: Notes = {}
      newNote.entry = this.notesEntry.charAt(0).toUpperCase() + this.notesEntry.slice(1);
      this.createSessionTreatmentNotes(newNote);
      this.notesEntry = '';

    }

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

  typeaheadSelect(event: any) {
    this.enterNotesInput();
  }

}

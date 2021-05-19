import { Component, OnInit } from '@angular/core';
import { Notes } from 'src/app/models/notes';
import { SessionAPIService } from '../session-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {

  notesEntry: string;
  notesArray: Array<Notes>;
  diagnosisNotesAvailable: boolean;

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

      this.sessionAPIService.getSessionDiagnosis(this.sessionID).subscribe(results => {
        this.notesArray = results

        if (results.length < 1) {
          this.diagnosisNotesAvailable = false;
        } else {
          this.diagnosisNotesAvailable = true
        }

      });

    });

    this.sessionAPIService.getDiagnosisSuggestions().subscribe(results => {
      this.suggestions = results;
    });

  }

  enterNotesInput() {

    if( this.notesEntry !== undefined && this.notesEntry !== '' ){

      const newNote: Notes = {}
      newNote.entry = this.notesEntry.charAt(0).toUpperCase() + this.notesEntry.slice(1);
      this.createSessionDiagnosisNotes(newNote);
      this.notesEntry = '';

    }

  }

  createSessionDiagnosisNotes(note: Notes) {
    this.notesArray.push(note);
    this.actionIndex = this.notesArray.indexOf(note);

    this.sessionAPIService.createSessionDiagnosis(this.sessionID, note).subscribe( results => {

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

    this.sessionAPIService.deleteSessionDiagnosis(note.id).subscribe(() => {
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

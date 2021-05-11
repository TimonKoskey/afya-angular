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

  createSessionDiagnosisNotes(notes: Notes) {

    this.sessionAPIService.createSessionDiagnosis(this.sessionID, notes).subscribe( results => {

      this.notesArray.push(results);
      this.diagnosisNotesAvailable = true;

    }, error => {

      console.log( error );

    } );

  }

  delete(note: Notes, index: number) {
    this.sessionAPIService.deleteSessionDiagnosis(note.id).subscribe(results => {
      if (index > -1) {
        this.notesArray.splice(index, 1);
      }

    }, error => {
      console.log(error);
    });

  }

}

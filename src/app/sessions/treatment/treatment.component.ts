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

  createSessionTreatmentNotes(notes: Notes) {

    this.sessionAPIService.createSessionTreatment(this.sessionID, notes).subscribe( results => {

      this.notesArray.push(results);
      this.treatmentNotesAvailable = true;

    }, error => {

      console.log( error );

    } );

  }

  delete(note: Notes, index: number) {
    this.sessionAPIService.deleteSessionTreatment(note.id).subscribe(results => {
      if (index > -1) {
        this.notesArray.splice(index, 1);
      }

    }, error => {
      console.log(error);
    });

  }

}

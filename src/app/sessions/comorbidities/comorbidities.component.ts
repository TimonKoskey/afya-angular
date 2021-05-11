import { Component, OnInit } from '@angular/core';
import { Notes } from 'src/app/models/notes';
import { SessionAPIService } from '../session-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comorbidities',
  templateUrl: './comorbidities.component.html',
  styleUrls: ['./comorbidities.component.css']
})
export class ComorbiditiesComponent implements OnInit {

  notesEntry: string;
  notesArray: Array<Notes>;
  comorbiditiesNotesAvailable: boolean;

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

      this.sessionAPIService.getSessionComorbities(this.sessionID).subscribe(results => {
        this.notesArray = results

        if (results.length < 1) {
          this.comorbiditiesNotesAvailable = false;
        } else {
          this.comorbiditiesNotesAvailable = true
        }

      });

    });

    this.sessionAPIService.getComorbiditiesSuggestions().subscribe(results => {
      this.suggestions = results;
    });

  }

  enterNotesInput() {

    if( this.notesEntry !== undefined && this.notesEntry !== '' ){

      const newNote: Notes = {}
      newNote.entry = this.notesEntry.charAt(0).toUpperCase() + this.notesEntry.slice(1);
      this.createSessionComorbiditiesNotes(newNote);
      this.notesEntry = '';

    }

  }

  createSessionComorbiditiesNotes(notes: Notes) {

    this.sessionAPIService.createSessionComorbidities(this.sessionID, notes).subscribe( results => {

      this.notesArray.push(results);
      this.comorbiditiesNotesAvailable = true;

    }, error => {

      console.log( error );

    } );

  }

  delete(note: Notes, index: number) {
    this.sessionAPIService.deleteSessionComorbidities(note.id).subscribe(results => {
      if (index > -1) {
        this.notesArray.splice(index, 1);
      }

    }, error => {
      console.log(error);
    });

  }

}

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
  actionIndex : number;

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

  createSessionComorbiditiesNotes(note: Notes) {
    this.notesArray.push(note);
    this.actionIndex = this.notesArray.indexOf(note);

    this.sessionAPIService.createSessionComorbidities(this.sessionID, note).subscribe( results => {
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

    this.sessionAPIService.deleteSessionComorbidities(note.id).subscribe(() => {
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

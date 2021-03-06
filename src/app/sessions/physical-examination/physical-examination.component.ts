import { Component, OnInit } from '@angular/core';
import { Notes } from 'src/app/models/notes';
import { SessionAPIService } from '../session-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-physical-examination',
  templateUrl: './physical-examination.component.html',
  styleUrls: ['./physical-examination.component.css']
})
export class PhysicalExaminationComponent implements OnInit {

  notesEntry: string;
  notesArray: Array<Notes>;
  physicalExaminationNotesAvailable: boolean;

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

      this.sessionAPIService.getSessionPhycExam(this.sessionID).subscribe(results => {
        this.notesArray = results

        if (results.length < 1) {
          this.physicalExaminationNotesAvailable = false;
        } else {
          this.physicalExaminationNotesAvailable = true
        }

      });

    });

    this.sessionAPIService.getPhysicalSuggestions().subscribe(results => {
      this.suggestions = results;
    });

  }

  enterNotesInput() {

    if( this.notesEntry !== undefined && this.notesEntry !== '' ){

      const newNote: Notes = {}
      newNote.entry = this.notesEntry.charAt(0).toUpperCase() + this.notesEntry.slice(1);
      this.createSessionPhysicalExaminationNotes(newNote);
      this.notesEntry = '';

    }

  }

  createSessionPhysicalExaminationNotes(note: Notes) {

    this.notesArray.push(note);
    this.actionIndex = this.notesArray.indexOf(note);

    // setTimeout(() => {

      this.sessionAPIService.createSessionPhysicalExamination( this.sessionID, note ).subscribe( results => {

        note.id = results.id;
        this.actionIndex = undefined;
  
      }, error => {
        console.log( error );
        this.notesArray.splice(this.actionIndex, 1);
        this.actionIndex = undefined;
      } );

    // }, 3000);

  }

  delete(note: Notes, index: number) {
    this.actionIndex = index;

    // setTimeout(() => {

      this.sessionAPIService.deleteSessionPhysicalExamination(note.id).subscribe(results => {
        this.actionIndex = undefined;

        if (index > -1) {
          this.notesArray.splice(index, 1);
        }
  
      }, error => {
        console.log(error);
        this.actionIndex = undefined;
      });

    // }, 3000);

  }

  typeaheadSelect(event: any) {
    this.enterNotesInput();
  }

}

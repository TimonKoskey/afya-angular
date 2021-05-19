import { Component, OnInit } from '@angular/core';
import { Notes } from 'src/app/models/notes';
import { SessionAPIService } from '../session-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  notesEntry: string;
  complaintsNotesAvailable: boolean;
  notesArray: Array<Notes>;

  patientID: number;
  sessionID: number;

  suggestions = [];
  actionIndex : number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sessionAPIService: SessionAPIService
    ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.patientID = params.patientID;
      this.sessionID = params.sessionID;

      this.sessionAPIService.getSessionComplaints(this.sessionID).subscribe(results => {
        this.notesArray = results

        if (results.length < 1) {
          this.complaintsNotesAvailable = false;
        } else {
          this.complaintsNotesAvailable = true
        }

      });

    });

    this.sessionAPIService.getComplaintsSuggestions().subscribe(results => {
      this.suggestions = results;
    });

  }

  enterNotesInput() {

    if (this.notesEntry !== undefined && this.notesEntry !== '') {

      const newNote: Notes = {}
      newNote.entry = this.notesEntry.charAt(0).toUpperCase() + this.notesEntry.slice(1);
      this.createSessionComplaintsNotes(newNote);
      this.notesEntry = '';

    }

  }

  createSessionComplaintsNotes(note: Notes) {
    this.notesArray.push(note);
    this.actionIndex = this.notesArray.indexOf(note);

    setTimeout(() => {

      this.sessionAPIService.createSessionComplaints(this.sessionID, note).subscribe(results => {
        note.id = results.id;
        this.actionIndex = undefined;
      }, error => {
        console.log(error);
        this.notesArray.splice(this.actionIndex, 1);
        this.actionIndex = undefined;
      });

    }, 3000);

  }

  delete(note: Notes, index: number) {
    this.actionIndex = index;

    setTimeout(() => {

      this.sessionAPIService.deleteSessionComplaints(note.id).subscribe(results => {
        this.actionIndex = undefined;
        if (index > -1) {
          this.notesArray.splice(index, 1);
        }
  
      }, error => {
        this.actionIndex = undefined;
        console.log(error);
      });

    }, 3000);

  }

  typeaheadSelect(event: any) {
    this.enterNotesInput();
  }

}

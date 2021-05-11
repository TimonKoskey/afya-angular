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

    this.sessionAPIService.createSessionComplaints(this.sessionID, note).subscribe(results => {
      this.notesArray.push(results);
      this.complaintsNotesAvailable = true;

    }, error => {

      console.log(error);

    });

  }

  delete(note: Notes, index: number) {
    this.sessionAPIService.deleteSessionComplaints(note.id).subscribe(results => {
      if (index > -1) {
        this.notesArray.splice(index, 1);
      }

    }, error => {
      console.log(error);
    });

  }

}

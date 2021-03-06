import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { APIService } from '../../services/api/api.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Session } from '../../models/session';

@Component({
  selector: 'app-lab-results-list',
  templateUrl: './lab-results-list.component.html',
  styleUrls: ['./lab-results-list.component.css']
})
export class LabResultsListComponent implements OnInit {
  recordsAvailable: boolean;
  sessionsList: Array<Session> = [];
  mainSessionsList: Array<Session> = [];
  paginatedSessionList: Array<Session> = [];
  // is_filtering = false;
  poll: any;
  currentPaginationPage: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private apiservice: APIService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getActiveSessions();
  }

  getActiveSessions() {
    this.apiservice.getLabResultsSessions().subscribe(results => {
      this.spinner.hide();
      if (results.length === 0) {
        this.recordsAvailable = false;
      } else {
        this.recordsAvailable = true;
        this.sessionsList = results.reverse();
        this.mainSessionsList = results.reverse();
        this.paginatedSessionList = this.sessionsList.slice(0, 30);
      }
    }, error => {
      this.spinner.hide();
      console.error(error);
    });
  }

  onKey(event: any) {
    const searchTerm = event.target.value;
    if (searchTerm !== '' || searchTerm !== undefined) {
      const searchTermLower = searchTerm.toLowerCase();
      const newSessionList = [];
      for (const session of this.mainSessionsList) {
        const regNo = session.patient.patientRegistrationNumber;
        const firstName = session.patient.firstName.toLowerCase();
        const lastName = session.patient.lastName.toLowerCase();
        if (firstName.includes(searchTermLower) || lastName.includes(searchTermLower) || regNo.includes(searchTermLower)) {
              newSessionList.push(session);
        }
      }
      this.sessionsList = newSessionList;
      this.paginatedSessionList = this.sessionsList.slice(0, 30);
    } else {
      this.sessionsList = this.mainSessionsList;
      this.paginatedSessionList = this.sessionsList.slice(0, 30);
    }
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginatedSessionList = this.sessionsList.slice(startItem, endItem);
    this.currentPaginationPage = event.page;
  }

  getItemCount(index: number) {
    let itemCount = index + 1;
    if (this.currentPaginationPage > 1) {
      itemCount = (30 * (this.currentPaginationPage - 1)) + (index + 1);
    }
    return itemCount;
  }


  navToSessionDetails(session: Session) {
    this.router.navigate(['../session/investigations'], {
      queryParams: {
        sessionID: session.id
      },
      relativeTo: this.route
    });
  }

  ngOnDestroy() {
    if (this.poll) {
      clearInterval(this.poll);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { APIService } from '../../services/api/api.service';
import { Session } from '../../models/session';
import { NgbModal, NgbModalConfig, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-retrieve-session',
  templateUrl: './retrieve-session.component.html',
  styleUrls: ['./retrieve-session.component.css']
})
export class RetrieveSessionComponent implements OnInit {
  recordsAvailable: boolean;
  queryString: string;
  retrievedSessions:Array<Session> = [];
  ngbDate: NgbDate;
  dateTime: Date;
  dateFrom: string;
  dateTo: string;
  minDateString: string;
  dateToday = new Date();
  fetchDataError: HttpErrorResponse;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private apiservice: APIService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.retrievedSessions = this.apiservice.getSessionsFromLS();

    if (this.retrievedSessions) {
      if (this.retrievedSessions.length > 0) {
        this.recordsAvailable = true;
      }
    }
    this.minDate();
  }

  minDate() {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = (date.getMonth() + 1);
    const dateToday = date.getDate();

    this.minDateString = `${currentYear.toString()}-${currentMonth.toString()}-${dateToday.toString()}`;
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
      if (this.ngbDate !== undefined) {
        this.dateTime = new Date(this.ngbDate.year, this.ngbDate.month - 1, this.ngbDate.day);
        this.dateTime.setHours(23,59.59,0)
        this.retrieveSessionByDate();
      }
    }, () => {});
  }

  retrieveSessionByDate() {
    const minDateTime = this.dateTime.setHours(0,0,0,0);
    const maxDateTime = this.dateTime.setHours(23,59,59,0)

    const timeRange = {
      min: new Date(minDateTime).toUTCString(),
      max: new Date(maxDateTime).toUTCString()
    }

    this.spinner.show();
    this.apiservice.getSessionByDate(timeRange).subscribe(results => {
      this.spinner.hide();
      if (results.length === 0) {
        this.recordsAvailable = false;
      } else {
        this.apiservice.setSessionsToLS(results);
        this.retrievedSessions = results;
        this.recordsAvailable = true;
      }
    }, error => {
      this.spinner.hide();
      console.error(error);
    });
  }

  todayReport() {
    const minDateTime = new Date();
    minDateTime.setHours(0,0,0,0);
    const maxDateTime = new Date();

    const timeRange = {
      min: minDateTime.toUTCString(),
      max: maxDateTime.toUTCString()
    }

    this.spinner.show();
    this.apiservice.getSessionByDate(timeRange).subscribe(results => {
      this.spinner.hide();
      if (results.length === 0) {
        this.recordsAvailable = false;
      } else {
        this.apiservice.setSessionsToLS(results);
        this.retrievedSessions = results;
        this.recordsAvailable = true;
      }
    }, error => {
      this.spinner.hide();
      console.error(error);
    });

  }

  sevenDayCashReport() {
    const minDateTime = new Date();
    minDateTime.setDate(this.dateToday.getDate() - 7);
    minDateTime.setHours(0,0,0,0);
    const maxDateTime = new Date()

    const timeRange = {
      min: minDateTime.toUTCString(),
      max: maxDateTime.toUTCString()
    }

    this.spinner.show();
    this.apiservice.getSessionByDate(timeRange).subscribe(results => {
      this.spinner.hide();
      if (results.length === 0) {
        this.recordsAvailable = false;
      } else {
        this.apiservice.setSessionsToLS(results);
        this.retrievedSessions = results;
        this.recordsAvailable = true;
      }
    }, error => {
      this.spinner.hide();
      console.error(error);
    });

  }

  thirtyDayCashReport() {
    const minDateTime = new Date();
    minDateTime.setDate(this.dateToday.getDate() - 30);
    minDateTime.setHours(0,0,0,0);
    const maxDateTime = new Date();

    const timeRange = {
      min: minDateTime.toUTCString(),
      max: maxDateTime.toUTCString()
    }

    this.spinner.show();
    this.apiservice.getSessionByDate(timeRange).subscribe(results => {
      this.spinner.hide();
      if (results.length === 0) {
        this.recordsAvailable = false;
      } else {
        this.apiservice.setSessionsToLS(results);
        this.retrievedSessions = results;
        this.recordsAvailable = true;
      }
    }, error => {
      this.spinner.hide();
      console.error(error);
    });

  }

  dateInputSubmit() {
    const minDateTime = new Date(this.dateFrom);
    const maxDateTime = new Date(this.dateTo);

    if (minDateTime.toString() !== 'Invalid Date' && maxDateTime.toString() !== 'Invalid Date') {
      minDateTime.setHours(0,0,0,0);
      maxDateTime.setHours(23,59,59,0);

      const timeRange = {
        min: minDateTime.toUTCString(),
        max: maxDateTime.toUTCString()
      }

      this.spinner.show();
      this.apiservice.getSessionByDate(timeRange).subscribe(results => {
        this.spinner.hide();
        if (results.length === 0) {
          this.recordsAvailable = false;
        } else {
          this.apiservice.setSessionsToLS(results);
          this.retrievedSessions = results;
          this.recordsAvailable = true;
        }
      }, error => {
        this.spinner.hide();
        console.error(error);
      });

    }

  }

  navToSessionDetails(session: Session) {
    this.router.navigate(['../session/session-data/session-summary'], {
      queryParams: {
        patientID: session.patient.id,
        sessionID: session.id
      },
      relativeTo: this.route
    });
  }

  onDateSelect(event: any) {
    this.ngbDate = event;
  }

}

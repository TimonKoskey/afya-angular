import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionAPIService } from '../session-api.service';
import { Patient } from '../../models/patient';
import { Session } from '../../models/session';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sessionAPISerive: SessionAPIService
  ) { }

  ngOnInit(): void {
  }

  // navToPatientDetails() {
  //   this.router.navigate(['../patient-details'], { relativeTo: this.route });
  // }

}

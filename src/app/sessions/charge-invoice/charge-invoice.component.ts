import { Component, OnInit, OnDestroy } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { Payment } from '../../models/payment';
import { SessionAPIService } from '../session-api.service';

@Component({
  selector: 'app-charge-invoice',
  templateUrl: './charge-invoice.component.html',
  styleUrls: ['./charge-invoice.component.css']
})
export class ChargeInvoiceComponent implements OnInit, OnDestroy {

  patient: Patient
  payment: Payment;
  dateToday: Date;

  constructor(private sessionAPIService: SessionAPIService) { }

  ngOnInit(): void {
    this.dateToday = new Date();
    this.patient = this.sessionAPIService.getPatientFromLS();
    this.payment = this.sessionAPIService.getPaymentFromLS();

    console.log(this.patient);
  }

  ngOnDestroy() {
    this.sessionAPIService.removePaymentFromLS();
  }

}

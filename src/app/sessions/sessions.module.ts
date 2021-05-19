import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgxPrintModule } from 'ngx-print';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SharedModule } from '../shared/shared.module';

//Services
import { SessionAPIService } from './session-api.service';

// Components
import { SessionComponent } from './session/session.component';
import { ContainerComponent } from './container/container.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { PhysicalExaminationComponent } from './physical-examination/physical-examination.component';
import { ComorbiditiesComponent } from './comorbidities/comorbidities.component';
import { InvestigationsComponent } from './investigations/investigations.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { SessionNotesContainerComponent } from './session-notes-container/session-notes-container.component';
import { PaymentsComponent } from './payments/payments.component';
import { VitalsComponent } from './vitals/vitals.component';
import { ChargeInvoiceComponent } from './charge-invoice/charge-invoice.component';
import { ChargeReceiptComponent } from './charge-receipt/charge-receipt.component';



@NgModule({
  declarations: [
    SessionComponent,
    ContainerComponent,
    ComplaintsComponent,
    PhysicalExaminationComponent,
    ComorbiditiesComponent,
    InvestigationsComponent,
    DiagnosisComponent,
    TreatmentComponent,
    SessionNotesContainerComponent,
    PaymentsComponent,
    VitalsComponent,
    ChargeInvoiceComponent,
    ChargeReceiptComponent
  ],
  
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbDatepickerModule,
    TypeaheadModule.forRoot(),
    NgxSpinnerModule,
    SharedModule,
    NgxPrintModule,
    MatProgressSpinnerModule
  ],

  providers: [ SessionAPIService ]
})
export class SessionsModule { }

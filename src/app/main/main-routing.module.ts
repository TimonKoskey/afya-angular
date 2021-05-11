import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { HomeComponent } from './home/home.component';
import { PatientRecordsComponent } from './patient-records/patient-records.component';
import { RegisterPatientFormComponent } from './register-patient-form/register-patient-form.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { ActiveSessionsComponent } from './active-sessions/active-sessions.component';
import { RetrieveSessionComponent } from './retrieve-session/retrieve-session.component';
import { FollowUpComponent } from './follow-up/follow-up.component';
import { CashReportComponent } from './cash-report/cash-report.component';
import { LabResultsListComponent } from './lab-results-list/lab-results-list.component';
import { EditPatientDetailsComponent } from './edit-patient-details/edit-patient-details.component';

import { ContainerComponent } from '../sessions/container/container.component';
import { SessionComponent } from '../sessions/session/session.component';
import { SessionNotesContainerComponent } from '../sessions/session-notes-container/session-notes-container.component';
import { PaymentsComponent } from '../sessions/payments/payments.component';
import { ComplaintsComponent } from '../sessions/complaints/complaints.component';
import { PhysicalExaminationComponent } from '../sessions/physical-examination/physical-examination.component';
import { ComorbiditiesComponent } from '../sessions/comorbidities/comorbidities.component';
import { InvestigationsComponent } from '../sessions/investigations/investigations.component';
import { DiagnosisComponent } from '../sessions/diagnosis/diagnosis.component';
import { TreatmentComponent } from '../sessions/treatment/treatment.component';
// import { RemarksComponent } from '../session/remarks/remarks.component';
import { VitalsComponent } from '../sessions/vitals/vitals.component';
import { ChargeInvoiceComponent } from '../sessions/charge-invoice/charge-invoice.component';
import { ChargeReceiptComponent } from '../sessions/charge-receipt/charge-receipt.component';

import { AdminComponent } from '../admin/admin/admin.component';
import { AdminDashboardComponent } from '../admin/admin-dashboard/admin-dashboard.component';
import { UsersListComponent } from '../admin/users-list/users-list.component';
import { UserDetailsComponentComponent } from '../admin/user-details-component/user-details-component.component';
import { AddUserComponent } from '../admin/add-user/add-user.component';

import { ProfileDashboardComponent } from '../profile/profile-dashboard/profile-dashboard.component';

import { AuthGuard } from '../services/guards/auth.guard';

const routes: Routes = [
  { path: 'account', component: MainComponent, children: [

    { path: '',   redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },

    { path: '', component: MainContainerComponent, children: [

      { path: 'register-patient', component: RegisterPatientFormComponent },
      { path: 'patients/list', component: PatientRecordsComponent },
      { path: 'patient-details', component: PatientDetailsComponent },
      { path: 'patient-details/edit', component: EditPatientDetailsComponent },
      { path: 'active-sessions', component: ActiveSessionsComponent },
      { path: 'retrieve-session', component: RetrieveSessionComponent },
      { path: 'follow-up-sessions', component: FollowUpComponent },
      { path: 'cash-report', component: CashReportComponent },
      { path: 'lab-results', component: LabResultsListComponent },
      { path: 'profile', component: ProfileDashboardComponent },

      { path: 'session', component: ContainerComponent, children: [
        { path: 'session-data', component: SessionNotesContainerComponent, children: [
          { path: 'session-summary', component: SessionComponent },
          { path: 'complaints', component: ComplaintsComponent },
          { path: 'physical-exam', component: PhysicalExaminationComponent },
          { path: 'comorbidities', component: ComorbiditiesComponent },
          { path: 'investigations', component: InvestigationsComponent },
          { path: 'diagnosis', component: DiagnosisComponent },
          { path: 'treatment', component: TreatmentComponent },
          { path: 'vitals', component: VitalsComponent },
          { path: 'payments', component: PaymentsComponent },
          { path: 'invoice', component: ChargeInvoiceComponent },
        ]},
      ]},
  
      { path: 'admin', component: AdminComponent, children: [
        { path: '', component: AdminDashboardComponent },
        { path: 'users-list', component: UsersListComponent },
        { path: 'user/details', component: UserDetailsComponentComponent },
        { path: 'register-user', component: AddUserComponent }
      ]},
      
      { path: 'profile', loadChildren: () => import('../user-profile/user-profile.module').then(m => m.UserProfileModule),canActivate: [AuthGuard] }

    ]},

  ], canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ AuthGuard ]
})
export class MainRoutingModule { }

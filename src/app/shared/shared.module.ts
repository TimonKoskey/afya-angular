import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientInformationComponent } from './patient-information/patient-information.component';



@NgModule({
  declarations: [PatientInformationComponent],
  imports: [
    CommonModule
  ],
   exports: [PatientInformationComponent]
})
export class SharedModule { }

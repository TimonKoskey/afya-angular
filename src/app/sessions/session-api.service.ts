import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersistenceService, StorageType } from 'angular-persistence';
import { Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Patient } from '../models/patient';
import { Session } from '../models/session';
import { Notes } from '../models/notes';
import { Payment } from '../models/payment';
import { Vitals } from '../models/vitals';
import { Investigations } from '../models/investigation';

@Injectable({
  providedIn: 'root'
})
export class SessionAPIService {

  patientBaseUrl = `https://backend.ngoitsihosp.co.ke/patients`;
  sessionBaseUrl = `https://backend.ngoitsihosp.co.ke/visits`;

  // private sessions = new BehaviorSubject<Array<Session>>(null);
  // session$ = this.sessions.asObservable();

  constructor(
    private http: HttpClient,
    private persistence: PersistenceService
  ) {
    if(isDevMode()) {
      this.patientBaseUrl = `http://127.0.0.1:8000/patients`;
      this.sessionBaseUrl = `http://127.0.0.1:8000/visits`;
    }
  }

  setPatientToLS(patient: Patient) {
    this.persistence.set('patient', patient, { type: StorageType.SESSION });
  }

  getPatientFromLS() {
    return this.persistence.get('patient', StorageType.SESSION);
  }

  removePatientFromLS() {
    this.persistence.remove('patient', StorageType.SESSION);
  }

  setPaymentToLS(payment: Payment) {
    this.persistence.set('payment', payment, { type: StorageType.SESSION });
  }

  getPaymentFromLS() {
    return this.persistence.get('payment', StorageType.SESSION);
  }

  removePaymentFromLS() {
    this.persistence.remove('payment', StorageType.SESSION);
  }

  getAllVisitsOfPatient(patientID: number): Observable<Array<Session>> {
    return this.http.get<Array<Session>>(`${this.sessionBaseUrl}/patient/all/${patientID}`);
  }

  createSessionComplaints(sessionID: number, notes: Notes): Observable<Session> {
    return this.http.post<Session>(`${this.sessionBaseUrl}/complaints/create/${sessionID}`, notes);
  }

  getSessionComplaints(sessionID: number): Observable<Array<Notes>> {
    return this.http.get<Array<Notes>>(`${this.sessionBaseUrl}/complaints/list/${sessionID}`);
  }

  deleteSessionComplaints(notesID: number) {
    return this.http.delete(`${this.sessionBaseUrl}/complaints/delete/${notesID}`);
  }

  createSessionPhysicalExamination(sessionID: number, notes: Notes): Observable<Session> {
    return this.http.post<Session>(`${this.sessionBaseUrl}/physc-exams/create/${sessionID}`, notes);
  }

  getSessionPhycExam(sessionID: number): Observable<Array<Notes>> {
    return this.http.get<Array<Notes>>(`${this.sessionBaseUrl}/physc-exams/list/${sessionID}`);
  }

  deleteSessionPhysicalExamination(notesID: number) {
    return this.http.delete(`${this.sessionBaseUrl}/physc-exams/delete/${notesID}`);
  }

  createSessionComorbidities(sessionID: number, notes: Notes): Observable<Session> {
    return this.http.post<Session>(`${this.sessionBaseUrl}/comorbidities/create/${sessionID}`, notes);
  }

  getSessionComorbities(sessionID: number): Observable<Array<Notes>> {
    return this.http.get<Array<Notes>>(`${this.sessionBaseUrl}/comorbidities/list/${sessionID}`);
  }

  deleteSessionComorbidities(notesID: number): Observable<Notes> {
    return this.http.delete(`${this.sessionBaseUrl}/comorbidities/delete/${notesID}`);
  }

  createSessionDiagnosis(sessionID: number, notes: Notes): Observable<Session> {
    return this.http.post<Session>(`${this.sessionBaseUrl}/diagnosis/create/${sessionID}`, notes);
  }

  getSessionDiagnosis(sessionID: number): Observable<Array<Notes>>{
    return this.http.get<Array<Notes>>(`${this.sessionBaseUrl}/diagnosis/list/${sessionID}`);
  }

  deleteSessionDiagnosis(notesID: number) {
    return this.http.delete(`${this.sessionBaseUrl}/diagnosis/delete/${notesID}`);
  }

  createSessionTreatment(sessionID: number, notes: Notes): Observable<Session> {
    return this.http.post<Session>(`${this.sessionBaseUrl}/treatment/create/${sessionID}`, notes);
  }

  getSessionTreatment(sessionID: number): Observable<Array<Notes>>{
    return this.http.get<Array<Notes>>(`${this.sessionBaseUrl}/treatment/list/${sessionID}`);
  }

  deleteSessionTreatment(notesID: number) {
    return this.http.delete(`${this.sessionBaseUrl}/treatment/delete/${notesID}`);
  }

  createPaymentInformation(sessionID: number, payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.sessionBaseUrl}/payment/create/${sessionID}`, payment);
  }

  getSessionPaymentsList(sessionID: number): Observable<Array<Payment>> {
    return this.http.get<Array<Payment>>(`${this.sessionBaseUrl}/payments/list/${sessionID}`);
  }

  updateSessionPaymentDetails(paymentID: number, payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.sessionBaseUrl}/payment/details/${paymentID}`, payment);
  }

  deleteSessionPaymentDetails(paymentID: number){
    return this.http.delete(`${this.sessionBaseUrl}/payment/details/${paymentID}`);
  }

  createSessionVitals(sessionID: number, vitals: Vitals): Observable<Vitals> {
    return this.http.post<Vitals>(`${this.sessionBaseUrl}/vitals/create/${sessionID}`, vitals);
  }

  getSessionVitals(sessionID: number): Observable<Array<Vitals>> {
    return this.http.get<Array<Vitals>>(`${this.sessionBaseUrl}/vitals/details/${sessionID}`);
  }

  updateSessionVitalsDetails(vitalsID: number, vitals: Vitals): Observable<Vitals> {
    return this.http.put<Vitals>(`${this.sessionBaseUrl}/vitals/update/${vitalsID}`, vitals);
  }

  createSessionInvestigations(sessionID: number, investigations: Array<Investigations>): Observable<Array<Investigations>> {
    return this.http.post<Array<Investigations>>(`${this.sessionBaseUrl}/investigations/create/${sessionID}`, investigations);
  }

  getSessionInvestigations(sessionID: number): Observable<Array<Investigations>> {
    return this.http.get<Array<Investigations>>(`${this.sessionBaseUrl}/investigations/list/${sessionID}`);
  }

  updateSessionInvestigations(investigationID: number, updateData: any): Observable<Investigations> {
    return this.http.put<Investigations>(`${this.sessionBaseUrl}/investigations/update/${investigationID}`, updateData);
  }

  deleteSessionInvestigations(investigationID: number): Observable<Investigations> {
    return this.http.delete<Investigations>(`${this.sessionBaseUrl}/investigations/delete/${investigationID}`);
  }

  getSessionDetails(sessionID: number): Observable<Session> {
    return this.http.get<Session>(`${this.sessionBaseUrl}/session/details/${sessionID}`);
  }

  getPatientDetails(patientID: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.patientBaseUrl}/patient/details/${patientID}`);
  }

  getComplaintsSuggestions(): Observable<any> {
    return this.http.get(`${this.sessionBaseUrl}/complaints/suggestions`);
  }

  getPhysicalSuggestions(): Observable<any> {
    return this.http.get(`${this.sessionBaseUrl}/phyc-exams/suggestions`);
  }

  getComorbiditiesSuggestions(): Observable<any> {
    return this.http.get(`${this.sessionBaseUrl}/comorbidities/suggestions`);
  }

  getInvestigationsRequestSuggestions(): Observable<any> {
    return this.http.get(`${this.sessionBaseUrl}/investigations/request/suggestions`);
  }

  getInvestigationsResultsSuggestions(): Observable<any> {
    return this.http.get(`${this.sessionBaseUrl}/investigations/results/suggestions`);
  }

  getDiagnosisSuggestions(): Observable<any> {
    return this.http.get(`${this.sessionBaseUrl}/diagnosis/suggestions`);
  }

  getTreatmentSuggestions(): Observable<any> {
    return this.http.get(`${this.sessionBaseUrl}/treatment/suggestions`);
  }

  updatePatientDetails(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.patientBaseUrl}/patient/details/update/${patient.id}`, patient);
  }

  deletePatientDetails(patientID: number): Observable<any> {
    return this.http.delete(`${this.patientBaseUrl}/patient/details/${patientID}`);
  }

  createSessionPrescription(sessionID: number, notes: Notes): Observable<Session> {
    return this.http.post<Session>(`${this.sessionBaseUrl}/prescription/create/${sessionID}`, notes);
  }

  getSessionPrescription(sessionID: number): Observable<Array<Notes>>{
    return this.http.get<Array<Notes>>(`${this.sessionBaseUrl}/prescription/list/${sessionID}`);
  }

  deleteSessionPrescription(notesID: number) {
    return this.http.delete(`${this.sessionBaseUrl}/prescription/delete/${notesID}`);
  }

  getPrescriptionSuggestions(): Observable<any> {
    return this.http.get(`${this.sessionBaseUrl}/prescription/suggestions`);
  }

}

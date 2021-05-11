import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAPIService {
  userUrl = `https://backend.ngoitsihosp.co.ke/users`;
  userDetails: any;

  constructor(
    private http: HttpClient
  ) {
    if(isDevMode()) {
      this.userUrl = `http://127.0.0.1:8000/users`;
    }
  }

  getUserData(): Observable<any> {
    return this.http.get<any>(`${this.userUrl}/list/users`);
  }

  addUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.userUrl}/create`, data);
  }

  updateUser(userID: number, updateData: any): Observable<any> {
    return this.http.put<any>(`${this.userUrl}/user/update/${userID}`, updateData);
  }

  blockUser(userID: number, updateData: any): Observable<any> {
    return this.http.put<any>(`${this.userUrl}/user/update/${userID}`, updateData);
  }

  unblockUser(userID: number, updateData: any): Observable<any> {
    return this.http.put<any>(`${this.userUrl}/user/update/${userID}`, updateData);
  }

  deleteUserData(userID: number): Observable<any> {
    return this.http.delete<any>(`${this.userUrl}/user/delete/${userID}`);
  }

  checkCurrentPassword(data: any){
    return this.http.post<any>(`${this.userUrl}/password/confirm`, data);
  }

  changePassword(data: any) {
    return this.http.post<any>(`${this.userUrl}/password/change`, data);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionTransferService {
  basePath: string = 'http://localhost:8080/home.banking/api/session/';

  constructor(private http: HttpClient) { }

  requestSessionTransfer(email: string, OTP: string){
    const headers = { 'Authorization': email + ' ' + OTP };

    return this.http.get(
      `${this.basePath}request-transfer`,
      {headers, responseType: 'text'});
  }

  getSessionCredentials(sessionCode: string){
    const headers = { 'Authorization': sessionCode };
    
    return this.http.get(
      `${this.basePath}get-transfer-credentials`,
      {headers, responseType: 'text'});
  }
}

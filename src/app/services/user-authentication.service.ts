import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  basePath: string = 'http://localhost:8080/home.banking/api/auth/';

  constructor(private http: HttpClient) { }

  getOTP(email: string, password: string) {
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post(
      `${this.basePath}login/get-otp`,
      {"email": email, "password": password},
      {headers, responseType: 'text'});
  }

  checkOTP(email: string, OTP: string){
    const headers = { 'Authorization': email + ' ' + OTP };

    return this.http.get(
      `${this.basePath}login/check-otp`,
      {headers, responseType: 'text'});
  }

  logout(email: string, OTP: string){
    const headers = { 'Authorization': email + ' ' + OTP };

    return this.http.get(
      `${this.basePath}logout`,
      {headers, responseType: 'text'});
  }
}

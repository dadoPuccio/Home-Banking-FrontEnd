import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankAccount } from '../model/bank-account';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  basePath: string = 'http://localhost:8080/home.banking/api/user/';

  constructor(private http: HttpClient) { }

  getBankAccounts(email: string, OTP: string){
    const headers = { 'Authorization': email + ' ' + OTP };

    return this.http.get<BankAccount>(
      `${this.basePath}accounts`,
      {headers});
  }
}

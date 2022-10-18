import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService {

  constructor() {}

  public setEmailPassword(email: string, password: string){
    localStorage.setItem('email',email);
    localStorage.setItem('password', password);
  }

  public setEmail(email: string){
    localStorage.setItem('email', email);
  }

  public setOTP(otp: string){
    localStorage.setItem('otp', otp);
  }

  public getLoginCredentials() {
    return [localStorage.getItem('email'), localStorage.getItem('otp')];
  }

  public clear(){
    localStorage.clear();
  }

}

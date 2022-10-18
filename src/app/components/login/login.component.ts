import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClrModal } from '@clr/angular';
import { catchError, of } from 'rxjs';
import { SessionDataService } from 'src/app/services/session-data.service';
import { SessionTransferService } from 'src/app/services/session-transfer.service';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild("OTPModal") otpModal = ClrModal;

  email = new FormControl('', Validators.required);
  password =  new FormControl('', Validators.required);

  showOTPDialog: boolean = false;
  otp = new FormControl('', Validators.required);

  showTransferDialog: boolean = false;
  sessionCode = new FormControl('',  Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.required]));

  constructor(
    private userAuthenticationService: UserAuthenticationService,
    private sessionDataService: SessionDataService,
    private sessionTransferService: SessionTransferService,
    private router: Router, private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    
  }

  /*
  handleOtpDialogClosure(otp: string): void {
    this.modal.close();
    this.sessionDataService.setOTP(otp);
    this.router.navigate([`../reserved-area`], { relativeTo: this.route });
  }*/

  submitCredentials(): void {
    if(this.email.valid && this.password.valid){

      this.userAuthenticationService.getOTP(this.email.value!, this.password.value!)
        .pipe(
          catchError(error => {
          if (error.error instanceof ErrorEvent) {
            return of(error.error.message);
          }
          else{
            return of(error.message);
          }
          
          })
        )
        .subscribe(
          (response: any) => {
            if(response == 'OTP generato con successo'){
              this.sessionDataService.setEmailPassword(this.email.value!, this.password.value!);
              this.showOTPDialog = true;
            } else {
              this.email.setErrors({ invalid: '' });
              this.password.setErrors({ invalid: '' });
            }
            console.log(response)
          ;}
        );
    }
  }

  submitOTP(): void {
    if(this.otp.valid){

      this.userAuthenticationService.checkOTP(this.email.value!, this.otp.value!)
        .pipe(
          catchError(error => {
            if (error.error instanceof ErrorEvent) {
              return of(error.error.message);
            }
            else{
              return of(error.message);
            }
          })
        )
        .subscribe(
          (response: any) => {
            console.log(response);
            if(response == "Utente autenticato con successo"){
              this.showOTPDialog = false;
              this.sessionDataService.setOTP(this.otp.value!);
              this.router.navigate([`../reserved-area`], { relativeTo: this.route }); 
            } else {
              this.otp.setErrors({invalid: ''});
            }
          ;}
        );
      }
  }

  submitTransferCode(): void {
    if(this.sessionCode.valid){
      this.sessionTransferService.getSessionCredentials(this.sessionCode.value!)
        .pipe(
          catchError(error => {
            if (error.error instanceof ErrorEvent) {
              return of(error.error.message);
            }
            else{
              return of(error.message);
            }
          })
        )
        .subscribe(
          (response: any) => {
            console.log(response);
            try{
              let credentials = JSON.parse(response);
              this.sessionDataService.setEmail(credentials.email);
              this.sessionDataService.setOTP(credentials.otp);
              this.router.navigate([`../reserved-area`], { relativeTo: this.route }); 
            } catch(SysntaxError) {
              this.sessionCode.setErrors({invalid: ''});
            }
          ;}
        );
    }
  }

}

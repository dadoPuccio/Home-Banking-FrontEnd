import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClrWizard } from '@clr/angular';
import { catchError, of } from 'rxjs';
import { BankAccount } from 'src/app/model/bank-account';
import { SessionDataService } from 'src/app/services/session-data.service';
import { SessionTransferService } from 'src/app/services/session-transfer.service';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-area-riservata',
  templateUrl: './area-riservata.component.html',
  styleUrls: ['./area-riservata.component.css']
})
export class AreaRiservataComponent implements OnInit {
  @ViewChild("sessionTransfer") sessionTransferWizard = ClrWizard;

  email!: string;
  otp!: string;

  accounts: BankAccount[];

  openTransfer: boolean = false;

  sessionTransferCode: string | undefined;
  id: number | undefined;

  constructor(
    private sessionDataService: SessionDataService,
    private userService: UserService,
    private userAuthenticationService: UserAuthenticationService,
    private sessionTransferService: SessionTransferService,
    private router: Router, private route: ActivatedRoute
  ) { 
    this.accounts = [];
  }

  ngOnInit(): void {
    let credentials = this.sessionDataService.getLoginCredentials();

    if(credentials[0] == null && credentials[1] == null){
      this.router.navigate([`../login`], { relativeTo: this.route });
    } else {
      this.email = credentials[0]!;
      this.otp = credentials[1]!;
      
      this.checkCredentialsValidity();
      
      this.userService.getBankAccounts(this.email!, this.otp!)
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
          this.accounts = response;
          // console.log(this.accounts);
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  checkCredentialsValidity(): void {
    this.userAuthenticationService.checkOTP(this.email, this.otp)
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
            if(response != "Utente autenticato con successo"){
              this.sessionDataService.clear();
              this.router.navigate([`../login`], { relativeTo: this.route });
            }
          ;}
        );
  }

  openSessionTransferModal(): void {
    this.openTransfer=true; 
    this.sessionTransferCode=undefined;
  }

  requestSessionTransfer(): void {
    let credentials = this.sessionDataService.getLoginCredentials();
    if(credentials[0] == null && credentials[1] == null){
      this.router.navigate([`../login`], { relativeTo: this.route });
    } else {
      this.email = credentials[0]!;
      this.otp = credentials[1]!;
      
      this.sessionTransferService.requestSessionTransfer(this.email!, this.otp!)
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
          if(response != "" && response != null){
            this.sessionTransferCode = response;
            this.checkTransferCodeUsed();
          } else {
            console.log("Qualcosa è andato storto nella richiesta di trasferimento sessione");
            this.router.navigate([`../login`], { relativeTo: this.route });
          }
        }
      );
    }
  }

  

  checkTransferCodeUsed(){
    this.id = window.setInterval(() => {
      this.userAuthenticationService.checkOTP(this.email, this.otp)
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
            if(response != "Utente autenticato con successo"){
              this.sessionDataService.clear();
              this.router.navigate([`../login`], { relativeTo: this.route });
            }
          ;}
        );
    }, 3000);
  }

}

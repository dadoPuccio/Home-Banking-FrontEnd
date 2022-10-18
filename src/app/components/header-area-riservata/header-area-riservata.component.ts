import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { SessionDataService } from 'src/app/services/session-data.service';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';

@Component({
  selector: 'app-header-area-riservata',
  templateUrl: './header-area-riservata.component.html',
  styleUrls: ['./header-area-riservata.component.css']
})
export class HeaderAreaRiservataComponent implements OnInit {

  constructor(
    private userAuthenticationService: UserAuthenticationService,
    private sessionDataService: SessionDataService,
    private router: Router, private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  logout(): void {
    let credentials = this.sessionDataService.getLoginCredentials();
    let email = credentials[0];
    let otp = credentials[1];

    this.userAuthenticationService.logout(email!, otp!)
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
          if(response == 'Logout eseguito con successo'){
            this.sessionDataService.clear();
            this.router.navigate([`../home`], { relativeTo: this.route });
          } else {
            // qui finisco se l'otp è scaduto: pulisco la memoria locale e torno alla pagina di login
            this.sessionDataService.clear();
            this.router.navigate([`../login`], { relativeTo: this.route });
          }
        }
      );
  }
}

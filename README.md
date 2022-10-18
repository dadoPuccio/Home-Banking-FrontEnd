# Home-Banking Frontend

![alt text](https://github.com/dadoPuccio/home_banking_frontend/blob/main/images/logo%20no%20sfondo.png)

Implementazione del frontend della web application [PSB Home Banking](https://github.com/CosimoGiani/SWAM_home_banking). Questo progetto è parte dell'esame Software Architectures and Methodologies (SWAM) tenuto dal Prof. Enrico Vicario, in collaborazione con il Dott. Boris Brizzi, l’Ing. Jacopo Parri e l’Ing. Samuele Sampietro.

Nella realizzazione sono state utilizzate le seguenti tecnologie:

- [Angular](https://angular.io/): framework open-source per lo sviluppo del frontend di applicazioni web.
- [Clarity](https://clarity.design/): design system open-source che permette di arricchire l’esperienza utente durante l’interazione con l’applicazione.

Sono state implementate 3 viste nell’applicazione, navigabili grazie al modulo `AppRouter` di Angular:

 - `home`: pagina principale dell’applicazione

 <img src="https://github.com/dadoPuccio/home_banking_frontend/blob/main/images/home.png" width="600px"/>


 - `login`: pagina in cui è possibile procedere all'autenticazione, tramite verifica a due fattori oppure tramite codice di trasferimento di sessione

<img src="https://github.com/dadoPuccio/home_banking_frontend/blob/main/images/login.png" width="600px"/>


 - `reserved-area`: pagina in cui il cliente autenticare può visionare i suoi conti bancari e sfruttare la funzionalità di trasferimento sessione

<img src="https://github.com/dadoPuccio/home_banking_frontend/blob/main/images/reserved-area.png" width="600px"/>


L’applicazione dialoga con il backend (istanziato localmente su un server WildFly) facendo uso del modulo `HttpClient` di Angular. Sono state implementate le funzionalità di login e logout, assieme a quella di trasferimento sessione.  
Dal momento che il backend richiede all’utente autenticato di trasmettere le sue credenziali (coppia <e-mail - OTP>) ad ogni successiva richiesta, queste vengono memorizzate temporaneamente lato frontend nel Local Storage offerto da Angular.

## Interazioni Principali

  
## Eseguire il Codice

È necessario avere nella propria macchina [npm](https://www.npmjs.com/) ed [Angular CLI](https://github.com/angular/angular-cli) in modo da poter eseguire correttamente il codice.

Facendo uso di `ng serve` è possibile mandare in esecuzione il progetto su un server locale. Navigando quindi su `http://localhost:4200/` da un qualsiasi browser è possibile interagire con il front-end. Dato che l'applicazione è pensata per interfacciarsi al backend di [PSB Home Banking](https://github.com/CosimoGiani/SWAM_home_banking), si consiglia di mandare in esecuzione localmente in un server locale anche quest'ultimo, così da poter apprezzare a pieno tutte le funzionalità del frontend in uno scenario realistico.


## Ulteriori Informazioni

Il progetto è stato generato attraverso [Angular CLI](https://github.com/angular/angular-cli) in versione 14.2.3.

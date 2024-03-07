import { Component, OnInit } from '@angular/core';
import { InscriptionService } from './services/inscription.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  constructor(private inscriptionService : InscriptionService,public router: Router,) { }

  
    ngOnInit() {
      this.inscriptionService.loadToken();
      if (this.inscriptionService.getToken()==null || 
          this.inscriptionService.isTokenExpired())
            this.router.navigate(['/connexion']);
  
    }  
  title = 'angular';
}

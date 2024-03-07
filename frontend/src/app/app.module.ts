import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { RecupererComponent } from './recuperer/recuperer.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';


import { EmployeedetailComponent } from './employeedetail/employeedetail.component';

import { ConnexionComponent } from './connexion/connexion.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ProfileComponent } from './profile/profile.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';






@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,

    RecupererComponent,
    EmployeedetailComponent,



    RecupererComponent,

    ConnexionComponent,
      NavbarComponent,
      AcceuilComponent,
      ProfileComponent,
      ForbiddenComponent

     


  ],
  imports: [

    FormsModule,
    HttpClientModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,

  ],
  providers: [


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

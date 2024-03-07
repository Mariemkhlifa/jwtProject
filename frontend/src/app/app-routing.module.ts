 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { EmployeedetailComponent } from './employeedetail/employeedetail.component';
import { RecupererComponent } from './recuperer/recuperer.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ProfileComponent } from './profile/profile.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UserGuard } from './user.guard';



const routes: Routes = [
  { path: 'inscription', component: InscriptionComponent },
  { path: 'detail/:user_id', component: EmployeedetailComponent },
  { path: 'profile/:user_id', component: ProfileComponent , canActivate:[UserGuard]},
  { path: 'inscrit', component: InscriptionComponent },
  { path: 'recuperer', component: RecupererComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'login', component: ConnexionComponent },
  { path: 'acceuil', component: AcceuilComponent },
  {path: 'app-forbidden', component: ForbiddenComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

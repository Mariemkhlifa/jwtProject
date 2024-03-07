import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { InscriptionService } from '../services/inscription.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  user = new User();
  err : number = 0;

  constructor(private inscriptionService : InscriptionService,public router: Router,) { }

  ngOnInit(): void {
  }

  onLoggedin() {
    this.inscriptionService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
  
        // Save the token to localStorage
        this.inscriptionService.saveToken(jwToken);
  
        // Decode the token to get user_id from roles array
        const decodedToken = this.inscriptionService.decodeToken(jwToken);
        const userRoles = decodedToken.roles;
  
        // Find the role containing 'USER_ID_' and extract the user_id
        const userIdRole = userRoles.find((role:string) => role.startsWith('USER_ID_'));
        const userId = userIdRole ? userIdRole.split('_')[2] : null;
  
        if (userId) {
          // Save user_id to localStorage
          this.inscriptionService.saveUserId(userId);
        } else {
          console.error('User ID not found in the decoded token roles', userRoles);
        }
  
        console.log(this.user.password);
        this.router.navigate(['/acceuil']);
      },
      error: (err: any) => {
        this.err = 1;
      }
    });


  }


recupererpassword(){

  this.router.navigate(['/recuperer']);

}
  

}

import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { InscriptionService } from '../services/inscription.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  employee: User = new User();

  constructor(private inscriptionService: InscriptionService, 
    public router: Router, public userService: UserService) {
    this.genererMatricule();
  }

  genererMatricule(): void {
    const anneeCourante = new Date().getFullYear();
    let chiffresAleatoires = Math.floor(1000 + Math.random() * 9000);
    let matricule = `${anneeCourante}${chiffresAleatoires}`;


    this.checkMatriculeExistence(matricule);
  }


  checkMatriculeExistence(matricule: string): void {
    this.userService.getTousUsers().subscribe(
      (tousLesUsers: User[]) => {
        const matriculeExiste = tousLesUsers.some(user => user.matricule == matricule);

        if (matriculeExiste) {

          this.genererMatricule();
        } else {
          this.employee.matricule = matricule;
        }

      },
      error => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    );
  }

  ngOnInit(): void {

  
  }

  onSubmit() {
    if (this.employee.dateNaissance && this.employee.password && this.employee.lastName && this.employee.matricule && this.employee.username && this.employee.email &&  this.employee.tel ) {
      this.userService.ajouteruser(this.employee).subscribe(
        (response) => {
          console.log('Utilisateur inscrit', response);
          this.router.navigate(['/login']); // Navigate to the login page after successful registration

        },
        (error) => {
          console.error('Erreur d\'inscription :', error);
          console.log('erreur');
        }
      );
    } else {
      alert('remplir les champs');
    }
  }
}

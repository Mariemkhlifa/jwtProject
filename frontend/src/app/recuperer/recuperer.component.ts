import { Component, OnInit } from '@angular/core';
import { RecupererService } from '../services/recuperer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { InscriptionService } from '../services/inscription.service';

@Component({
  selector: 'app-recuperer',
  templateUrl: './recuperer.component.html',
  styleUrls: ['./recuperer.component.css']
})
export class RecupererComponent implements OnInit {
  token: any;
  idUser: number | undefined;
  user:any;

  constructor(
   public userservice: UserService,
    public router: Router,
    public activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.activatedroute.params.subscribe((data) => {
      this.idUser = data['id'];
    });
  }

  verifier(formrecuperation: NgForm) {

    let email = formrecuperation.value['email'];
    let matricule = formrecuperation.value['matricule'];


    this.userservice.getMailMatricule(email, matricule).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user);
      },
      (error) => {
        alert('veuillez vérifier vos données');
      }
    );
  }

  modifier(formrecuperation: NgForm) {
    let password = formrecuperation.value['password'];
  
    if (password !== '') {
      this.user.password = password;
  
      try {
        this.userservice.modifierUser(this.user).subscribe(
          (data) => {
            alert('Modification avec succès');
            this.router.navigate(['/connexion']);
          },
          (error) => {
            console.error('Erreur lors de la modification :', error);
            alert('Une erreur s\'est produite lors de la modification.');
          }
        );
      } catch (error) {
        console.error('Erreur inattendue :', error);
        alert('Une erreur inattendue s\'est produite.');
      }
    } else {
      alert('Veuillez saisir tous les champs');
    }
  }
  
}

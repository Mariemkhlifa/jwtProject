
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { InscriptionService } from '../services/inscription.service';


@Component({
  selector: 'app-detail',
  templateUrl: './employeedetail.component.html',
  styleUrls: ['./detail.css']

})
export class EmployeedetailComponent implements OnInit {
  

  user:  Partial<User>={};
  isEditMode: boolean = false;
  user_id: any;
  constructor(public inscriptionService : InscriptionService,private route: ActivatedRoute,public router: Router, private userService: UserService) {}

  ngOnInit() {
    //vérifier si l'utilisateur a réussi l'étape de connexion ou non
    // let ok: string = 'ok';
    // if (ok != sessionStorage.getItem('login')) {
    //   this.router.navigate(['/connexion']);
    // }
     

    // Retrieve user_id from local storage
    this.user_id = localStorage.getItem('user_id');

    // Check if user_id is available before making the request
    if (this.user_id) {
      this.userService.getUserById(this.user_id).subscribe(
        (data: User) => {
          this.user = data;
        },
        error => {
          console.error(error);
          alert('Verifier les données');
        }
      );
    } else {
      // Handle the case when user_id is not available in local storage
      console.error('User ID not found in local storage');
    }


  }


  find(formemploye: NgForm) {
    let matriculeemp = formemploye.value['matriculeemp'];
    console.log(matriculeemp);

    if (matriculeemp) {
      this.userService.getUserByMatricule(matriculeemp).subscribe(
        (data) => {
          this.user = data;

        },
        error => {
          console.error(error);
          alert('Erreur');
        }
      );
    } else {
      alert('auccun employé avec la matricule '+matriculeemp);
    }
  }


  onSubmit() {
    const userId = this.user?.user_id;

    if (userId) {
      this.userService.updateUserDetails(userId, this.user).subscribe(
        (updatedUser: User) => {
          this.user = updatedUser;
        },
        error => {
          console.error(error);
          alert('Erreur lors de la sauvegarde des modifications');
        }
      );
    } else {
      alert('User ID not found.');
    }
  }


  supprimer(){
    this.userService.deleteUser(this.user.user_id).subscribe(

      (data) => {
        alert('suppression effectuée');
        this.router.navigate(['/acceuil']);
      },
      (error) => {
        alert('suppression erronee');
      }
    );
  }

}

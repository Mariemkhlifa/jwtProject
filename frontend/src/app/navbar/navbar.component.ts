import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InscriptionService } from '../services/inscription.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {
user_id: any;
role: any;
user:  Partial<User>={};


  constructor(public inscriptionService : InscriptionService,private route: ActivatedRoute,public router: Router, private userService: UserService) { }


  ngOnInit(): void {

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
          // You may want to redirect the user or handle this situation accordingly
        }
  
  }

  destroy() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/connexion']);
  }

}

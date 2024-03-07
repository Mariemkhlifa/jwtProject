import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {

  user:  Partial<User>={};
  isEditMode: boolean = false;
  user_id: any;
  role: any;
  

  constructor(private route: ActivatedRoute,public router: Router, private userService: UserService) {}

  ngOnInit() {
   

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
  // toggleEditMode() {
  //   this.isEditMode = !this.isEditMode;
  // }
  onSubmit() {
    const userId = this.user?.user_id;

    if (userId) {
      this.userService.updateUserDetails(userId,this.user).subscribe(
        (updatedUser: User) => {
          this.user = updatedUser;
          this.isEditMode = false;
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

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }
  showPassword = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }



}

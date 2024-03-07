import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class InscriptionService  {

  private helper = new JwtHelperService();
  apiURL: string = 'http://localhost:8080/users';
  token!:string;
  public loggedUser!:string;
  public isloggedIn: Boolean = false;
  public roles!:string[];
  public userId!: string; // Ajout du user_id

  public  role:any;
  

  constructor(private router: Router,private http : HttpClient) { }
 

  createUser(employee: User) {
    
    return this.http.post<User>(this.apiURL+'/register', employee);

  }
  
 

  login(user: User) {
    return this.http.post<any>(this.apiURL + '/login', user, { observe: 'response' })
     
  }



 
  
  saveToken(jwt:string){
    localStorage.setItem('jwt',jwt);
    this.token = jwt;
    this.isloggedIn = true;
  }

      // Helper method to decode the token
      public decodeToken(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
      }
    
  saveUserId(userId: string) {
    localStorage.setItem('user_id', userId);
    this.userId = userId;
  }

  getToken():string {
    return this.token;
  }
  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
   // this.getUserRoles(login);
  }

  

  decodeJWT()
  {   if (this.token == undefined)
            return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }


  isAdmin():Boolean{
    if (!this.roles) //this.roles== undefiened
    return false;
    return (this.roles.indexOf('ADMIN') >-1) ;
    ;
  }  


  logout() {
  this.loggedUser = undefined!;
  this.roles = undefined!;
  this.token= undefined!;
  this.isloggedIn = false;
  localStorage.removeItem('jwt');
  this.router.navigate(['/login']);
  }



  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  } 
  isTokenExpired(): Boolean
  {
    return  this.helper.isTokenExpired(this.token);   
  }


  
  inscriptionUser(user :User){
    return this.http.post<User>(this.apiURL+'/inscrit', user,
    {observe:'response'});
    }

  




}

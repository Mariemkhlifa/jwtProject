import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { InscriptionService } from './inscription.service';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient: HttpClient,private inscriptionService : InscriptionService) { }

  apiURL = 'http://localhost:8080/users';

  getTousUsers() : Observable<User[]>{
    return this.httpclient.get<User[]>(this.apiURL+"/all");
  }
  ajouteruser(employee: User): Observable<User[]> {
    let jwt = this.inscriptionService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.httpclient.post<any>(this.apiURL+"/register",employee,{headers:httpHeaders});
  }

  getUserByUsernameAndPassword(username: string, password: string) {
    const url = `${this.apiURL}/connexion/${username}/${password}`;
    let jwt = this.inscriptionService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.httpclient.get(url,{headers:httpHeaders});
  }
  getUserById(user_id: number): Observable<User> {
    const url = `${this.apiURL}/find/${user_id}`;
          console.log(url);
          let jwt = this.inscriptionService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.httpclient.get<User>(url,{headers:httpHeaders});
  }
  getUserByMatricule(matricule: number) {
    const url = `${this.apiURL}/findUserByMatricule/${matricule}`;
    console.log(url);
    let jwt = this.inscriptionService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.httpclient.get<User>(url,{headers:httpHeaders});
  }
  modifierUser(user: User) : Observable<User[]>{

    return this.httpclient.put<User[]>(this.apiURL+"/updatepass", user);
  }

  updateUserDetails(user_id: number, updatedUserData: Partial<User>) {
    const url = `${this.apiURL}/update/${user_id}`;
    let jwt = this.inscriptionService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
  
    return this.httpclient.put<User>(url, updatedUserData, { headers: httpHeaders });
  }
  deleteUser(id: number) {
    const url = `${this.apiURL}/delele/${id}`;
    let jwt = this.inscriptionService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      return this.httpclient.delete<any>(url, {headers:httpHeaders});
    }

    getMailMatricule(email: string, matricule: string) {
      const url = `${this.apiURL}/recuperer/${email}/${matricule}`;
      let jwt = this.inscriptionService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({ "Authorization": jwt });
   
      return this.httpclient.get<User>(url,{headers:httpHeaders});
    
  }

  getUser(iduser: number) {
    return this.httpclient.get(this.apiURL + iduser);
  }
  }




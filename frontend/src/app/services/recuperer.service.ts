import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class RecupererService {

  private apiUrl = 'http://localhost:8080/users';


  constructor(private httpclient: HttpClient) { }



  // getMailMatricule(email: string, matricule: string) {
  // getUser(iduser: number) {
  //   return this.httpclient.get(this.apiUrl + iduser);
  // }

  
   
  //     const url = `${this.apiUrl}/recuperer/${email}/${matricule}`;
  //     console.log(url);
  //     let jwt = this.inscriptionService.getToken();
  //     jwt = "Bearer "+jwt;
  //     let httpHeaders = new HttpHeaders({"Authorization":jwt})
  //     return this.httpclient.get<User>(url,{headers:httpHeaders});
  //     return this.httpclient.get(url );
    
  // }
}

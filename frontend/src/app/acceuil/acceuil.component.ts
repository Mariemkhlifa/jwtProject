import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styles: [
  ]
})
export class AcceuilComponent implements OnInit {

 
  constructor(public router: Router,
  ) { }

  ngOnInit(): void {
    // let ok: string = 'ok';
    // if (ok != sessionStorage.getItem('login')) {
    //   this.router.navigate(['/acceuil']);
    // }
  }

}

import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../register/user.model';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  user:User;
 
 constructor(private htttp: HttpClient) { }
 fetchData = function(){
  this.http.get("http//localhost:9000/user").subscribe(
    (res:Response) => {
      this.user = res.json();
    })
  
}
 
  ngOnInit() {
    this.fetchData();
  }

}

import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../register/user.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
 public  users:any;

  constructor(private http: HttpClient) { 

  }



  ngOnInit() {
    this.http.get("http://localhost:9000/user").subscribe(response=>{
      this.users=response;
    })
    
  }

}

import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import {Router} from '@angular/router';
import { IBaseComponent } from '../base/IBaseComponent';
import { HttpClient} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, ObservableInput } from 'rxjs';
import { Post } from '../home/post.model';
import { User } from '../register/user.model';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent extends IBaseComponent implements OnInit {
  url: string;
  selectedFile:File;
  post:Post;
  user:User;
public files: any[];
  handleError: (err: any, caught: Observable<unknown>) => ObservableInput<unknown>;
  onFileChanged(event: any) {
    this.files = event.target.files;
  }
  onUpload() {
    const formData = new FormData();
    for (const file of this.files) {
        formData.append(name, file, file.name);
    }
    this.http.post('url', formData).subscribe(data => console.log(JSON.stringify(data))),
    catchError(this.handleError);
  }

  onSelectFileChanged(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
       
      }
    }
}
  constructor(public accountService:AccountService,private route: Router,private http:HttpClient) {
    super(accountService) ; this.files = [];}
  

  ngOnInit() {
  }
  
  isLoggedin(){
  
    return this.accountService.isLoggedIn();
 }
  logOut(){
  this.accountService.logOut();
  this.route.navigateByUrl('/login');
}




deneme(event) {
  this.selectedFile = event.target['files'][0]
}

}

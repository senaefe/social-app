import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { User } from '../login/loginuser';
import { Post } from '../home/post.model';
import { AuthService } from '../register/auth.service';
import { UserService } from '../services/user.service';
import { IBaseComponent } from '../base/IBaseComponent';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent extends IBaseComponent implements OnInit {

 user: User = new User();
 userAddForm:FormGroup;
 postAddForm:FormGroup;
 selectedFile: File;
 post: Post;

  constructor(public accountService : AccountService,
    private authService : AuthService,
    private userService:UserService) { 
      super(accountService);
    }

  ngOnInit() {
  }
 login(form:NgForm){
   this.accountService.login(this.user)
   
   this.userService.getUsers().subscribe(data => {
     console.log(data);
   });
   console.log(this.accountService.isLoggedIn());

 }

 deneme(event) {
  this.selectedFile = event.target['files'][0]
}
 
}

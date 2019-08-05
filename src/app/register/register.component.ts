import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../services/user.service";
import { User } from './user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  user: User;
  post:User;

  // registerUserData={}
  // User: { firstName: string; lastName: string; userName: string; email: string; password: string; };
  constructor(private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private userService:UserService
    
    
  ) {
    // redirect to home if already logged in
    
    if (this.authService.user) {
      this.router.navigate(['/']);
   }
 }
   ngOnInit() {
    this.userService.getUsers().subscribe(data=>{
      this.user = data
    })
  }
  registerUser() {
    console.log(this.user);
  }
   resetForm(form : NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      id:'',
      url2: '',
      post:[],
    }
  }
}

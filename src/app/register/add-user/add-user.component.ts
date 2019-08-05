import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/register/user.model';
import { UserService } from 'src/app/services/user.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Post } from 'src/app/home/post.model';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers:[UserService]
})
export class AddUserComponent implements OnInit {
  // postAddForm: FormGroup;
  
   constructor(private formBuilder:FormBuilder,
    private userService: UserService,
    private alertifyService:AlertifyService) { }

  userAddForm:FormGroup;
  user : User;
  post : Post;
 
  createUserAddForm(){
    this.userAddForm = this.formBuilder.group({
    firstName:["",Validators.required],
    lastName:["",Validators.required],
    userName:["",Validators.required],
    email:["",Validators.required],
    password:["",Validators.required]
   });
  }
  ngOnInit() {
    this.createUserAddForm();
  }
 add(){
   if(this.userAddForm.valid){
      this.user = Object.assign({},this.userAddForm.value)
   }
   this.userService.addUser(this.user).subscribe(data => {
     this.alertifyService.success(data.userName + "you have successfully signed up.")
     this.alertifyService.success(  "You need to login now.")
     
   })
 }
//  addPost(){
//    if(this.postAddForm.valid){
//      this.post = Object.assign({},this.userAddForm.value)
//    }
//    this.userService.addUserPost(this.post).subscribe(data => {
//     this.alertifyService.success(data.post.firstName + " şuan text paylşatınız.")
//   })
//  }
}

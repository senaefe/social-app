import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/register/auth.service';
import { UserService } from 'src/app/services/user.service';


import { User } from 'src/app/register/user.model'
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { IBaseComponent } from '../../base/IBaseComponent';
import { AccountService } from 'src/app/services/account.service';

import { FormGroup } from '@angular/forms';

@Component({
  
  selector: 'app-add-profile-picture',
  templateUrl: './add-profile-picture.component.html',
  styleUrls: ['./add-profile-picture.component.css']
})
export class AddProfilePictureComponent extends IBaseComponent implements OnInit {
  selectedFile: File
 [x: string]: any;

 user : User;
 
 ppAddForm:FormGroup;
 constructor(private authService: AuthService,private userService : UserService,public accountService:AccountService) {
  super(accountService);  }
//  url : '../assets/img/logo.png';
 public uploader: FileUploader;
 
//  public uploader:FileUploader = new FileUploader({url:Profile});
  ngOnInit() {
    new FileUploader({ url: 'C:\Angular\Project\src\assets' });
    this.uploader.onAfterAddingFile = () => this.options.onUploaderAfterAddingFile();  
    this.uploader.onWhenAddingFileFailed = () => this.options.onUploaderWhenAddingFileFailed();
    return "this.uploader.queue";
    // this.uploader = new FileUploader({ });
    
    // FileSelectDirective.prototype.getOptions = function () {
    //   return this.uploader.options;
 
    // this.uploader.onAfterAddingFile = () => this.onUploaderAfterAddingFile();  
    // this.uploader.onWhenAddingFileFailed = () => this.onUploaderWhenAddingFileFailed();
    
    // return this.uploader.queue; 

  }
   
  deneme(event) {
    this.selectedFile = event.target['files'][0]
  }
 

}


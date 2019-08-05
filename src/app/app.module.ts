import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../src/app/register/auth.service';
import { AlertService } from '../../src/app/services/alert.service';
import { AccountService } from '../app/services/account.service'



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from "./profile/profile.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from '../app/register/register.component';
import { LoginGuard } from './login/login.guard';
import { UserService } from './services/user.service';
import { AlertifyService } from './services/alertify.service';
import { AddUserComponent } from './register/add-user/add-user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfilecardComponent } from './profile/profilecard/profilecard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatIconModule} from '@angular/material';



import { AddProfilePictureComponent } from './profile/add-profile-picture/add-profile-picture.component';
import {FileSelectDirective, FileDropDirective,  FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { UpdateComponent } from './update/update.component';
import { ShareComponent } from './share/share.component';

// import { AddUserrComponent } from './add-userr/add-userr.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    AddUserComponent,
    NavbarComponent,
    // AddUserrComponent,
    RegisterComponent,
    ProfilecardComponent,
    AddProfilePictureComponent,
    UpdateComponent,
    ShareComponent
 
    
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FileUploadModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
   
    
    
    
    
    

  ],
  providers: [AuthService,AlertService,AccountService,LoginGuard,UserService,AlertifyService],
  bootstrap: [AppComponent]
})
export class AppModule {FileSelectDirective;
  FileDropDirective; PizzaPartyAppModule; }

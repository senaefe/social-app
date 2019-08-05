import { NgModule } from '@angular/core';
import { Routes, RouterModule,Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { AddUserComponent } from './register/add-user/add-user.component'; 
import { ShareComponent} from './share/share.component';
import { UpdateComponent} from './update/update.component';



const routes: Routes = [
  {path:'home',component : HomeComponent ,canActivate : [LoginGuard]},
  {path:'' , redirectTo : 'home',pathMatch:'full'},
  {path:'profile',component : ProfileComponent},
  {path:'profile/:id',component : ProfileComponent},
  {path:'register',component : RegisterComponent},
  {path:'login',component : LoginComponent},
  {path:'add-user',component: AddUserComponent},
  {path:'share',component: ShareComponent},
  {path:'update',component: UpdateComponent},

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

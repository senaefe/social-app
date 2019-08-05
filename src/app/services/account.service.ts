import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../login/loginuser'
import { UserService } from './user.service';
import {Router} from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class AccountService {
  user:User;

  constructor(private userService: UserService,private router: Router) { }
  
  public path = "http://localhost:9000/user";
  public loggedIn = false;
  public sonuc = false;

 login(user: User): boolean {

   this.userService.getUsers().subscribe(data => {
     console.log(data);
     for(let i=0;i<data.length;i++ ) {
       if ((data[i].userName === user.userName) && (data[i].password === user.password)) {
        
         this.loggedIn = true;
         localStorage.setItem("isLogged", JSON.stringify(data[i])  );
         localStorage.setItem("login", 'true' );
           this.router.navigateByUrl('/home');
           this.sonuc = true;
         } else {
           this.sonuc = false;
         }
       }
     });
     return this.sonuc;
   }
   isLoggedIn() {
   
     if(localStorage.getItem('login')!=null)
        return (localStorage.getItem('login')=='true');
        this.user=JSON.parse(localStorage.getItem("isLogged"));
        this.loggedIn = true;
       //  console.log(this.user);
 
     return false;
   }
   logOut() {
     localStorage.removeItem("isLogged");
     localStorage.removeItem("login");
     this.loggedIn = false;
   }
   navigateToLogin() {
     if(this.loggedIn){
     this.router.navigateByUrl('/home');
   }
 }
} 
  
 
   
  
        
  
     
        

      
  // }
  // this.userService.getUsers().subscribe(data.password == user.password)){
  // if(user.userName==(this.userService.getUsers().subscribe(this.path).subscribe(data => (JSON.stringify(data.userName)))){




    //  this.authService.getUser().subscribe(
    //   (data) => {
    //     if (data !== null) {
    //       this.username = data.local.username;
    //     }
    //   });
    //  if(user.userName==(this.userService.getUsers().subscribe(this.path).subscribe(data => (JSON.stringify(data.userName))))



  //  .get<User>(this.path).pipe(
  //   tap(data => console.log(JSON.stringify(data))),




    //  if(user.userName=="sena"&&user.password=="1234"){
    //    this.loggedIn=true;
    //    localStorage.setItem("isLogged",user.userName);
    //   return true;
    //  }
    //  return false;


    
//if
 // console.log(data[i].userName);
          // console.log(user.userName);
          // console.log(data[i].password);
          // console.log(user.password);
          // user.userName = data[i].userName;
          // user.password = data[i].password;
//else
           // console.log(data[i].userName);
          // console.log(user.userName);
          // console.log(data[i].password);
          // console.log(user.password);